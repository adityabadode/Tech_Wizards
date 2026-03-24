import SpeakerBlock from './SpeakerBlock';

const TranscriptPanel = ({ blocks }) => {
  return (
    <section className="flex h-[calc(100vh-210px)] flex-col rounded-xl bg-court-panelSoft p-4 ring-1 ring-white/10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md bg-court-panel p-3 text-sm">
        <div className="flex items-center gap-2">
          <button type="button" className="rounded bg-white/10 px-3 py-1 font-semibold">Bold</button>
          <button type="button" className="rounded bg-white/10 px-3 py-1 italic">Italic</button>
          <button type="button" className="rounded bg-white/10 px-3 py-1">List</button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded border border-court-gold/50 px-3 py-1 text-court-gold">Timestamps</button>
          <button type="button" className="rounded border border-court-gold/50 px-3 py-1 text-court-gold">Editing Mode</button>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1">
        {blocks.map((block) => (
          <SpeakerBlock key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
};

export default TranscriptPanel;
