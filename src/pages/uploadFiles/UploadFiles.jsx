import React, { useState, useContext } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../service/ApiService";
import { Context } from "../../common/helper/Context";
import SessionForm from "../uploadFiles/components/SessionForm";
import FileUploader from "../uploadFiles/components/FileUploader";
import AnalysisOptions from "../uploadFiles/components/AnalysisOptions";
import InfoSection from "../uploadFiles/components/InfoSection";
import { POST_url } from "../../connection/connection";

function UploadFiles() {
  const [sessionName, setSessionName] = useState("");
  const { files, setFiles, setPatterns, setRelationships, setDataTypes, setInsights, setGraphUrl } = useContext(Context);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

// const handleUpload = async () => {
//   if (files.length === 0) {
//     alert("Please select files before uploading!");
//     return;
//   }
//   if (sessionName.trim() === "") {
//     alert("Please enter a session name!");
//     return;
//   }

//   setIsUploading(true);

//   const formData = new FormData();
//   formData.append("session_name", sessionName);
//   files.forEach((file) => formData.append("files", file));

//   // ✅ Helper to call API safely
//   const callApi = async (url, name) => {
//     try {
//       const response = await apiService({ url, method: "POST", data: formData });
//       console.log(`✅ ${name} response:`, response);
//       return response;
//     } catch (err) {
//       console.error(`❌ ${name} failed:`, err);
//     }
//   };

//   // 🔹 1️⃣ Start Data Types API in background
//   callApi(POST_url.dataTypes, "Data Types API").then((data_types_response) => {
//     if (data_types_response?.results?.files) {
//       const transformed = Object.entries(data_types_response.results.files).map(
//         ([fileName, fileData]) => {
//           const columns = Object.values(fileData.metadata || {}).map((colMeta) => {
//             const comparisonMeta = fileData.comparison?.[colMeta.column_name] || {};
//             return {
//               column_name: colMeta.column_name,
//               inferred_sql_type: colMeta.technical_metadata?.inferred_sql_type || "",
//               contextual_summary: comparisonMeta.contextual_summary || "",
//               technical_summary: comparisonMeta.technical_summary || "",
//               differences: Array.isArray(colMeta.differences)
//                 ? colMeta.differences.join(" | ")
//                 : "",
//               more_accurate: colMeta.which_is_more_accurate?.selected || "",
//               confidence: `${Math.round((colMeta.contextual_metadata?.confidence || 0) * 100)}%`,
//               sample_values: colMeta.technical_metadata?.sample_values || [],
//             };
//           });
//           return { table_name: fileName, columns };
//         }
//       );
//       setDataTypes(transformed);
//       if (data_types_response.results.relationships) {
//         setRelationships(data_types_response.results.relationships);
//       }
//     }
//   });

//   // 🔹 2️⃣ Start Uploads API
//   callApi(POST_url.uploads, "Uploads API").then(async (upload_response) => {
//     if (upload_response?.html_url) setGraphUrl(upload_response.html_url);

//     // 🔹 3️⃣ Start Insights API **only after Uploads API succeeds**
//     const insights_response = await callApi(POST_url.insights, "Insights API");
//     if (insights_response?.insights) setInsights(insights_response.insights);
//   });

//   // 🔹 4️⃣ Start Chat Insights Upload API independently
//   callApi("http://122.163.121.176:3029/upload_files", "Chat Insights Upload API").then(
//     (chatInsightsUpload) => {
//       if (chatInsightsUpload?.session_id) {
//         localStorage.setItem("session_id", chatInsightsUpload.session_id);
//       }
//     }
//   );

//   // ✅ Navigate immediately
//   navigate("/");
//   setIsUploading(false);
// };

const handleUpload = async () => {
  if (files.length === 0) {
    alert("Please select files before uploading!");
    return;
  }
  if (sessionName.trim() === "") {
    alert("Please enter a session name!");
    return;
  }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("session_name", sessionName);
    files.forEach((file) => formData.append("files", file));

  // ✅ Helper to call API safely
  const callApi = async (url, name) => {
    try {
      const response = await apiService({ url, method: "POST", data: formData });
      console.log(`✅ ${name} response:`, response);
      return response;
    } catch (err) {
      console.error(`❌ ${name} failed:`, err);
      return null;
    }
  };

  try {
    // 1️⃣ DataTypes API — MUST succeed first
    const dataTypesRes = await callApi(POST_url.dataTypes, "Data Types API");

    if (dataTypesRes?.results?.files) {
      const transformed = Object.entries(dataTypesRes.results.files).map(
        ([fileName, fileData]) => {
          const columns = Object.values(fileData.metadata || {}).map((colMeta) => {
            const comparisonMeta = fileData.comparison?.[colMeta.column_name] || {};
            return {
              column_name: colMeta.column_name,
              inferred_sql_type: colMeta.technical_metadata?.inferred_sql_type || "",
              contextual_summary: comparisonMeta.contextual_summary || "",
              technical_summary: comparisonMeta.technical_summary || "",
              differences: Array.isArray(colMeta.differences)
                ? colMeta.differences.join(" | ")
                : "",
              more_accurate: colMeta.which_is_more_accurate?.selected || "",
              confidence: `${Math.round((colMeta.contextual_metadata?.confidence || 0) * 100)}%`,
              sample_values: colMeta.technical_metadata?.sample_values || [],
            };
          });
          return { table_name: fileName, columns };
        }
      );
      setDataTypes(transformed);
      if (dataTypesRes.results.relationships) {
        setRelationships(dataTypesRes.results.relationships);
      }
    } else {
      alert("Data Types API failed — stopping further execution.");
      setIsUploading(false);
      return;
    }

    // 2️⃣ Once DataTypes API succeeds → run others in background (parallel)
    (async () => {
      // Uploads + Insights chain
      const uploadRes = await callApi(POST_url.uploads, "Uploads API");
      if (uploadRes?.html_url) setGraphUrl(uploadRes.html_url);

      const insightsRes = await callApi(POST_url.insights, "Insights API");
      if (insightsRes?.insights) setInsights(insightsRes.insights);
    })();

    // Chat Insights Upload (independent)
    (async () => {
      const chatInsightsRes = await callApi("http://122.163.121.176:3029/upload_files", "Chat Insights Upload API");
      if (chatInsightsRes?.session_id) {
        localStorage.setItem("session_id", chatInsightsRes.session_id);
      }
    })();

    // 3️⃣ Navigate immediately
    navigate("/");
  } finally {
    setIsUploading(false);
  }
};



  return (
    <div className="max-w-[70%] mx-auto rounded-md shadow-md p-1 space-y-6 ">
      <div className="border-b border-slate-700 pb-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <UploadCloud className="w-5 h-5 text-[#795EFF]" />
          Upload Database Files
        </h2>
        <p className="text-slate-400 text-sm">
          Upload multiple database files for intelligent analysis
        </p>
      </div>
      <SessionForm sessionName={sessionName} setSessionName={setSessionName} />
      <FileUploader files={files} setFiles={setFiles} />
      <AnalysisOptions />
      <div>
        <button
          disabled={isUploading}
          onClick={handleUpload}
          className="w-full bg-[#795effe0] hover:bg-[#795EFF] text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : (
            <><UploadCloud className="w-5 h-5" /> Upload Files</>
          )}
        </button>
      </div>
      <InfoSection />
    </div>
  );
}

export default UploadFiles;