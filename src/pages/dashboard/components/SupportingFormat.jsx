import React from "react";
import { FileSpreadsheet, Database, Grid, Code2, HelpCircle } from "lucide-react";

function SupportingFormat() {
  return (
    <div className="px-6 min-w-0">
      <h2 className="text-white font-semibold flex items-center gap-2 mb-4">
        <Database className="w-5 h-5 text-slate-300" />
        Supported Formats
      </h2>
      <div className="flex flex-wrap gap-3 px-3">
        <div className="border border-slate-600 rounded-md p-3 flex flex-col items-center flex-1 w-[50%]">
          <FileSpreadsheet className="w-6 h-6 text-green-400 mb-1" />
          <span className="text-slate-200 text-sm">CSV</span>
        </div>
        <div className="border border-slate-600 rounded-md p-3 flex flex-col items-center flex-1 w-[50%]">
          <Database className="w-6 h-6 text-purple-400 mb-1" />
          <span className="text-slate-200 text-sm">SQL</span>
        </div>
        <div className="border border-slate-600 rounded-md p-3 flex flex-col items-center flex-1 w-[50%]">
          <Grid className="w-6 h-6 text-yellow-400 mb-1" />
          <span className="text-slate-200 text-sm">Excel</span>
        </div>
        <div className="border border-slate-600 rounded-md p-3 flex flex-col items-center flex-1 w-[50%]">
          <Code2 className="w-6 h-6 text-cyan-400 mb-1" />
          <span className="text-slate-200 text-sm">XML</span>
        </div>
      </div>
    </div>
  );
};
export default SupportingFormat;

