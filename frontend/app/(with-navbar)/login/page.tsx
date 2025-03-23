"use client";

import { FadeOverlay } from "@/components/fadeOverlay";
import Starfield from "@/components/starfield";
import { Button } from "@/components/ui/button";
import { EyeClosed, EyeIcon, LockIcon, UserIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { motion } from "motion/react";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUser } from "@/components/context/userContext";
import { redirect } from "next/navigation";

interface FormData {
    username: string;
    password: string;
}

interface FormErrors {
    main: string;
}

export default function Login() {
    const [userFocus, setUserFocus] = useState(true);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useUser();

    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState<FormErrors>({
        main: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors.main) {
            setErrors({ main: "" });
        }
    };

    const isEmail = (email: string): boolean => {
        const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return re.test(email);
    };

    const checkUsernameAvailability = async (
        username: string
    ): Promise<boolean> => {
        try {
            const response = await fetch(
                `/api/users/duplicate-username?username=${encodeURIComponent(
                    username
                )}`
            );
            const data = await response.json();
            return data.exists;
        } catch (error) {
            console.error("Error checking username", error);
            return false;
        }
    };

    const loginUserWithUsername = async (
        username: string
    ): Promise<string | null> => {
        try {
            const response = await fetch(
                `/api/users/login-with-username?username=${encodeURIComponent(
                    username
                )}`
            );
            const data = await response.json();
            if (data.loginSuccess) {
                return data.email;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error logging in user with username", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const newErrors = { main: "" };

        if (!formData.password || !formData.username) {
            newErrors.main = "Please fill out all fields.";
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            let userCredential: UserCredential;

            if (isEmail(formData.username)) {
                userCredential = await signInWithEmailAndPassword(
                    auth,
                    formData.username,
                    formData.password
                );
            } else {
                const usernameExists = await checkUsernameAvailability(
                    formData.username
                );
                if (usernameExists) {
                    const email = await loginUserWithUsername(
                        formData.username
                    );
                    if (email) {
                        userCredential = await signInWithEmailAndPassword(
                            auth,
                            email,
                            formData.password
                        );
                    } else {
                        newErrors.main = "Username or password incorrect.";
                        setErrors(newErrors);
                        setLoading(false);
                        return;
                    }
                } else {
                    newErrors.main = "Username or password incorrect.";
                    setErrors(newErrors);
                    setLoading(false);
                    return;
                }
            }

            // Get the ID token
            const idToken = await userCredential.user.getIdToken();

            // Send the ID token to your /api/session endpoint
            const response = await fetch("/api/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                // Handle error setting session cookie
                throw new Error("Failed to set session cookie");
            }

            redirect(`/u/${formData.username}`);
        } catch (error: any) {
            if (error.code === "auth/invalid-credential") {
                newErrors.main = "Incorrect email, username, or password";
            } else {
                newErrors.main =
                    error.message || "Login failed. Please try again.";
            }

            setErrors(newErrors);
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        redirect(`/u/${username}`);
    }

    return (
        <div className="h-full z-[2]">
            <FadeOverlay />
            <div
                className="invisible md:visible h-full w-full absolute top-0 left-0 right-0 z-0"
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                    maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                }}
            >
                <Starfield
                    starCount={800}
                    repulsionRadius={50}
                    repulsionStrength={0.08}
                    returnSpeed={0.03}
                    isMobile={false}
                    topHalfOnly={false}
                />
            </div>
            {/* MOBILE */}
            <div
                className="visible md:invisible h-full w-full absolute top-0 left-0 right-0 z-0"
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                    maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                }}
            >
                <Starfield
                    starCount={300}
                    isMobile={true}
                    repulsionRadius={50}
                    repulsionStrength={0.08}
                    returnSpeed={0.03}
                />
            </div>

            <motion.div
                className="flex flex-col w-full fixed inset-0 h-full items-center justify-center"
                initial={{ opacity: 0, y: "50%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="max-w-md w-full p-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl lg:text-3xl text-center font-sora font-extrabold text-white">
                            Welcome back :3
                        </h2>

                        {errors.main && (
                            <motion.p
                                className="text-sm text-center text-red-200 font-aleo"
                                initial={{ y: -20, height: 0, opacity: 0 }}
                                animate={{ y: 0, height: 16, opacity: 1 }}
                                exit={{ y: -20, height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, type: "spring" }}
                            >
                                {errors.main}
                            </motion.p>
                        )}

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row border border-white/25 bg-white/10 text-white text-lg font-aleo font-normal gap-2 h-12 rounded-full items-center focus-within:border-white transition-all duration-150 ease-in-out focus-within:shadow-white/10 focus-within:shadow-lg backdrop-blur-sm">
                                <UserIcon
                                    strokeWidth={1.5}
                                    className={`ml-4 transition-all duration-150 ease-in-out ${
                                        userFocus
                                            ? "stroke-white/75"
                                            : "stroke-white/25"
                                    }`}
                                />
                                <input
                                    type="text"
                                    name="username"
                                    inputMode="text"
                                    autoCapitalize="off"
                                    aria-invalid={!!errors.main}
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    autoFocus
                                    autoComplete="username"
                                    aria-describedby="username-error"
                                    spellCheck="false"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    placeholder="Email or username"
                                    className="peer w-full h-full bg-transparent outline-none border-none text-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row border border-white/25 bg-white/10 text-white text-lg font-aleo font-normal gap-2 h-12 rounded-full items-center focus-within:border-white transition-all duration-150 ease-in-out focus-within:shadow-white/10 focus-within:shadow-lg backdrop-blur-sm">
                                <LockIcon
                                    strokeWidth={1.5}
                                    className={`ml-4 transition-all duration-150 ease-in-out ${
                                        pwdFocus
                                            ? "stroke-white"
                                            : "stroke-white/25"
                                    }`}
                                />
                                <input
                                    type={eyeOpen ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="new-password"
                                    aria-describedby="password-error"
                                    spellCheck="false"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    placeholder="Password"
                                    className="w-full h-full bg-transparent outline-none border-none text-lg"
                                />

                                <button
                                    className="mr-4"
                                    onClick={() => setEyeOpen(!eyeOpen)}
                                    tabIndex={-1}
                                    disabled={loading}
                                >
                                    {eyeOpen ? (
                                        <EyeIcon
                                            strokeWidth={1.5}
                                            className="eye-fade"
                                        />
                                    ) : (
                                        <EyeClosed
                                            strokeWidth={1.5}
                                            className="eye-fade"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <Button
                                variant="default"
                                size="lg"
                                onClick={handleSubmit}
                                className="bg-white/20 hover:bg-white/30 border-white/30 mt-4"
                            >
                                {loading ? (
                                    <span className="text-white">
                                        Loading...
                                    </span>
                                ) : (
                                    <span className="text-white">Log in</span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
