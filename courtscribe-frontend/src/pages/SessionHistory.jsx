import { Calendar, Search } from 'lucide-react';

import SessionCard from '../components/SessionCard';
import Sidebar from '../components/Sidebar';
import StatsBar from '../components/StatsBar';

const stats = {
  totalSessions: '1,248',
  hoursTranscribed: '4,812',
  hindi: 842,
  english: 406,
};

const sessions = [
  {
    caseId: '421-2026',
    caseNumber: 'Case No. 421/2026',
    caseTitle: 'State vs. Sharma & Ors.',
    caseType: 'CRIMINAL',
    date: 'Oct 24, 2026',
    judge: 'Justice Malhotra',
    duration: '02:14:45',
    excerpt:
      '...the evidence presented in Exhibit B-14 clearly indicates a breach of protocol during the initial filing. Counsel, you are advised to proceed with the witness testimony focusing solely on the events of March 12th...',
  },
  {
    caseId: 'fir-8821',
    caseNumber: 'Case No. FIR-8821',
    caseTitle: 'Metropolitan Bank vs. K. Builders',
    caseType: 'CIVIL',
    date: 'Oct 23, 2026',
    judge: 'Justice Singh',
    duration: '01:05:12',
    excerpt:
      '...the contractual obligation outlined in Section 4.2 was unilaterally modified without prior consent. The petitioner seeks restitution for the delay in the delivery of the structural report...',
  },
  {
    caseId: '8921-a',
    caseNumber: 'Session ID #8921-A',
    caseTitle: 'Arbitration: Mehta vs. Globus Corp',
    caseType: 'ARBITRATION',
    date: 'Oct 21, 2026',
    judge: 'Advocate Chatterjee',
    duration: '00:45:00',
    excerpt:
      'Transcript processing incomplete. Translation from Hindi to English (80% confidence). Key identifiers detected: IP Theft, Non-disclosure, Breach of Loyalty...',
    resume: true,
  },
  {
    caseId: '104-2026',
    caseNumber: 'Case No. 104/2026',
    caseTitle: "High Court vs. J. D'Souza",
    caseType: 'CRIMINAL',
    date: 'Oct 20, 2026',
    judge: 'Justice Malhotra',
    duration: '03:50:20',
    excerpt:
      '...defense council argues that the digital footprint was tampered with. The prosecution is granted 48 hours to submit the forensics audit report. Next hearing scheduled...',
  },
];

const SessionHistory = () => {
  return (
    <div className="min-h-screen bg-court-bg text-white">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="w-full p-6 lg:p-8">
          <h2 className="font-serif text-3xl font-bold text-court-gold">Session History</h2>

          <div className="mt-6">
            <StatsBar stats={stats} />
          </div>

          <section className="mt-6 rounded-xl bg-court-panel p-4 ring-1 ring-white/10">
            <div className="grid gap-3 md:grid-cols-4">
              <label className="flex items-center gap-2 rounded-md bg-court-panelSoft px-3 py-2 text-sm text-court-slate md:col-span-2">
                <Search size={16} />
                <input type="text" placeholder="Search by case number or title" className="w-full bg-transparent text-white outline-none placeholder:text-court-slate" />
              </label>

              <select className="rounded-md bg-court-panelSoft px-3 py-2 text-sm text-white outline-none">
                <option>Case Type: All</option>
                <option>Criminal</option>
                <option>Civil</option>
                <option>Arbitration</option>
              </select>

              <div className="flex items-center gap-2 rounded-md bg-court-panelSoft px-3 py-2 text-sm text-court-slate">
                <Calendar size={16} /> Date Picker
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            {sessions.map((session) => (
              <SessionCard key={session.caseId} session={session} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default SessionHistory;
