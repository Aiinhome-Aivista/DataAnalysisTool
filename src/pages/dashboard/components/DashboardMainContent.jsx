import React from "react";
import { Database, Zap, TrendingUp, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardMainContent() {
  const navigate = useNavigate();

  return (
    <div className="w-[65%]">
      <div className="flex flex-col gap-6">
        {/* Header Intro */}
        <div className="bg-[#795EFF] p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-2">Intelligent Data Analysis Tool</h2>
          <p className="text-slate-100 mb-4 text-sm">
            Upload multiple database files and get AI-powered insights about data types,
            patterns, relationships, and potential optimizations.
          </p>
          <button
            className="bg-slate-800 text-slate-100 font-semibold px-5 py-2 rounded-xs shadow border-1 border-slate-100 hover:bg-slate-700 cursor-pointer"
            onClick={() => navigate("/upload")}
          >
            Start Analysis
          </button>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4 px-3">
          <div className="bg-slate-800 p-4 rounded-lg shadow hover:bg-slate-700 flex-1">
            <h3 className="flex items-center gap-2 font-semibold mb-2">
              <Database className="w-5 h-5 text-purple-400" /> Multiple File Formats
            </h3>
            <p className="text-sm text-slate-300">
              Support for CSV, SQL, Excel (.xls/.xlsx), and XML files with intelligent parsing.
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg shadow hover:bg-slate-700 flex-1 ">
            <h3 className="flex items-center gap-2 font-semibold mb-2">
              <Zap className="w-5 h-5 text-green-400" /> Smart Data Type Detection
            </h3>
            <p className="text-sm text-slate-300">
              Automatically identify data types: IDs, names, dates, monetary values, and more.
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg shadow hover:bg-slate-700 flex-1">
            <h3 className="flex items-center gap-2 font-semibold mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" /> Pattern Analysis
            </h3>
            <p className="text-sm text-slate-300">
              Detect outliers, sequences, correlations, and missing data patterns.
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg shadow hover:bg-slate-700 flex-1">
            <h3 className="flex items-center gap-2 font-semibold mb-2">
              <Link className="w-5 h-5 text-cyan-400" /> Relationship Mapping
            </h3>
            <p className="text-sm text-slate-300">
              Identify primary/foreign keys and suggest optimal join strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}