import { FileSpreadsheet, Database, Grid, Code2, HelpCircle } from "lucide-react";

function HowItWorks() {
    const steps = [
        {
            id: 1,
            color: "bg-violet-500",
            title: "Upload Files",
            desc: "Upload multiple database files in supported formats",
        },
        {
            id: 2,
            color: "bg-green-500",
            title: "Auto Analysis",
            desc: "AI analyzes data types, patterns, and relationships",
        },
        {
            id: 3,
            color: "bg-yellow-600",
            title: "View Insights",
            desc: "Review detailed analysis results and recommendations",
        },
        {
            id: 4,
            color: "bg-cyan-500",
            title: "Export Results",
            desc: "Download analysis reports in various formats",
        },
    ];

    return (
        <div className="w-[100%]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                {/* Add your HelpCircle icon import and usage here if needed */}
                <h2 className="text-white font-semibold">How It Works</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-22 px-6 py-6 text-center">
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center max-w-[200px]">
                        <div
                            className={`${step.color} w-14 h-14 flex items-center justify-center rounded-full text-white font-bold text-lg`}
                        >
                            {step.id}
                        </div>
                        <h3 className="mt-3 text-white font-semibold">{step.title}</h3>
                        <p className="text-slate-400 text-sm mt-1">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default HowItWorks