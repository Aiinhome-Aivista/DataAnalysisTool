import { useState, useEffect, useContext } from 'react';
import { apiService } from '../service/ApiService'; // Adjust path as necessary
import { GET_url } from '../connection/connection'; // Adjust path as necessary
import { Context } from '../common/helper/Context';

/**
 * Custom hook to fetch and manage table tracker data.
 * @returns {{data: Array, loading: boolean, fetchTrackerData: Function}}
 */
export function useTableTrackerData() {
    const { trackerData, setTrackerData } = useContext(Context);
    const [loading, setLoading] = useState(!trackerData); // Only load if data is not already in context

    const fetchTrackerData = async () => {
        setLoading(true);
        try {
            const response = await apiService({ url: GET_url.TableTracker });
            if (response && response.status === 'success' && Array.isArray(response.data)) {
                setTrackerData(response.data);
            } else {
                console.error("Failed to fetch tracker data or data is not in the expected format:", response);
                setTrackerData([]);
            }
        } catch (error) {
            console.error("API error while fetching tracker data:", error);
            setTrackerData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch only if data is not already present in the context
        if (!trackerData) {
            fetchTrackerData();
        }
    }, [trackerData]); // Re-run if trackerData is reset elsewhere

    return { data: trackerData || [], loading, fetchTrackerData };
}
