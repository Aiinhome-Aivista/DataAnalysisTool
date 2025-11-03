const API_BASE_URL = "http://122.163.121.176:3029"
const API_BASE_URL2 = "http://127.0.0.1:5001"

export const POST_url = {
    dataTypes: `${API_BASE_URL}/analyze_files`,
    patterns: `${API_BASE_URL}/patterns`,
    insights: `${API_BASE_URL}/insight`,
    relationships: `${API_BASE_URL}/relationships`,
    uploads: `${API_BASE_URL}/upload`,
};

export const GET_url = {
    TableTracker: `${API_BASE_URL}/tracker`,
    viewInfo: (sessionName) => `${API_BASE_URL}/view_info?session_name=${sessionName}`,
};

// DELETE endpoints
export const DELETE_url = {
  deleteSession: (sessionName) =>
    `${API_BASE_URL2}/delete_session/${sessionName}`,
};