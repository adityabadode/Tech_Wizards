const DepositionPreview = ({ caseNumber = '421/2026' }) => {
  return (
    <aside className="h-[calc(100vh-210px)] rounded-xl bg-court-panel p-4 ring-1 ring-white/10">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-court-gold">Official Deposition Record</h3>
        <div className="flex gap-2 text-xs">
          <button type="button" className="rounded border border-slate-300 px-2 py-1 text-slate-100">PDF</button>
          <button type="button" className="rounded bg-[#1e3a8a] px-2 py-1 text-white">Export DOCX</button>
        </div>
      </div>

      <div className="h-[calc(100%-44px)] overflow-y-auto rounded-lg bg-white p-6 text-sm text-slate-800 shadow-xl">
        <p className="text-center text-base font-bold tracking-wide">HIGH COURT OF JUDICATURE</p>
        <p className="mt-1 text-center text-xs tracking-[0.08em] text-slate-600">APPELLATE JURISDICTION, CIVIL DIVISION</p>

        <hr className="my-4 border-slate-300" />

        <div className="flex items-center justify-between text-xs">
          <p><strong>Case No:</strong> {caseNumber}</p>
          <p><strong>Date:</strong> 24 October 2026</p>
        </div>

        <p className="mt-5 text-center text-sm font-semibold underline">DEPOSITION OF MS. ANANYA SHARMA</p>

        <ol className="mt-5 list-decimal space-y-4 pl-5 leading-6">
          <li>
            <strong>PROCEEDINGS:</strong> The Honorable Court convened at 10:45 AM. Counsel for both parties appeared and submissions were invited in relation to the alleged contractual breach under Clause 4.2.
          </li>
          <li>
            <strong>STATEMENT OF WITNESS:</strong> The witness deposed that the respondent acknowledged a delay in compliance certificate issuance and indicated pending municipal processing at the relevant time.
          </li>
        </ol>
      </div>
    </aside>
  );
};

export default DepositionPreview;
