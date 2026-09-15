    import { createContext, useContext, useEffect, useState } from "react";
    import api from "../lib/axios";
    import toast from "react-hot-toast";

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        setUser(res.data);
        toast.success("Logged in successfully!");
    };

    const register = async (username, email, password) => {
        const res = await api.post("/auth/register", { username, email, password });
        setUser(res.data);
        toast.success("Account created successfully!");
    };

    const logout = async () => {
        try {
        await api.post("/auth/logout");
        setUser(null);
        toast.success("Logged out successfully!");
        } catch (error) {
        console.log("Error logging out", error);
        toast.error("Failed to logout");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => useContext(AuthContext);