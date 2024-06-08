import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
                    <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
                    <InputBox onChange={(e) => setEmail(e.target.value)} placeholder="abc1224@gmail.com" label={"Email"} />
                    <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div className="pt-4">
                        <Button onClick={handleSignup} label={loading ? "Signing up..." : "Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
};
