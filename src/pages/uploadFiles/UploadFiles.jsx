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
  const { files, setFiles, setPatterns, setRelationships, setDataTypes, setInsights, setGraphUrl} = useContext(Context);
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
//   formData.append("sessionName", sessionName);
//   files.forEach((file) => {
//     formData.append("files", file);
//   });

//   try {
//     const data_types_response = await apiService({
//       url: POST_url.dataTypes,
//       method: "POST",
//       data: formData,
//     });

//     if (data_types_response.error) {
//       throw new Error(data_types_response.message);
//     }

//     // 🔹 Transform API response into table-friendly format
//     const transformed = Object.entries(data_types_response.files).map(
//       ([fileName, fileData]) => {
//         const columns = Object.values(fileData.metadata).map((colMeta) => {
//           // fetch comparison object for summaries
//           const comparisonMeta = fileData.comparison?.[colMeta.column_name] || {};

//           return {
//             column_name: colMeta.column_name,
//             inferred_sql_type: colMeta.technical_metadata?.inferred_sql_type || "",
            
//             // ✅ Correct binding from comparison object
//             contextual_summary: comparisonMeta.contextual_summary || "",
//             technical_summary: comparisonMeta.technical_summary || "",
            
//             differences: Array.isArray(colMeta.differences)
//               ? colMeta.differences.join(" | ")
//               : "",
//             more_accurate: colMeta.which_is_more_accurate?.selected || "",
//             confidence: `${Math.round(
//               (colMeta.contextual_metadata?.confidence || 0) * 100
//             )}%`,
//             sample_values: colMeta.technical_metadata?.sample_values || [],
//           };
//         });

//         return {
//           table_name: fileName,
//           columns,
//         };
//       }
//     );

//     // ✅ Save transformed table data
//     setDataTypes(transformed);

//     // ✅ Save relationships from API response
//     if (data_types_response.relationships) {
//       setRelationships(data_types_response.relationships);
//     }
//      const insights_response = await apiService({
//     url: POST_url.insights,
//     method: "POST",
//     data: formData,
//   });

//   if (insights_response?.insights) {
//     setInsights(insights_response.insights);
//   }

//     navigate("/analysis");
//   } catch (error) {
//     console.error("Upload failed:", error);
//     alert(`Upload failed: ${error.message}`);
//   } finally {
//     setIsUploading(false);
//   }
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
  formData.append("sessionName", sessionName);
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    // 1️⃣ Call dataTypes API
    const data_types_response = await apiService({
      url: POST_url.dataTypes,
      method: "POST",
      data: formData,
    });

    if (data_types_response.error) {
      throw new Error(data_types_response.message);
    }

    const transformed = Object.entries(data_types_response.files).map(
      ([fileName, fileData]) => {
        const columns = Object.values(fileData.metadata).map((colMeta) => {
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
            confidence: `${Math.round(
              (colMeta.contextual_metadata?.confidence || 0) * 100
            )}%`,
            sample_values: colMeta.technical_metadata?.sample_values || [],
          };
        });

        return {
          table_name: fileName,
          columns,
        };
      }
    );

    setDataTypes(transformed);

    if (data_types_response.relationships) {
      setRelationships(data_types_response.relationships);
    }

    // 2️⃣ Call insights API
    const insights_response = await apiService({
      url: POST_url.insights,
      method: "POST",
      data: formData,
    });

    if (insights_response?.insights) {
      setInsights(insights_response.insights);
    }

    // 3️⃣ Call uploads API LAST
 const upload_response = await apiService({
  url: POST_url.uploads,
  method: "POST",
  data: formData,
});

if (upload_response.error) {
  throw new Error(upload_response.message);
}
if (upload_response.html_url) {
  setGraphUrl(upload_response.html_url); 
}

  // ✅ 4️⃣ Call Chat Insights Upload API (LAST)
    const chatInsightsUpload = await apiService({
      url: "http://122.163.121.176:3029/upload_files",
      method: "POST",
      data: formData,
    });

    if (chatInsightsUpload.error) {
      console.warn("Chat Insights upload failed:", chatInsightsUpload.message);
    } else {
      console.log("✅ Chat Insights files uploaded successfully!");

      // ✅ Store session_id globally (for next pages)
      if (chatInsightsUpload.session_id) {
        localStorage.setItem("session_id", chatInsightsUpload.session_id);
        console.log("✅ Session ID saved:", chatInsightsUpload.session_id);
      }
    }

    navigate("/analysis");
  } catch (error) {
    console.error("Upload failed:", error);
    alert(`Upload failed: ${error.message}`);
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