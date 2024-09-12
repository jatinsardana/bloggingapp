import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState<Partial<SignupInput>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors: Partial<SignupInput> = {};
        if (type === "signup" && !postInputs.name) {
            newErrors.name = "Name is required";
        }
        if (!postInputs.username) {
            newErrors.username = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(postInputs.username)) {
            newErrors.username = "Email is invalid";
        }
        if (!postInputs.password) {
            newErrors.password = "Password is required";
        } else if (postInputs.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function sendRequest() {
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            setErrors({ ...errors, general: "Error while processing your request. Please try again." });
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <motion.div 
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    {type === "signup" ? "Create an account" : "Welcome back"}
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                    <Link className="ml-2 text-blue-600 hover:text-blue-800 transition duration-300" to={type === "signin" ? "/signup" : "/signin"}>
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </p>
                {errors.general && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                        <AlertCircle className="mr-2" size={20} />
                        {errors.general}
                    </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); sendRequest(); }}>
                    {type === "signup" && (
                        <LabelledInput
                            label="Name"
                            placeholder="Jatin Sardana"
                            onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
                            error={errors.name}
                        />
                    )}
                    <LabelledInput
                        label="Email"
                        placeholder="abcd@gmail.com"
                        onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })}
                        error={errors.username}
                    />
                    <LabelledInput
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                        error={errors.password}
                        endAdornment={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        }
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300 flex justify-center items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : null}
                        {type === "signup" ? "Sign up" : "Sign in"}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
    endAdornment?: React.ReactNode;
}

function LabelledInput({ label, placeholder, onChange, type, error, endAdornment }: LabelledInputType) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <input
                    onChange={onChange}
                    type={type || "text"}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={placeholder}
                    required
                />
                {endAdornment}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default Auth;