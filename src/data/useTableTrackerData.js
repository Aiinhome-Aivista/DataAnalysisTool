import { useState, useEffect } from 'react';
import { apiService } from '../service/ApiService'; // Adjust path as necessary
import { GET_url } from '../connection/connection'; // Adjust path as necessary

/**
 * Custom hook to fetch and manage table tracker data.
 * @returns {{data: Array, loading: boolean, fetchTrackerData: Function}}
 */
export function useTableTrackerData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Initial loading state

    const fetchTrackerData = async () => {
        setLoading(true);
        try {
            const response = await apiService({ url: GET_url.TableTracker });
            if (response && response.status === 'success' && Array.isArray(response.data)) {
                setData(response.data);
            } else {
                console.error("Failed to fetch tracker data or data is not in the expected format:", response);
                setData([]);
            }
        } catch (error) {
            console.error("API error while fetching tracker data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrackerData(); // Fetch data on component mount
    }, []);

    return { data, loading, fetchTrackerData };
}

