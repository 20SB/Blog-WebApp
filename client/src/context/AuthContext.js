import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const serverUrl = process.env.REACT_APP_BACKEND_URL;
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        setUser(userInfo);

        if (!userInfo) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser, serverUrl }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthState = () => {
    return useContext(AuthContext);
};
export default AuthContextProvider;
