const StatsBar = ({ stats }) => {
  const items = [
    { title: 'Total Sessions', value: stats.totalSessions, sub: '+12 this week' },
    { title: 'Hours Transcribed', value: `${stats.hoursTranscribed}hrs`, sub: '98.4% Accuracy Rating' },
    { title: 'Multilingual Breakdown', value: `${stats.hindi} Hindi`, sub: `${stats.english} English` },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl bg-court-panel p-5 shadow-lg shadow-black/20 ring-1 ring-white/10">
          <p className="text-sm text-court-slate">{item.title}</p>
          <p className="mt-2 text-2xl font-semibold">{item.value}</p>
          <p className="mt-1 text-sm text-court-gold">{item.sub}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsBar;
