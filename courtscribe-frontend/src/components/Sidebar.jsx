import { CircleUserRound, FileText, History, Plus, Settings } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { label: 'Recent Sessions', icon: History },
    { label: 'Legal Templates', icon: FileText },
    { label: 'User Profile', icon: CircleUserRound },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="flex h-full min-h-screen w-full flex-col justify-between bg-court-panel px-5 py-6 ring-1 ring-white/10 lg:w-72">
      <div>
        <div>
          <h1 className="font-serif text-2xl font-extrabold tracking-wide text-court-gold">COURTSCRIBE</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-court-slate">Official Record</p>
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-court-gold px-4 py-2 font-semibold text-court-bg transition hover:brightness-105" type="button">
          <Plus size={16} /> New Transcription
        </button>

        <nav className="mt-8 space-y-2">
          {links.map(({ label, icon: Icon }) => (
            <button key={label} type="button" className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-slate-100 transition hover:bg-white/10">
              <Icon size={16} className="text-court-gold" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3 rounded-lg bg-court-panelSoft p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-court-gold font-semibold text-court-bg">AK</div>
        <div>
          <p className="text-sm font-semibold">A.K. Sharma</p>
          <p className="text-xs text-court-slate">Chief Clerk</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
