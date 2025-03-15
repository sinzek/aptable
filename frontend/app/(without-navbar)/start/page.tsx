"use client";

import { Button } from "@/components/ui/button";
import { useState, ChangeEvent } from "react";
import { motion, useAnimation, AnimatePresence } from "motion/react";

// Define types for form data and errors
interface FormData {
  email: string;
  password: string;
  username: string;
}

interface FormErrors {
  email: string;
  password: string;
  username: string;
}

// Define prop types for each component
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
}

export default function Start() {
  const [stepNum, setStepNum] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
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
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateUsername = (username: string): boolean => {
    return username.length >= 3;
  };

  const handleNextStep = (): void => {
    if (stepNum === 0) {
      // validate email and password
      const newErrors = {email: "", password: ""};
      
      if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      
      if (!validatePassword(formData.password)) {
        newErrors.password = "Password must be at least 8 characters";
      }
      
      if (newErrors.email || newErrors.password) {
        setErrors({ ...errors, ...newErrors });
        return;
      }
      
      setStepNum(1);
    } else if (stepNum === 1) {
      // validate username
      if (!validateUsername(formData.username)) {
        setErrors({
          ...errors,
          username: "Username must be at least 3 characters",
        });
        return;
      }
      
      handleCompleteSignup();
    }
  };

  const handleCompleteSignup = (): void => {
    controls.start({
      opacity: [0, 0, 0.3, 0.7, 1],
      transition: { duration: 0.5, ease: "easeInOut" }
    });
    
    // here is where form data will be submitted
    console.log("Form submitted:", formData);
    
    // move to next step, will be pricing options
    setTimeout(() => {
      setStepNum(2);
    }, 500);
  };

  return (
    <div className="h-screen bg-darkpurple-600">
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="fixed inset-0 bg-darkpurple-600 z-[51] pointer-events-none"
      />
      <div className="flex flex-col w-full h-full items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: "50%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md flex flex-col items-center justify-center"
        >
          <div className="relative w-full flex flex-col items-center justify-start p-8 backdrop-blur-[21.40px] overflow-hidden">
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
                <SignupSuccess username={formData.username} />
              )}
            </AnimatePresence>
            
            {/* Progress indicator */}
            {stepNum < 2 && (
              <div className="flex gap-2 mt-6">
                <motion.div
                  className={`h-2 w-10 rounded-full ${stepNum === 0 ? "bg-white" : "bg-white/50"}`}
                  animate={{ scale: stepNum === 0 ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: stepNum === 0 ? Infinity : 0, repeatDelay: 1 }}
                />
                <motion.div
                  className={`h-2 w-10 rounded-full ${stepNum === 1 ? "bg-white" : "bg-white/50"}`}
                  animate={{ scale: stepNum === 1 ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: stepNum === 1 ? Infinity : 0, repeatDelay: 1 }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Step 1: Email and Password
const SignupStep1 = ({ formData, errors, handleInputChange, handleNextStep }: SignupStep1Props) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full"
    >
      <div className="flex flex-col gap-6 w-full">
        <h2 className="text-2xl lg:text-3xl text-center font-sora font-extrabold text-white">
          Sign up
        </h2>
        
        <div className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoFocus
            placeholder="Enter email"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6"
          />
          {errors.email && (
            <p className="text-sm text-red-200">{errors.email}</p>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6"
          />
          {errors.password && (
            <p className="text-sm text-red-200">{errors.password}</p>
          )}
        </div>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleNextStep}
          className="bg-white/20 hover:bg-white/30 border-white/30 mt-4"
        >
          <span className="text-white">Next</span>
        </Button>
      </div>
    </motion.div>
  );
};

// Step 2: Username
const SignupStep2 = ({ formData, errors, handleInputChange, handleNextStep, handleBack }: SignupStep2Props) => {
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
          Choose a username
        </h2>
        
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            autoFocus
            placeholder="Enter username"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6"
          />
          {errors.username && (
            <p className="text-sm text-red-200">{errors.username}</p>
          )}
        </div>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleNextStep}
          className="bg-white/20 hover:bg-white/30 border-white/30"
        >
          <span className="text-white">Sign Up</span>
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={handleBack}
          className="hover:bg-white/10"
        >
          <span className="text-white/70">Back</span>
        </Button>
      </div>
    </motion.div>
  );
};

// success step
const SignupSuccess = ({ username }: SignupSuccessProps) => {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full py-8"
    >
      <div className="flex flex-col gap-6 items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
        
        <h2 className="text-2xl lg:text-3xl text-center font-sora font-extrabold text-white">
          Welcome, {username}!
        </h2>
        
        <p className="text-white/80 text-center">
          Your account has been created successfully.
        </p>
        
        <Button
          variant="outline"
          size="lg"
          className="bg-white/20 hover:bg-white/30 border-white/30 mt-4"
        >
          <span className="text-white">Get Started</span>
        </Button>
      </div>
    </motion.div>
  );
};