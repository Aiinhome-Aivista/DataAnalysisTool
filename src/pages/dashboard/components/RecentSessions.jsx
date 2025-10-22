import { Eye, Trash2, Database, Zap, TrendingUp, Link } from "lucide-react";
import { ScrollPanel } from 'primereact/scrollpanel';
import { useNavigate } from "react-router-dom";

function RecentSessions() {
    const navigate = useNavigate();

    const recentSessions = [
        { name: "Session 1", files: 2, time: "Sep 13, 2025, 06:25 PM" },
        { name: "Session 2", files: 2, time: "Sep 13, 2025, 06:21 PM" },
        { name: "Session 3", files: 2, time: "Sep 13, 2025, 01:56 PM" },
        { name: "Session 4", files: 2, time: "Sep 13, 2025, 01:54 PM" },
        { name: "Session 5", files: 2, time: "Sep 13, 2025, 01:46 PM" },
    ];
    return (
        <div className="px-6 min-w-0">
            <h3 className="font-semibold text-lg mb-4">Recent Analysis Sessions</h3>
            <div className="space-y-4">
                <ScrollPanel style={{ width: '100%', height: '300px' }}>
                    {recentSessions.map((session, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center bg-slate-900 p-3 hover:bg-slate-800 rounded-sm mb-4"
                        >

                            <div>
                                <p className="font-semibold cursor-default">{session.name}</p>
                                <p className="text-xs text-slate-400 cursor-default">
                                    {session.files} files • {session.time}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-md bg-[#795effe0] hover:bg-[#795EFF] cursor-pointer"
                                    onClick={() => navigate('/analysis')}>
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-md bg-[#961010e0] hover:bg-[#961010ff] cursor-pointer">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </ScrollPanel>
            </div>
        </div >
    )
}

export default RecentSessions