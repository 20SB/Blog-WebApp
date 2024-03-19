import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./Components/HomePage/Navbar";
import { AuthState } from "./context/AuthContext";
import { PostBlog } from "./pages/PostBlog";

function App() {
    const { user } = AuthState();
    return (
        <div className="App">
            {user && <Navbar />}
            <Routes>
                <Route path="/" element={<AuthPage />} exact />
                <Route path="/home" element={<HomePage />} />
                <Route path="/post" element={<PostBlog />} />
            </Routes>
        </div>
    );
}

export default App;
