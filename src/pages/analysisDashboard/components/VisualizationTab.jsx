import { useContext } from "react";
import { Context } from "../../../common/helper/Context";

function VisualizationTab() {
  // Access graphUrl and insights from context
  const { graphUrl, insights } = useContext(Context);

  return (
    <div style={{ width: "100%", minHeight: "100%", overflow: "auto", padding: "20px" }}>
      {/* Graph Visualization */}
      {graphUrl && (
        <div
          style={{
            transform: "scale(1)",  // scale as needed
            transformOrigin: "center",
            width: "max-content",
            height: "max-content",
            marginBottom: "40px"
          }}
        >
          <iframe
            src={graphUrl}
            style={{
              width: 1000,
              height: 800,
              border: "0",
            }}
            title="Visualization Graph"
          />
        </div>
      )}

      {/* Insights Section */}
      <div className="space-y-4">
        <h3 className="text-black text-xl font-semibold mb-2">Grammatical Insights</h3>
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
          <p className="text-gray-300">No insights available yet.</p>
        )}
      </div>
    </div>
  );
}

export default VisualizationTab;
