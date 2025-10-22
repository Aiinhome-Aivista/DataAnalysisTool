import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Eye, Trash2, Search, RefreshCw } from 'lucide-react';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import { apiService } from '../../../service/ApiService';
import { GET_url } from '../../../connection/connection';

function Datatable() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);


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

    const fetchTrackerData = async () => {
        setLoading(true); // For the refresh button icon
        try {
            const response = await apiService({ url: GET_url.TableTracker });
            if (response && response.status === 'success' && Array.isArray(response.data)) {
                setData(response.data);
            } else {
                console.error("Failed to fetch tracker data or data is not in the expected format:", response);
                setData([]); // Set to empty array on failure
            }
        } catch (error) {
            console.error("API error while fetching tracker data:", error);
            setData([]); // Also set to empty array on API error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTrackerData();
    }, []);

    useEffect(() => {
        let filtered = [...data];

        // Filter by search term
        if (search) {
            const lowercasedSearch = search.toLowerCase();
            filtered = filtered.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(lowercasedSearch)
                )
            );
        }

        setFilteredData(filtered);
    }, [data, search]);

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#795eff] hover:bg-[#6a4be8] cursor-pointer"
                    onClick={() => navigate('/analysis')}>
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
        if (col.field === 'SESSION_STATUS' && value === 'Success') {
            return 'Completed';
        }
        return value == null || value === '' ? '--' : value;
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row items-center justify-end mt-6 gap-4">
                {/* Search */}
                <div className="relative w-1/4">
                    <input
                        type="text"
                        placeholder="Search content"
                        className="w-full h-10 pl-4 pr-10 border border-[#4a5568] rounded-lg text-[#cbd5e1] text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#1e293b]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94a3b8] cursor-default"
                    />
                </div>

                <div
                    className={`relative text-center border border-[#4a5568] rounded-lg w-10 h-10 flex items-center justify-center transition-colors ${loading ? 'bg-[#334155] cursor-not-allowed' : 'bg-[#1e293b] cursor-pointer hover:bg-[#334155]'}`}
                    onClick={loading ? undefined : fetchTrackerData}
                >
                    <RefreshCw className={`w-5 h-5 transition-colors ${loading ? 'animate-spin text-white' : 'text-[#94a3b8] hover:text-white'}`} />
                </div>
            </div>

            <DataTable value={filteredData} className="w-full" rowHover loading={loading}>
                {columns.map((col, i) => {
                    if (col.field === 'action') {
                        return <Column key={col.field} header={col.header} body={actionBodyTemplate} />;
                    }
                    return <Column key={col.field} field={col.field} header={col.header} body={defaultBodyTemplate} />;
                })}
            </DataTable>
        </div>
    );
}

export default Datatable;