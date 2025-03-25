"use client";

import { Button } from "@/components/ui/button";
import { useState, ChangeEvent, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import {
    EyeClosed,
    EyeIcon,
    LockIcon,
    MailIcon,
    ShieldCheckIcon,
    UserIcon,
} from "lucide-react";
import PricingCards from "@/components/ui/pricingCards";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import Error from "next/error";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define types for form data and errors
interface FormData {
    email: string;
    password: string;
    confirm: string;
    username: string;
}

interface FormErrors {
    email: string;
    password: string;
    confirm: string;
    username: string;
}

// prop types for each component
interface SignupStep1Props {
    formData: FormData;
    errors: FormErrors;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleNextStep: () => void;
}

interface SignupStep2Props extends SignupStep1Props {
    handleBack: () => void;
}

interface SignupSuccessProps {
    username: string;
    formData: FormData;
}

export default function Start() {
    const [stepNum, setStepNum] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirm: "",
        username: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirm: "",
        username: "",
    });

    const controls = useAnimation();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // clear error when typing
        if (errors[name as keyof FormErrors]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const validateEmail = (email: string): boolean => {
        const re = new RegExp(
            "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
        );
        return re.test(email);
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 8 && password.length <= 64;
    };

    const validateConfirm = (confirm: string): boolean => {
        return confirm === formData.password;
    };

    const validateUsername = (username: string): boolean => {
        return username.length >= 3;
    };

    const checkUsernameAvailability = async (username: string) => {
        try {
            const response = await fetch(
                `/api/users/duplicate-username?username=${encodeURIComponent(
                    username
                )}`
            );
            const data = await response.json();
            return data.exists; // Returns true if username exists/is taken
        } catch (error) {
            console.error("Error checking username", error);
            return false; // Default to false on error
        }
    };

    const checkEmailAvailability = async (email: string) => {
        try {
            const response = await fetch(
                `/api/users/duplicate-email?email=${encodeURIComponent(email)}`
            );

            if (!response.ok) {
                console.error("Error checking email: ", response.statusText);
                return false;
            }

            const data = await response.json();
            return data.exists; // Returns true if email exists/is taken
        } catch (error) {
            console.error("Error checking email", error);
            return false; // Default to false on error
        }
    };

    const handleNextStep = async (): Promise<void> => {
        if (stepNum === 0) {
            // validate email and password

            const newErrors = { email: "", password: "", confirm: "" };

            if (!validateEmail(formData.email)) {
                newErrors.email = "Please enter a valid email";
            } else {
                // only check for existence if format is valid
                const emailExists = await checkEmailAvailability(
                    formData.email
                );
                if (emailExists) {
                    newErrors.email = "That email already exists ( ͡°👅 ͡°)";
                    setErrors({ ...errors, ...newErrors });
                    return;
                }
            }

            if (!validatePassword(formData.password)) {
                newErrors.password = "Password must be at least 8 characters";
            }

            if (!validateConfirm(formData.confirm)) {
                newErrors.confirm = "Passwords must match";
            }

            if (newErrors.email || newErrors.password) {
                setErrors({ ...errors, ...newErrors });
                return;
            }

            setStepNum(1);
            window.location.hash = "1";
        } else if (stepNum === 1) {
            // validate username
            if (!validateUsername(formData.username)) {
                setErrors({
                    ...errors,
                    username: "Username must be at least 3 characters",
                });
                return;
            }

            const usernameExists = await checkUsernameAvailability(
                formData.username
            );
            if (usernameExists) {
                setErrors({
                    ...errors,
                    username: "That username already exists ( ͡°👅 ͡°)",
                });
                return;
            }

            await handleCompleteSignup();
            console.log("Success");
            window.location.hash = "2";
        }
    };

    const handleCompleteSignup = async (): Promise<void> => {
        controls.start({
            opacity: [0, 0, 0.3, 0.7, 1],
            transition: { duration: 0.5, ease: "easeInOut" },
        });

        console.log("Form submitted:", formData);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            if (!user) throw new Error("User authentication failed");

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                username: formData.username,
                role: "user",
            });

            console.log(
                "User created successfully with username:",
                formData.username
            );
        } catch (error: any) {
            console.error("Error signing up:", error); // Log the full error object

            if (error.code === "auth/email-already-in-use") {
                setStepNum(0);
                handleNextStep();
                return;
            } else if (error.code === "permission-denied") {
                alert("Permission error: please check your Firestore rules");
            } else if (error.code === "auth/invalid-email") {
                setStepNum(0);
                handleNextStep();
                return;
            } else {
                // Handle other errors
                alert("An error occurred during signup. Please try again.");
            }
        }

        setTimeout(() => {
            setStepNum(2);
            controls.start({
                opacity: [1, 1, 0.7, 0.3, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
            });
        }, 100);
    };

    useEffect(() => {
        window.location.hash = "0";
    }, []);

    return (
        <>
            <motion.div
                className="absolute top-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ duration: 5, type: "spring" }}
            >
                <Image
                    src="blob-red.svg"
                    alt="background-blob"
                    width={320}
                    height={320}
                    className="absolute top-0 right-0"
                />
                <Image
                    src="blob-yellow.svg"
                    alt="background-blob"
                    width={510}
                    height={510}
                    className="absolute bottom-[20%] left-[-10%]"
                />
                <Image
                    src="blob-orange.svg"
                    alt="background-blob"
                    width={420}
                    height={420}
                    className="absolute top-[10%] left-[40%]"
                />
                <Image
                    src="blob-purple.svg"
                    alt="background-blob"
                    width={500}
                    height={500}
                    className="absolute bottom-0 right-[27%] brightness-200"
                />
            </motion.div>
            <div className="h-screen bg-darkpurple-600 bg-opacity-50 backdrop-blur-[200px]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={controls}
                    className="fixed inset-0 bg-darkpurple-600 z-[51] pointer-events-none"
                />
                <div className="flex flex-col w-full h-full items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 300 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="w-full max-w-md flex flex-col items-center justify-center"
                    >
                        <div className="relative w-full flex flex-col items-center justify-start p-8 overflow-visible">
                            <AnimatePresence mode="wait">
                                {stepNum === 0 && (
                                    <SignupStep1
                                        formData={formData}
                                        errors={errors}
                                        handleInputChange={handleInputChange}
                                        handleNextStep={handleNextStep}
                                    />
                                )}
                                {stepNum === 1 && (
                                    <SignupStep2
                                        formData={formData}
                                        errors={errors}
                                        handleInputChange={handleInputChange}
                                        handleNextStep={handleNextStep}
                                        handleBack={() => setStepNum(0)}
                                    />
                                )}
                                {stepNum === 2 && (
                                    <SignupSuccess
                                        username={formData.username}
                                        formData={formData}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Progress indicator */}
                            {stepNum < 2 && (
                                <div className="flex gap-2 mt-8">
                                    <motion.div
                                        className={`h-2 w-10 rounded-full ${
                                            stepNum === 0
                                                ? "bg-white"
                                                : "bg-white/50"
                                        }`}
                                        animate={{
                                            scale:
                                                stepNum === 0
                                                    ? [1, 1.05, 1]
                                                    : 1,
                                        }}
                                        transition={{
                                            repeat:
                                                stepNum === 0 ? Infinity : 0,
                                            repeatDelay: 1,
                                        }}
                                    />
                                    <motion.div
                                        className={`h-2 w-10 rounded-full ${
                                            stepNum === 1
                                                ? "bg-white"
                                                : "bg-white/50"
                                        }`}
                                        animate={{
                                            scale:
                                                stepNum === 1 ? [1, 1.1, 1] : 1,
                                        }}
                                        transition={{
                                            repeat:
                                                stepNum === 1 ? Infinity : 0,
                                            repeatDelay: 1,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

// Step 1: Email and Password
const SignupStep1 = ({
    formData,
    errors,
    handleInputChange,
    handleNextStep,
}: SignupStep1Props) => {
    const [emailFocus, setEmailFocus] = useState(true);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false);

    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "circInOut" }}
            className="w-full"
        >
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl lg:text-3xl text-center font-sora font-extrabold text-white">
                    Sign up
                </h2>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row border border-white/25 bg-white/10 text-white text-lg font-aleo font-normal gap-2 h-12 rounded-full items-center focus-within:border-white transition-all duration-150 ease-in-out focus-within:shadow-white/10 focus-within:shadow-lg">
                        <MailIcon
                            strokeWidth={1.5}
                            className={`ml-4 transition-all duration-150 ease-in-out ${
                                emailFocus
                                    ? "stroke-white/75"
                                    : "stroke-white/25"
                            }`}
                        />
                        <input
                            type="email"
                            name="email"
                            inputMode="email"
                            autoCapitalize="off"
                            aria-invalid={!!errors.email}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            autoFocus
                            autoComplete="email"
                            aria-describedby="email-error"
                            spellCheck="false"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            placeholder="Email"
                            className="peer w-full h-full bg-transparent outline-none border-none text-lg"
                        />
                    </div>
                    {errors.email && (
                        <motion.p
                            className="text-sm text-center text-red-200 font-aleo"
                            initial={{ y: -20, height: 0, opacity: 0 }}
                            animate={{ y: 0, height: 16, opacity: 1 }}
                            exit={{ y: -20, height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                        >
                            {errors.email}
                        </motion.p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row border border-white/25 bg-white/10 text-white text-lg font-aleo font-normal gap-2 h-12 rounded-full items-center focus-within:border-white transition-all duration-150 ease-in-out focus-within:shadow-white/10 focus-within:shadow-lg">
                        <LockIcon
                            strokeWidth={1.5}
                            className={`ml-4 transition-all duration-150 ease-in-out ${
                                pwdFocus ? "stroke-white" : "stroke-white/25"
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
                    {errors.password && (
                        <motion.p
                            className="text-sm text-center text-red-200 font-aleo"
                            initial={{ y: -20, height: 0, opacity: 0 }}
                            animate={{ y: 0, height: 16, opacity: 1 }}
                            exit={{ y: -20, height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                        >
                            {errors.password}
                        </motion.p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row border border-white/25 bg-white/10 text-white text-lg font-aleo font-normal gap-2 h-12 rounded-full items-center focus-within:border-white transition-all duration-150 ease-in-out focus-within:shadow-white/10 focus-within:shadow-lg">
                        <ShieldCheckIcon
                            strokeWidth={1.5}
                            className={`ml-4 transition-all duration-150 ease-in-out ${
                                confirmFocus
                                    ? "stroke-white"
                                    : "stroke-white/25"
                            }`}
                        />
                        <input
                            type={eyeOpen ? "text" : "password"}
                            name="confirm"
                            value={formData.confirm}
                            onChange={handleInputChange}
                            required
                            autoComplete="new-password"
                            aria-describedby="confirm-error"
                            spellCheck="false"
                            onFocus={() => setConfirmFocus(true)}
                            onBlur={() => setConfirmFocus(false)}
                            placeholder="Confirm password"
                            className="w-full h-full bg-transparent outline-none border-none text-lg"
                        />
                    </div>
                    {errors.confirm && (
                        <motion.p
                            className="text-sm text-center text-red-200 font-aleo"
                            initial={{ y: -20, height: 0, opacity: 0 }}
                            animate={{ y: 0, height: 16, opacity: 1 }}
                            exit={{ y: -20, height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                        >
                            {errors.confirm}
                        </motion.p>
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleNextStep}
                        className="bg-white/20 hover:bg-white/30 border-white/30 mt-4"
                    >
                        <span className="text-white">Next</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

// step 2: username
const SignupStep2 = ({
    formData,
    errors,
    handleInputChange,
    handleNextStep,
    handleBack,
}: SignupStep2Props) => {
    const [userFocus, setUserFocus] = useState(true);

    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
            <div className="flex flex-col gap-6 w-full">
                <h2 className="text-2xl lg:text-3xl text-center font-sora font-extrabold text-white">
                    Enter a cool username
                </h2>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row border border-white/25 bg-white/10 text-white text-lg font-aleo font-normal gap-2 h-12 rounded-full items-center focus-within:border-white transition-all duration-150 ease-in-out focus-within:shadow-white/10 focus-within:shadow-lg">
                        <UserIcon
                            strokeWidth={2}
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
                            aria-invalid={!!errors.username}
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            autoFocus
                            aria-describedby="username-error"
                            spellCheck="false"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            placeholder="Cool username"
                            className="peer w-full h-full bg-transparent outline-none border-none text-lg"
                        />
                    </div>
                    {errors.username && (
                        <motion.p
                            className="text-sm text-center text-red-200 font-aleo"
                            initial={{ y: -20, height: 0, opacity: 0 }}
                            animate={{ y: 0, height: 16, opacity: 1 }}
                            exit={{ y: -20, height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                        >
                            {errors.username}
                        </motion.p>
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleNextStep}
                        className="bg-white/20 hover:bg-white/30 border-white/30 mt-4"
                    >
                        <span className="text-white">Next</span>
                    </Button>
                </div>

                <div className="flex flex-col items-center">
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={handleBack}
                        className="hover:bg-white/10"
                    >
                        <span className="text-white/70">Back</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

// success step
const SignupSuccess = ({ username, formData }: SignupSuccessProps) => {
    const router = useRouter();

    const login = async () => {
        try {
            const userCredential: UserCredential =
                await signInWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

            const idToken = await userCredential.user.getIdToken();

            const response = await fetch("/api/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                console.error("Could not fetch session");
                return;
            }

            console.log("Session fetched");

            router.push(`/u/${username}`);
        } catch (error) {
            console.error("Could not log in user", error);
        }
    };

    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full md:w-[200%] py-8"
        >
            <div className="flex flex-col gap-4 items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="p-1 lg:p-2 bg-gradient-to-t from-teal-500 to-teal-100 rounded-full flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </motion.div>

                <h2 className="text-2xl md:text-3xl text-center font-sora font-extrabold text-white">
                    Welcome, <span className="text-teal-300">{username}!</span>
                </h2>
                <p className="text-white/80 text-center text-base md:text-lg font-aleo lg:mb-8 mb-2">
                    Your account has been created successfully!
                </p>
                <h2 className="text-2xl md:text-3xl text-center font-sora font-extrabold text-white">
                    Choose your adventure
                </h2>
                <PricingCards />
                <div className="flex flex-col">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:bg-white/10"
                        onClick={login}
                    >
                        I&apos;ll just look around for now
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
