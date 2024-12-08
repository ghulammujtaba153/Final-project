"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { cn } from "@/utils/cn";
import { IconBrandGoogle, IconCamera } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import axios from "axios";
import upload from "@/utils/upload"; // Adjust the import path as necessary
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/utils/apiConfig";

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  role: string;
  dateOfBirth: string;
  contactNumber: string;
  postalAddress: string;
  permanentAddress: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  contactNumber?: string;
  postalAddress?: string;
  permanentAddress?: string;
}

export default function NurseProfile() {
  const [formData, setFormData] = useState<FormData>({
    
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    role: "nurse",
    dateOfBirth: "",
    contactNumber: "",
    postalAddress: "",
    permanentAddress: "",
  });
  
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required";
    if (!formData.postalAddress) newErrors.postalAddress = "Postal Address is required";
    if (!formData.permanentAddress) newErrors.permanentAddress = "Permanent Address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    const uploadPromise = profilePic ? upload(profilePic) : Promise.resolve(null);
    
    const profilePicUrl = await toast.promise(uploadPromise, {
      loading: 'Uploading image...',
      success: 'Image uploaded successfully',
      error: 'Error uploading image',
    });

    const data = {
      ...formData,
      profile: profilePicUrl,
    };

    const registerPromise = axios.post(`${API_BASE_URL}/register`, data);
    
    await toast.promise(registerPromise, {
      loading: 'Registering user...',
      success: 'User registered successfully',
      error: 'Error registering user',
    });

    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
      role: "nurse",
      dateOfBirth: "",
      contactNumber: "",
      postalAddress: "",
      permanentAddress: "",
    });
  };

  return (
    <div className="flex py-[50px]">
      <motion.div 
        initial={{ x: "-100vw" }} 
        animate={{ x: 0 }} 
        transition={{ type: "spring", stiffness: 50 }} 
        className="bg-white text-black max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <h2 className="font-bold text-xl">Register Nurse</h2>
        <form className="my-8" onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstName" style={{ color: 'black' }}>First name</Label>
              <Input id="firstName" placeholder="Tyler" type="text" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName" style={{ color: 'black' }}>Last name</Label>
              <Input id="lastName" placeholder="Durden" type="text" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="gender" style={{ color: 'black' }}>Gender</Label>
            <select id="gender" value={formData.gender} onChange={handleChange} className="bg-white border rounded p-2 mb-4">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email" style={{ color: 'black' }}>Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </LabelInputContainer>
          <LabelInputContainer >
            <Label htmlFor="password" style={{ color: 'black' }}>Password</Label>
            <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </LabelInputContainer>
          <LabelInputContainer >
            <Label htmlFor="dateOfBirth" style={{ color: 'black' }}>Date of Birth</Label>
            <Input id="dateOfBirth" placeholder="YYYY-MM-DD" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          </LabelInputContainer>
          <LabelInputContainer >
            <Label htmlFor="contactNumber" style={{ color: 'black' }}>Contact Number</Label>
            <Input id="contactNumber" placeholder="123-456-7890" type="tel" value={formData.contactNumber} onChange={handleChange} />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </LabelInputContainer>
          <LabelInputContainer >
            <Label htmlFor="postalAddress" style={{ color: 'black' }}>Postal Address</Label>
            <Input id="postalAddress" placeholder="123 Project Mayhem St." type="text" value={formData.postalAddress} onChange={handleChange} />
            {errors.postalAddress && <p className="text-red-500 text-sm">{errors.postalAddress}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="permanentAddress" style={{ color: 'black' }}>Permanent Address</Label>
            <Input id="permanentAddress" placeholder="123 Permanent Mayhem St." type="text" value={formData.permanentAddress} onChange={handleChange} />
            {errors.permanentAddress && <p className="text-red-500 text-sm">{errors.permanentAddress}</p>}
          </LabelInputContainer>
          <button className="w-full text-center bg-secondary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg mt-6">
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function LabelInputContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-1 flex-1">
      {children}
    </div>
  );
}
