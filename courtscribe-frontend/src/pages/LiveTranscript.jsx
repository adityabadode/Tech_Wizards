import { Mic, Mic2, Play, SkipBack, SkipForward, UsersRound, Volume2 } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';

import DepositionPreview from '../components/DepositionPreview';
import TranscriptPanel from '../components/TranscriptPanel';

const sessionMockById = {
  '421-2026': {
    caseTitle: 'State vs. Sharma',
    caseNumber: '421/2026',
  },
};

const transcriptBlocks = [
  {
    id: '1',
    role: 'JUDGE',
    speaker: 'HONORABLE JUSTICE VERMA',
    timestamp: '10:45:02 AM',
    text: 'Counsel, please state the primary contention of the petitioner regarding the breach of contract. We are specifically looking at section 4.2 of the agreement dated January 14th.',
  },
  {
    id: '2',
    role: 'ADVOCATE',
    speaker: 'PETITIONER ADVOCATE',
    timestamp: '10:45:28 AM',
    text: 'My Lord, the petitioner contends that the respondent failed to provide the necessary compliance certificates within the stipulated 30-day window, thereby triggering the penalty clause.',
  },
  {
    id: '3',
    role: 'WITNESS',
    speaker: 'WITNESS - ANANYA SHARMA',
    timestamp: '10:46:15 AM',
    text: "I was present at the meeting on the 15th. The respondent clearly stated that the certificates were still in process at the municipal office. He didn't seem concerned.",
    flagged: true,
    flaggedText: "He didn't seem concerned.",
  },
];

const LiveTranscript = () => {
  const { caseId } = useParams();
  const { state } = useLocation();

  const session = state?.session || sessionMockById[caseId] || {
    caseTitle: 'State vs. Sharma',
    caseNumber: '421/2026',
  };

  return (
    <div className="min-h-screen bg-court-bg px-6 py-5 pb-28 text-white lg:px-8">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-court-panel p-4 ring-1 ring-white/10">
        <div>
          <p className="font-serif text-2xl font-extrabold text-court-gold">COURTSCRIBE</p>
          <p className="text-sm text-court-slate">{session.caseTitle} - Case No. {session.caseNumber}</p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-court-panelSoft px-4 py-2">
          <span className="text-sm font-semibold">00:45:12</span>
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-300">LIVE</span>
        </div>

        <div className="flex items-center gap-3 text-court-gold">
          <Mic size={18} />
          <Mic2 size={18} />
          <UsersRound size={18} />
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[55%,45%]">
        <TranscriptPanel blocks={transcriptBlocks} />
        <DepositionPreview caseNumber={session.caseNumber} />
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-court-panel/95 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded bg-white/10 p-2 hover:bg-white/20"><SkipBack size={18} /></button>
            <button type="button" className="rounded bg-court-gold p-2 text-court-bg hover:brightness-105"><Play size={18} /></button>
            <button type="button" className="rounded bg-white/10 p-2 hover:bg-white/20"><SkipForward size={18} /></button>
          </div>

          <div className="flex min-w-[280px] flex-1 items-center gap-3 text-sm text-court-slate">
            <input type="range" min="0" max="100" value="63" readOnly className="h-1 w-full accent-court-gold" />
            <span className="whitespace-nowrap">00:45:12 / 01:12:00</span>
          </div>

          <Volume2 size={18} className="text-court-gold" />
        </div>
      </footer>
    </div>
  );
};

export default LiveTranscript;
