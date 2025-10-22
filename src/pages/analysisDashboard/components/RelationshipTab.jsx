// import React, { useContext } from "react";
// import { Key, Link2, Shuffle } from "lucide-react";
// import { Context } from "../../../common/helper/Context";

// const RelationshipsTab = () => {
//     const { relationships } = useContext(Context);
//     if (!relationships || Object.keys(relationships).length === 0) {
//         return <div className="text-white">Loading relationship data...</div>;
//     }

//     const { PotentialKeys, ForeignKeyCandidates, JoinSuggestions } = relationships;
//     return (
//         <div className="space-y-6">
//             {PotentialKeys && Object.keys(PotentialKeys).length > 0 && (
//                 <div className="bg-slate-800 shadow rounded-2xl border-1 border-slate-700">
//                     <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
//                         <Key className="w-5 h-5 text-white" />
//                         <h5 className="font-semibold">Potential Keys</h5>
//                     </div>
//                     <div className="p-4 space-y-4 text-slate-500">
//                         {Object.entries(PotentialKeys).map(
//                             ([filename, keys]) => (
//                                 <div key={filename}>
//                                     <h6 className="font-medium text-gray-200">{filename}</h6>
//                                     <ul className="mt-2 space-y-2">
//                                         {keys.map((key, i) => (
//                                             <li
//                                                 key={i}
//                                                 className="p-3 bg-slate-700 rounded-lg border flex flex-col"
//                                             >
//                                                 <div className="flex items-center justify-between text-gray-100">
//                                                     <strong>{key.column}</strong>
//                                                     <span className="bg-slate-700 text-indigo-100 text-xs px-2 py-1 rounded-full border-1 border-[#795EFF]">
//                                                         {(key.unique_ratio || 0).toFixed(1)}% unique
//                                                     </span>
//                                                 </div>
//                                                 <div className="text-sm text-gray-100 mt-1">
//                                                     {key.type || key.reason || "Potential identifier"}
//                                                 </div>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )
//                         )}
//                     </div>
//                 </div>
//             )}
//             {ForeignKeyCandidates && Object.keys(ForeignKeyCandidates).length > 0 && (
//                 <div className="bg-slate-800 shadow rounded-2xl border-1 border-slate-700">
//                     <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
//                         <Link2 className="w-5 h-5 text-blue-600" />
//                         <h5 className="font-semibold">Foreign Key Candidates</h5>
//                     </div>
//                     <div className="p-4 space-y-4">
//                         {Object.entries(ForeignKeyCandidates).map(
//                             ([filename, fks]) => (
//                                 <div key={filename}>
//                                     <h6 className="font-medium text-gray-200">{filename}</h6>
//                                     <div className="grid md:grid-cols-2 gap-4 mt-2">
//                                         {fks.map((fk, i) => (
//                                             <div key={i} className="bg-slate-700 p-4 rounded-xl border-1 border-slate-700">
//                                                 <h6 className="font-semibold">{fk.source_column}</h6>
//                                                 <p className="text-sm text-gray-100 mt-1">
//                                                     <strong>Matches:</strong> {fk.target_table}.
//                                                     {fk.target_column}
//                                                     <br />
//                                                     <strong>Match Rate:</strong>{" "}
//                                                     {((fk.referential_integrity || 0) * 100).toFixed(1)}%
//                                                 </p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )
//                         )}
//                     </div>
//                 </div>
//             )}
//             {JoinSuggestions && JoinSuggestions.length > 0 && (
//                 <div className="bg-slate-800 shadow rounded-2xl border-slate-700">
//                     <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
//                         <Shuffle className="w-5 h-5 text-green-600" />
//                         <h5 className="font-semibold">Join Suggestions</h5>
//                     </div>
//                     <div className="p-4 space-y-4">
//                         {JoinSuggestions.map((suggestion, i) => (
//                             <div
//                                 key={i}
//                                 className="border-1 border-slate-700 rounded-xl p-4 bg-slate-700 space-y-2 shadow-sm"
//                             >
//                                 <h6 className="flex items-center gap-2">
//                                     <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
//                                         Recommended
//                                     </span>
//                                     {suggestion.table1} ⟷ {suggestion.table2}
//                                 </h6>
//                                 <p className="text-sm"><strong>Join on:</strong> {suggestion.join_on || "unknown"}</p>
//                                 <div className="text-xs text-gray-100">
//                                     <strong>Confidence:</strong>{" "}
//                                     {(suggestion.confidence * 100).toFixed(1)}% |{" "}
//                                     <strong>Type:</strong>{" "}
//                                     {suggestion.type || "unknown"}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RelationshipsTab;


import React, { useContext } from "react";
import { Link2 } from "lucide-react";
import { Context } from "../../../common/helper/Context";

const RelationshipsTab = () => {
  const { relationships } = useContext(Context);

  if (!relationships || !relationships.candidates || relationships.candidates.length === 0) {
    return <div className="text-white">No relationships detected yet.</div>;
  }

  const { candidates } = relationships;

  const getBadgeColor = (similarity) => {
    const percent = similarity * 100;
    if (percent === 100) return "bg-green-600 text-white";
    if (percent >= 70) return "bg-yellow-500 text-black";
    return "bg-red-600 text-white";
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 shadow rounded-2xl border-slate-700">
        <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-blue-600" />
          <h5 className="font-semibold">Column Relationships</h5>
        </div>
        <div className="p-4 space-y-4">
          {candidates.map((rel, index) => (
            <div
              key={index}
              className="bg-slate-700 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            >
              <div className="flex flex-col">
                <p className="text-gray-200 font-semibold">
                  {rel.file_a}.{rel.col_a} ⟷ {rel.file_b}.{rel.col_b}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Suggested relationship between columns
                </p>

                {/* 🔹 New Join Type option */}
                <p className="text-blue-400 text-sm font-medium mt-1">
                  Join Type: <span className="text-gray-300">INNER JOIN</span>
                </p>
              </div>

              <div>
                <span
                  className={`${getBadgeColor(rel.name_similarity)} text-xs px-3 py-1 rounded-full font-medium`}
                >
                  {(rel.name_similarity * 100).toFixed(1)}% match
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelationshipsTab;
