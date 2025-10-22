import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { ScrollPanel } from 'primereact/scrollpanel';
import { useNavigate } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { useTableTrackerData } from '../../../data/useTableTrackerData';

function RecentSessions() {
    const navigate = useNavigate();
    const { data: recentSessions, loading } = useTableTrackerData();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="px-6 min-w-0">
            <h3 className="font-semibold text-lg mb-4">Recent Analysis Sessions</h3>
            <div className="space-y-4">
                <ScrollPanel style={{ width: '100%', height: '300px' }}>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 mb-4">
                                <div className="flex-1">
                                    <Skeleton width="60%" height="1.25rem" className="mb-2" />
                                    <Skeleton width="40%" height="0.875rem" />
                                </div>
                                <Skeleton shape="circle" size="2rem" className="ml-4" />
                            </div>
                        ))
                    ) : (
                        (recentSessions || []).slice(0, 5).map((session) => (
                            <div
                                key={session.id}
                                className="flex justify-between items-center bg-[#1a202c] p-3 hover:bg-[#334155] rounded-sm mb-4"
                            >
                                <div>
                                    <p className="font-semibold cursor-default">{session.SESSION_NAME}</p>
                                    <p className="text-xs text-[#94a3b8] cursor-default">
                                        {session.SESSION_STATUS} • {formatDate(session.SESSION_TIME)}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-md bg-[#795eff] hover:bg-[#6a4be8] cursor-pointer" onClick={() => navigate('/analysis')}>
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-md bg-[#961010] hover:bg-[#7f0e0e] cursor-pointer">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </ScrollPanel>
            </div>
        </div >
    )
}

export default RecentSessions