import React, { useState } from "react";
import AnalysisHeader from "../analysis/components/AnalysisHeader";
import AnalysisStats from "../analysis/components/AnalysisStats";
import AnalysisContent from "../analysis/components/AnalysisContent";

export default function Analysis() {
  const [analyzed, setAnalyzed] = useState(null);

  return (
    <div>
      <AnalysisHeader />
      <AnalysisStats />
      <AnalysisContent analyzed={analyzed} setAnalyzed={setAnalyzed} />
    </div>
  );
}