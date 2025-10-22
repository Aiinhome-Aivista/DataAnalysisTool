import { createContext, useState } from 'react'
export const Context = createContext();

export function ContextProvider({ children }) {
    const [files, setFiles] = useState([]);
    const [patterns, setPatterns] = useState([]);
    const [relationships, setRelationships] = useState([]);
    const [dataTypes, setDataTypes] = useState([])
    const [insights, setInsights] = useState([]);
    const [graphUrl, setGraphUrl] = useState([]);

    return (
        <Context.Provider value={{
            files, setFiles,
            patterns, setPatterns,
            relationships, setRelationships,
            dataTypes, setDataTypes,
            insights, setInsights,
            graphUrl, setGraphUrl,
        }}>
            {children}
        </Context.Provider>
    )
}