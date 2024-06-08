import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import LandingPage from "./pages/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App