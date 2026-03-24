const LegalBadge = ({ type }) => {
  const badgeStyles = {
    CRIMINAL: 'bg-red-500/20 text-red-300 border-red-400/40',
    CIVIL: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    ARBITRATION: 'bg-amber-500/20 text-amber-200 border-amber-400/50',
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${badgeStyles[type] || 'bg-slate-600/20 text-slate-200 border-slate-500/40'}`}>
      {type}
    </span>
  );
};

export default LegalBadge;
