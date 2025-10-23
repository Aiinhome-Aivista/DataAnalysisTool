import React, { useContext } from "react";
import { Context } from "../../../common/helper/Context";

function VisualizationTab() {
  const { activeSession, sessionData } = useContext(Context);

  // Load graphUrl and insights for the active session
  const graphUrl = activeSession ? sessionData[activeSession]?.graphUrl : null;
  const insights = activeSession ? sessionData[activeSession]?.insights : [];

  return (
    <div style={{ width: "100%", minHeight: "100%", overflow: "auto", padding: "20px" }}>
      {/* Graph Visualization */}
      <div className="mb-10">
        {graphUrl ? (
          <div
            style={{
              width: "100%",
              height: "600px",
              overflow: "hidden",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <iframe
              src={graphUrl}
              style={{ width: "100%", height: "100%", border: 0 }}
              title="Visualization Graph"
            />
          </div>
        ) : (
          <p className="text-gray-400 text-center">Graph visualization not available.</p>
        )}
      </div>

      {/* Insights Section */}
      <div className="space-y-4">
        <h3 className="text-black text-xl font-semibold mb-2">Data Insights</h3>
        {insights && insights.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="p-4 bg-slate-700 text-white rounded-xl shadow hover:shadow-lg transition"
              >
                {insight}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No insights available yet.</p>
        )}
      </div>
    </div>
  );
}

export default VisualizationTab;
