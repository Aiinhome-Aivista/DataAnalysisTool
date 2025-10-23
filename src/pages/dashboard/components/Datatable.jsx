import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Eye, Trash2, Search, RefreshCw } from 'lucide-react';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import Loader from '../../../common/components/Loader';
import { useTableTrackerData } from '../../../data/useTableTrackerData';
import { GET_url } from '../../../connection/connection';
import { Context } from '../../../common/helper/Context';

function Datatable() {
    const navigate = useNavigate();
    const { data, loading, fetchTrackerData } = useTableTrackerData();
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [loadingSession, setLoadingSession] = useState(null); // Track loading by session name
    const { setPatterns, setRelationships, setDataTypes, setInsights, setGraphUrl } = useContext(Context)

    const columns = [
        { field: 'SESSION_NAME', header: 'Session Name' },
        { field: 'TABLE_NAME', header: 'Table Name' },
        { field: 'DATA_TYPE_ANALYZER', header: 'Datatypes' },
        { field: 'RELATIONSHIPS', header: 'Relationships' },
        { field: 'VISUALIZATION', header: 'Visualization' },
        { field: 'INSIGHTS', header: 'Data Insights' },
        { field: 'SESSION_STATUS', header: 'Status' },
        { field: 'action', header: 'Action' },
    ];

    useEffect(() => {
        let filtered = [...data];

        if (search) {
            const lower = search.toLowerCase();
            filtered = filtered.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(lower)
                )
            );
        }

        setFilteredData(filtered);
    }, [data, search]);

    // ✅ Function to call API on "View" click
    const handleViewClick = async (rowData) => {
        const sessionName = rowData.SESSION_NAME;
        if (!sessionName) {
            alert("Session name missing!");
            return;
        }

        try {
            setLoadingSession(sessionName); // Set loading for this specific row
            const response = await fetch(GET_url.viewInfo(sessionName));
            if (!response.ok) throw new Error("Failed to fetch view info");

            const result = await response.json();

            // The API response is nested inside `data[0].response`
            const responseData = result.data[0].response;
            const fileName = Object.keys(responseData.files)[0]; // Get the first file name
            const fileData = responseData.files[fileName];

            // Set all context states from the single response
            setPatterns(fileData.comparison);
            setDataTypes(fileData.metadata);
            setRelationships(responseData.relationships);
            setInsights(result.insights.insights);
            setGraphUrl(result.graph_url);

            // Also save session_id for chat insights if it exists
            if (result.session_id) {
                localStorage.setItem("session_id", result.session_id);
            }
            navigate('/analysis');
        } catch (error) {
            console.error("Error fetching view info:", error);
            alert("Failed to load session details.");
        } finally {
            setLoadingSession(null); // Clear loading state
        }
    };

    const actionBodyTemplate = (rowData) => {
        const isCurrentRowLoading = loadingSession === rowData.SESSION_NAME;
        return (
            <div className="flex gap-2">
                <button
                    className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer ${isCurrentRowLoading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-[#795eff] hover:bg-[#6a4be8]'
                        }`}
                    disabled={isCurrentRowLoading || loadingSession} // Disable if this or any other row is loading
                    onClick={() => handleViewClick(rowData)}
                >
                    <Eye className="w-4 h-4" />
                </button>

                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#961010] hover:bg-[#7f0e0e] cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        );
    };
    const defaultBodyTemplate = (rowData, col) => {
        const value = rowData[col.field];
        if (col.field === 'SESSION_STATUS' && value === 'Success') return 'Completed';
        if (col.field === 'RELATIONSHIPS') return 'Done';
        return value == null || value === '' ? '--' : value;
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row items-center justify-end mt-6 gap-4">
                {/* Search Input */}
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search content"
                        className="w-full h-10 pl-4 pr-10 border border-[#4a5568] rounded-lg text-[#cbd5e1] text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#1e293b]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                </div>

                {/* Refresh Button */}
                <div
                    className={`relative text-center border border-[#4a5568] rounded-lg w-10 h-10 flex items-center justify-center transition-colors ${loading ? 'bg-[#334155] cursor-not-allowed' : 'bg-[#1e293b] cursor-pointer hover:bg-[#334155]'
                        }`}
                    onClick={loading ? undefined : fetchTrackerData}
                >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-white' : 'text-[#94a3b8] hover:text-white'}`} />
                </div>
            </div>

            <DataTable
                value={filteredData}
                className="w-full"
                rowHover
                emptyMessage={loading ? <Loader /> : "No sessions found."}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
                {columns.map((col) =>
                    col.field === 'action'
                        ? <Column key={col.field} header={col.header} body={actionBodyTemplate} />
                        : <Column key={col.field} field={col.field} header={col.header} body={defaultBodyTemplate} />
                )}
            </DataTable>
        </div>
    );
}

export default Datatable;
