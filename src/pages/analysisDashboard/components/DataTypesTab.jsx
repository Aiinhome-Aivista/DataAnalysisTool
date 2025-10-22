// import React, { useContext } from "react";
// import { FileText } from "lucide-react";
// import { Context } from "../../../common/helper/Context";

// export default function DataTypesTab() {
//   const { dataTypes } = useContext(Context);


//   return (
//     <div className="space-y-6">
//       {dataTypes.map((tableData, tableIndex) => (
//         <div key={tableData.table_name || tableIndex} className="bg-slate-800 border border-slate-700 rounded-lg shadow-md">
//           {/* Header */}
//           <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
//             <h5 className="flex items-center gap-2 text-lg font-semibold text-white">
//               <FileText className="w-5 h-5 text-[#795EFF]" />
//               {tableData.table_name}
//             </h5>
//             <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded">
//               {tableData.columns.length} columns
//             </span>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left text-slate-300">
//               <thead className="bg-slate-700 text-slate-200">
//                 <tr>
//                   <th className="px-4 py-2">Column</th>
//                   <th className="px-4 py-2">Inferred Type</th>
//                   <th className="px-4 py-2">Contextual Summary</th>
//                   <th className="px-4 py-2">Technical Summary</th>
//                   <th className="px-4 py-2">Differences</th>
//                   <th className="px-4 py-2">More Accurate</th>
//                   <th className="px-4 py-2">Confidence</th>
//                   <th className="px-4 py-2">Sample Values</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.columns.map((column, colIndex) => (
//                   <tr
//                     key={column.column_name || colIndex}
//                     className="border-b border-slate-700 hover:bg-slate-700/30 last:border-b-0"
//                   >
//                     <td className="px-4 py-2 font-medium text-white">
//                       {column.column_name}
//                     </td>

//                     {/* ✅ use inferred_sql_type instead of inferred_type */}
//                     <td className="px-4 py-2">
//                       <span className="bg-[#795EFF] text-white px-2 py-0.5 rounded text-xs capitalize">
//                         {column.inferred_sql_type}
//                       </span>
//                     </td>

//                     {/* ✅ Contextual Summary */}
//                     <td className="px-4 py-2">{column.contextual_summary}</td>

//                     {/* ✅ Technical Summary */}
//                     <td className="px-4 py-2">{column.technical_summary}</td>

//                     {/* ✅ Differences */}
//                     <td className="px-4 py-2 text-xs">{column.differences}</td>

//                     {/* ✅ More Accurate */}
//                     <td className="px-4 py-2">{column.more_accurate}</td>

//                     {/* ✅ Confidence Bar */}
//                     <td className="px-4 py-2 w-40">
//                       <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
//                         <div
//                           className="bg-green-500 h-4 text-xs font-bold text-center text-black flex items-center justify-center"
//                           style={{ width: column.confidence || "0%" }}
//                         >
//                           {column.confidence}
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-4 py-2 text-slate-400 text-xs">
//                       <code>
//                         {Array.isArray(column.sample_values)
//                           ? column.sample_values.slice(0, 5).join(", ")
//                           : ""}
//                       </code>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//           </div>
//         </div>
//       ))}

//     </div>
//   );
// }

// import React, { useContext } from "react"; 
// import { FileText } from "lucide-react";
// import { Context } from "../../../common/helper/Context";

// export default function DataTypesTab() {
//   const { apiResponse, loadingView } = useContext(Context); // assuming you store the raw API response here

//   if (loadingView) {
//     return <div className="text-white">Loading data types...</div>;
//   }

//   const files = apiResponse?.data?.[0]?.response?.files || {};
//   const dataTypes = Object.entries(files).map(([fileName, fileData]) => {
//     const columns = Object.values(fileData.comparison || {}).map((col) => ({
//       column_name: col.column_name,
//       inferred_sql_type: col.technical_metadata?.inferred_sql_type || "--",
//       contextual_summary: col.contextual_summary || "--",
//       technical_summary: col.technical_summary || "--",
//       differences: col.differences ? col.differences.join("\n") : "--",
//       more_accurate: col.which_is_more_accurate?.selected || "--",
//       confidence: col.confidence ? `${col.confidence * 100}%` : "0%",
//       sample_values: col.technical_metadata?.sample_values || []
//     }));

//     return { table_name: fileName, columns };
//   });

//   if (!dataTypes.length) {
//     return <div className="text-white">No data types available.</div>;
//   }

