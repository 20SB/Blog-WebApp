import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AuthPage />} exact />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;
