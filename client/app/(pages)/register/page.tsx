"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { IconBrandGoogle, IconCamera } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import axios from "axios";
import upload from "@/utils/upload"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/utils/apiConfig";
import OTPVerification from "../verify/page";


export default function SignupFormDemo() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "patient",
    gender: "Male",  // Default gender value
    dateOfBirth: "",
    contactNumber: "",
    postalAddress: "",
    permanentAddress: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required";
    if (!formData.postalAddress) newErrors.postalAddress = "Postal Address is required";
    if (!formData.permanentAddress) newErrors.permanentAddress = "Permanent Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop form submission if validation fails

    const uploadPromise = profilePic ? upload(profilePic) : Promise.resolve(null);
    
    const profilePicUrl = await toast.promise(uploadPromise, {
      loading: 'Uploading image...',
      success: 'Image uploaded successfully',
      error: 'Error uploading image'
    });

    const data = {
      ...formData,
      profile: profilePicUrl
    };

    setFormData(data);

    setShowOTPVerification(true);

  };

  return showOTPVerification ? (
    <OTPVerification data={formData} />
  ) : (
    <div className="flex bg-primary text-white py-[140px]">
      <motion.div initial={{ x: "-100vw" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 50 }} className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <h2 className="font-bold text-xl ">
          Welcome to Cardio Hema Hub
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-4 bg-black-default border rounded-full w-[100px] h-[100px] align-middle relative">
            {profilePicPreview ? (
              <img src={profilePicPreview} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <IconCamera className="w-10 h-10 text-gray-500 absolute" />
            )}
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="cursor-pointer opacity-0 absolute inset-0 z-10"
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Tyler" type="text" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Durden" type="text" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </LabelInputContainer>
          </div>
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded-md p-2 w-full outline-none cursor-pointer bg-white-100"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </LabelInputContainer>
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" placeholder="YYYY-MM-DD" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" placeholder="123-456-7890" type="tel" value={formData.contactNumber} onChange={handleChange} />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="postalAddress">Postal Address</Label>
            <Input id="postalAddress" placeholder="123 Project Mayhem St." type="text" value={formData.postalAddress} onChange={handleChange} />
            {errors.postalAddress && <p className="text-red-500 text-sm">{errors.postalAddress}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="permanentAddress">Permanent Address</Label>
            <Input id="permanentAddress" placeholder="123 Permanent Mayhem St." type="text" value={formData.permanentAddress} onChange={handleChange} />
            {errors.permanentAddress && <p className="text-red-500 text-sm">{errors.permanentAddress}</p>}
          </LabelInputContainer>

          <button className="bg-secondary relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">
            Sign up &rarr;
            <BottomGradient />
          </button>

        </form>
        
        <p className="">Already have an account? <a className="cursor-pointer hover:text-secondary" href="/login">Login</a></p>
      </motion.div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