//   return (
//     <div className="space-y-6">
//       {dataTypes.map((tableData, tableIndex) => {
//         const columns = tableData.columns || [];
//         return (
//           <div
//             key={tableData.table_name || tableIndex}
//             className="bg-slate-800 border border-slate-700 rounded-lg shadow-md"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
//               <h5 className="flex items-center gap-2 text-lg font-semibold text-white">
//                 <FileText className="w-5 h-5 text-[#795EFF]" />
//                 {tableData.table_name || "--"}
//               </h5>
//               <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded">
//                 {columns.length} columns
//               </span>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left text-slate-300">
//                 <thead className="bg-slate-700 text-slate-200">
//                   <tr>
//                     <th className="px-4 py-2">Column</th>
//                     <th className="px-4 py-2">Inferred Type</th>
//                     <th className="px-4 py-2">Contextual Summary</th>
//                     <th className="px-4 py-2">Technical Summary</th>
//                     <th className="px-4 py-2">Differences</th>
//                     <th className="px-4 py-2">More Accurate</th>
//                     <th className="px-4 py-2">Confidence</th>
//                     <th className="px-4 py-2">Sample Values</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {columns.map((column, colIndex) => (
//                     <tr
//                       key={column.column_name || colIndex}
//                       className="border-b border-slate-700 hover:bg-slate-700/30 last:border-b-0"
//                     >
//                       <td className="px-4 py-2 font-medium text-white">
//                         {column.column_name || "--"}
//                       </td>
//                       <td className="px-4 py-2">
//                         <span className="bg-[#795EFF] text-white px-2 py-0.5 rounded text-xs capitalize">
//                           {column.inferred_sql_type}
//                         </span>
//                       </td>
//                       <td className="px-4 py-2">{column.contextual_summary}</td>
//                       <td className="px-4 py-2">{column.technical_summary}</td>
//                       <td className="px-4 py-2 text-xs">{column.differences}</td>
//                       <td className="px-4 py-2">{column.more_accurate}</td>
//                       <td className="px-4 py-2 w-40">
//                         <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
//                           <div
//                             className="bg-green-500 h-4 text-xs font-bold text-center text-black flex items-center justify-center"
//                             style={{ width: column.confidence }}
//                           >
//                             {column.confidence}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-2 text-slate-400 text-xs">
//                         <code>
//                           {Array.isArray(column.sample_values)
//                             ? column.sample_values.slice(0, 5).join(", ")
//                             : "--"}
//                         </code>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import React, { useContext } from "react";
import { FileText } from "lucide-react";
import { Context } from "../../../common/helper/Context";

export default function DataTypesTab() {
  const { dataTypes, loadingView } = useContext(Context); // use dataTypes directly

  if (loadingView) {
    return <div className="text-white">Loading data types...</div>;
  }

  if (!dataTypes || !dataTypes.length) {
    return <div className="text-white">No data types available.</div>;
  }

  return (
    <div className="space-y-6">
      {dataTypes.map((tableData, tableIndex) => {
        const columns = tableData.columns || [];
        return (
          <div
            key={tableData.table_name || tableIndex}
            className="bg-slate-800 border border-slate-700 rounded-lg shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
              <h5 className="flex items-center gap-2 text-lg font-semibold text-white">
                <FileText className="w-5 h-5 text-[#795EFF]" />
                {tableData.table_name || "--"}
              </h5>
              <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded">
                {columns.length} columns
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-300">
                <thead className="bg-slate-700 text-slate-200">
                  <tr>
                    <th className="px-4 py-2">Column</th>
                    <th className="px-4 py-2">Inferred Type</th>
                    <th className="px-4 py-2">Contextual Summary</th>
                    <th className="px-4 py-2">Technical Summary</th>
                    <th className="px-4 py-2">Differences</th>
                    <th className="px-4 py-2">More Accurate</th>
                    <th className="px-4 py-2">Confidence</th>
                    <th className="px-4 py-2">Sample Values</th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((column, colIndex) => (
                    <tr
                      key={column.column_name || colIndex}
                      className="border-b border-slate-700 hover:bg-slate-700/30 last:border-b-0"
                    >
                      <td className="px-4 py-2 font-medium text-white">
                        {column.column_name || "--"}
                      </td>
                      <td className="px-4 py-2">
                        <span className="bg-[#795EFF] text-white px-2 py-0.5 rounded text-xs capitalize">
                          {column.inferred_sql_type || "--"}
                        </span>
                      </td>
                      <td className="px-4 py-2">{column.contextual_summary || "--"}</td>
                      <td className="px-4 py-2">{column.technical_summary || "--"}</td>
                      <td className="px-4 py-2 text-xs">{column.differences || "--"}</td>
                      <td className="px-4 py-2">{column.more_accurate || "--"}</td>
                      <td className="px-4 py-2 w-40">
                        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-green-500 h-4 text-xs font-bold text-center text-black flex items-center justify-center"
                            style={{ width: column.confidence || "0%" }}
                          >
                            {column.confidence || "0%"}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-slate-400 text-xs">
                        <code>
                          {Array.isArray(column.sample_values)
                            ? column.sample_values.slice(0, 5).join(", ")
                            : "--"}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
