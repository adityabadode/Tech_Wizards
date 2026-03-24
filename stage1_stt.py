import argparse
import json
import os
import sys
import time
from datetime import datetime

from groq import Groq

# ─────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────
def _read_dotenv_value(dotenv_path: str, key: str) -> str:
    try:
        with open(dotenv_path, "r", encoding="utf-8") as f:
            for raw_line in f:
                line = raw_line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                if k.strip() == key:
                    return v.strip().strip('"').strip("'")
    except FileNotFoundError:
        return ""
    except Exception:
        return ""
    return ""


_BACKEND_ENV_PATH = os.path.join(os.path.dirname(__file__), "courtscribe-backend", ".env")

# Note: os.getenv(key, default) will NOT use default if the env var exists but is empty.
GROQ_API_KEY = (os.getenv("GROQ_API_KEY") or "").strip()
if not GROQ_API_KEY:
    GROQ_API_KEY = _read_dotenv_value(_BACKEND_ENV_PATH, "GROQ_API_KEY")

MODEL           = "whisper-large-v3"
SAMPLE_RATE     = 16000
CHUNK_SECONDS   = 10
LOG_FILE        = "court_log.json"
TEMP_AUDIO_FILE = os.path.join(os.path.dirname(__file__), "temp_chunk.wav")

# Indian languages only
INDIAN_LANGUAGES = [
    #"hi",
    "en", 
    #"mr", "bn", "ta",
    #"te", "gu", "kn", "pa", "ml", "or", "ur"
]

# Groq client
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

# ─────────────────────────────────────────
# LOG SETUP
# ─────────────────────────────────────────
if os.path.exists(LOG_FILE):
    with open(LOG_FILE, "r", encoding="utf-8") as f:
        court_log = json.load(f)
else:
    court_log = {
        "case_id"      : "",
        "court_name"   : "",
        "session_date" : datetime.now().strftime("%Y-%m-%d"),
        "speakers"     : {},
        "entries"      : []
    }

def save_log():
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(court_log, f, ensure_ascii=False, indent=2)
    print("💾 Log saved!")

# ─────────────────────────────────────────
# RECORD AUDIO
# ─────────────────────────────────────────
def record_chunk():
    import scipy.io.wavfile as wav
    import sounddevice as sd

    print(f"🎙️  Recording {CHUNK_SECONDS} seconds... Speak now!")
    audio = sd.rec(
        int(CHUNK_SECONDS * SAMPLE_RATE),
        samplerate=SAMPLE_RATE,
        channels=1,
        dtype="int16"
    )
    sd.wait()
    wav.write(TEMP_AUDIO_FILE, SAMPLE_RATE, audio)
    return TEMP_AUDIO_FILE

# ─────────────────────────────────────────
# TRANSCRIBE AUDIO
# ─────────────────────────────────────────
def transcribe_audio(audio_file, retries=3):
    if not client:
        print("❌ GROQ_API_KEY missing")
        return None, None
    for attempt in range(1, retries + 1):
        try:
            print(f"📡 Attempt {attempt}/{retries}...")

            with open(audio_file, "rb") as f:
                result = client.audio.transcriptions.create(
                    file=(os.path.basename(audio_file), f.read()),
                    model=MODEL,
                    response_format="verbose_json",
                )

            text     = result.text.strip() if result.text else ""
            language = result.language if result.language else "hi"

            # Filter non-Indian languages
            if language not in INDIAN_LANGUAGES:
                print(f"⚠️  Non-Indian language ({language}) detected, defaulting to Hindi")
                language = "hi"

            # Filter junk entries
            if not text or text in [".", ",", " "] or len(text) < 3:
                return None, None

            return text, language

        except Exception as e:
            error = str(e)

            # Rate limit
            if "rate_limit" in error.lower() or "429" in error:
                print(f"⏳ Rate limit hit, waiting 20 seconds...")
                time.sleep(20)
                continue

            # Service unavailable
            if "503" in error or "unavailable" in error.lower():
                print(f"⏳ Service unavailable, waiting 10 seconds...")
                time.sleep(10)
                continue

            print(f"❌ Error on attempt {attempt}: {error}")
            time.sleep(3)

    print("❌ All retries failed, skipping chunk...")
    return None, None


def transcribe_file_to_json(audio_file):
    text, language = transcribe_audio(audio_file)
    if not text:
        return {
            "text": None,
            "language": language or "en",
            "timestamp": datetime.now().strftime("%H:%M:%S"),
        }

    return {
        "text": text,
        "language": language or "en",
        "timestamp": datetime.now().strftime("%H:%M:%S"),
    }

# ─────────────────────────────────────────
# DISPLAY ENTRY
# ─────────────────────────────────────────
def display_entry(timestamp, language, text):
    print(f"""
┌─────────────────────────────────────────
│ 🕐 {timestamp}  🌐 {language.upper()}
│ 👤 UNKNOWN  (Stage 2 will assign role)
│ 📝 {text}
└─────────────────────────────────────────""")

# ─────────────────────────────────────────
# MAIN SESSION
# ─────────────────────────────────────────
def start_session():
    print("=" * 50)
    print("       🏛️  CourtScribe — Stage 1")
    print("       Speech to Text Engine")
    print("=" * 50)

    # Session details
    print("\n📋 Enter Session Details:")
    court_log["case_id"]    = input("   Case Number  : ") or "CASE-2024-001"
    court_log["court_name"] = input("   Court Name   : ") or "District Court"
    court_log["judge"]      = input("   Judge Name   : ") or "Unknown"
    court_log["session_date"] = datetime.now().strftime("%Y-%m-%d")
    save_log()

    print("\n✅ Session started!")
    print("⏹️  Press Ctrl+C to stop\n")
    print("=" * 50)

    try:
        while True:
            # Step 1 — Record
            audio_file = record_chunk()

            # Step 2 — Transcribe
            text, language = transcribe_audio(audio_file)

            # Step 3 — Log
            if text:
                timestamp = datetime.now().strftime("%H:%M:%S")

                # Display nicely
                display_entry(timestamp, language, text)

                # Save to log
                entry = {
                    "timestamp"  : timestamp,
                    "speaker_id" : "UNKNOWN",   # Stage 2 fills this
                    "role"       : "UNKNOWN",   # Stage 2 fills this
                    "language"   : language,
                    "text"       : text
                }
                court_log["entries"].append(entry)
                save_log()

            else:
                print("🔇 No speech detected, continuing...\n")

    except KeyboardInterrupt:
        print("\n" + "=" * 50)
        print("⏹️  Session Ended!")
        print(f"✅ Log saved to   : {LOG_FILE}")
        print(f"📊 Total entries  : {len(court_log['entries'])}")
        print(f"📅 Session date   : {court_log['session_date']}")
        print(f"🏛️  Court          : {court_log['court_name']}")
        print(f"📁 Case           : {court_log['case_id']}")
        print("=" * 50)
        print("\n🚀 Ready for Stage 2 → Speaker Detection!")

        # Cleanup temp file
        if os.path.exists(TEMP_AUDIO_FILE):
            os.remove(TEMP_AUDIO_FILE)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", help="Path to input audio file")
    parser.add_argument("--json", action="store_true", help="Print JSON output")
    args = parser.parse_args()

    if args.input:
        output = transcribe_file_to_json(args.input)
        if args.json:
            print(json.dumps(output, ensure_ascii=False))
        else:
            print(output)
        sys.exit(0)

    start_session()
