const SpeakerBlock = ({ block }) => {
  const roleStyles = {
    JUDGE: 'border-l-[#1e3a8a]',
    ADVOCATE: 'border-l-[#C9A84C]',
    WITNESS: 'border-l-[#475569]',
    CLERK: 'border-l-[#6b7280]',
  };

  const hasFlaggedText = Boolean(block.flagged && block.flaggedText);
  const textParts = hasFlaggedText ? block.text.split(block.flaggedText) : [block.text];

  return (
    <div className={`group rounded-lg border-l-4 bg-court-panel p-4 ${roleStyles[block.role] || 'border-l-slate-500'}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-court-gold">{block.speaker}</p>
          <button type="button" className="rounded-full border border-court-gold/60 px-3 py-1 text-[11px] font-medium text-court-gold hover:bg-court-gold hover:text-court-bg">
            Change Role
          </button>
        </div>
        <p className="text-xs text-court-slate">{block.timestamp}</p>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-100">
        {hasFlaggedText ? (
          <>
            {textParts[0]}
            <span className="rounded bg-amber-300/30 px-1 text-amber-100">{block.flaggedText}</span>
            {textParts[1]}
          </>
        ) : (
          block.text
        )}
      </p>

      {block.flagged && (
        <span className="mt-3 inline-block rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-200">
          Correction Needed
        </span>
      )}

      <div className={`mt-3 gap-2 ${block.flagged ? 'flex' : 'hidden group-hover:flex'}`}>
        <button type="button" className="rounded bg-white/10 px-3 py-1 text-xs hover:bg-white/20">Re-assign Speaker</button>
        <button type="button" className="rounded bg-amber-500/20 px-3 py-1 text-xs text-amber-200 hover:bg-amber-500/30">Flag Inaccuracy</button>
      </div>
    </div>
  );
};

export default SpeakerBlock;
