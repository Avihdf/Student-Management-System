import { useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const api_url = import.meta.env.VITE_API_URL

    // Fetch user details after login or refresh
    const userdetails = async () => {
        try {
            const res = await axios.get(`${api_url}/student/studentData`, { withCredentials: true });
            // console.log("User API response:", res.data);
            setUser(res.data.user);
            
        } catch (err) {
            if (err.response?.status !== 401) console.error("Error fetching user data:", err);
            setUser(null);
        }
    };

    // Fetch admin details after login or refresh
    const admindetails = async () => {
        try {
            const res = await axios.get(`${api_url}/admin/adminData`, { withCredentials: true });
            // console.log("Admin API response:", res.data);
            setAdmin(res.data.admin);

        } catch (err) {
            if (err.response?.status !== 401) console.error("Error fetching admin data:", err);
            setAdmin(null);
        }
    };

    // Auto check on mount (refresh case)
    useEffect(() => {
        const restoreSession = async () => {
            try {
                await userdetails();
                await admindetails();
            } finally {
                setLoading(false);
            }
        };
        restoreSession();
    }, []);


    return (
        <AppContext.Provider value={{ user, setUser, admin, setAdmin, loading, userdetails, admindetails }}>
            {children}
        </AppContext.Provider>
    );
};
