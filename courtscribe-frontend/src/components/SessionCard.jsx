import { CalendarDays, Clock3, Download, Share2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import LegalBadge from './LegalBadge';

const SessionCard = ({ session }) => {
  const navigate = useNavigate();

  return (
    <article className="rounded-xl bg-court-panel p-5 shadow-lg shadow-black/20 ring-1 ring-white/10">
      <p className="text-xs text-court-slate">{session.caseNumber}</p>
      <h3 className="mt-1 text-xl font-semibold">{session.caseTitle}</h3>

      <div className="mt-3">
        <LegalBadge type={session.caseType} />
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-3">
        <p className="flex items-center gap-2"><CalendarDays size={14} /> {session.date}</p>
        <p>{session.judge}</p>
        <p className="flex items-center gap-2"><Clock3 size={14} /> {session.duration}</p>
      </div>

      <p className="mt-4 line-clamp-3 text-sm italic text-court-slate">{session.excerpt}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(`/transcript/${session.caseId}`, { state: { session } })}
          className="rounded-md border border-court-gold px-4 py-2 text-sm font-medium text-court-gold transition hover:bg-court-gold hover:text-court-bg"
        >
          {session.resume ? 'Resume Session' : 'Re-open for Review'}
        </button>

        <div className="flex items-center gap-2 text-court-slate">
          <button type="button" className="rounded p-2 hover:bg-white/10" aria-label="Share"><Share2 size={16} /></button>
          <button type="button" className="rounded p-2 hover:bg-white/10" aria-label="Download"><Download size={16} /></button>
          <button type="button" className="rounded p-2 hover:bg-white/10" aria-label="Delete"><Trash2 size={16} /></button>
        </div>
      </div>
    </article>
  );
};

export default SessionCard;
