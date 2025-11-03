// import React, { useState } from "react";
// import AnalysisHeader from "../analysis/components/AnalysisHeader";
// import AnalysisStats from "../analysis/components/AnalysisStats";
// import AnalysisContent from "../analysis/components/AnalysisContent";

// export default function Analysis() {
//   const [analyzed, setAnalyzed] = useState(null);

//   return (
//     <div>
//       <AnalysisHeader />
//       <AnalysisStats />
//       <AnalysisContent analyzed={analyzed} setAnalyzed={setAnalyzed} />
//     </div>
//   );
// }


import React, { useState, useEffect, useContext } from "react";
import AnalysisHeader from "../analysis/components/AnalysisHeader";
import AnalysisStats from "../analysis/components/AnalysisStats";
import AnalysisContent from "../analysis/components/AnalysisContent";
import { Context } from "../../common/helper/Context";

export default function Analysis() {
  const [analyzed, setAnalyzed] = useState(null);
  const { updateSessionData, setActiveSession } = useContext(Context);

  useEffect(() => {
    // Restore session from localStorage when opened in a new tab
    const sessionName = localStorage.getItem("active_session_name");
    const sessionData = JSON.parse(localStorage.getItem("session_data") || "{}");

    if (sessionName && Object.keys(sessionData).length > 0) {
      setActiveSession(sessionName);
      updateSessionData(sessionName, sessionData);
      console.log("✅ Session restored from localStorage:", sessionName);
    } else {
      console.warn("⚠️ No session found in localStorage. Redirect or show message.");
    }
  }, [setActiveSession, updateSessionData]);

  return (
    <div>
      <AnalysisHeader />
      <AnalysisStats />
      <AnalysisContent analyzed={analyzed} setAnalyzed={setAnalyzed} />
    </div>
  );
}
