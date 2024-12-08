"use client";

import React, { useContext, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; 
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import upload from '@/utils/upload';
import API_BASE_URL from '@/utils/apiConfig'; // Import the common API path

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    contactNumber: '',
    postalAddress: '',
    permanentAddress: '',
    gender: '', // Added gender to formData
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");

  useEffect(() => {
    if (user) {
      const formattedDateOfBirth = user.dateOfBirth
        ? user.dateOfBirth.split('T')[0]
        : '';

      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        dateOfBirth: formattedDateOfBirth,
        contactNumber: user.contactNumber || '',
        postalAddress: user.postalAddress || '',
        permanentAddress: user.permanentAddress || '',
        gender: user.gender || '', // Set gender from user data
      });
      console.log(user.gender)
      setProfilePicPreview(user.profile || '/default-profile.png');
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profilePicUrl = profilePicPreview;
    if (profilePic) {
      try {
        profilePicUrl = await upload(profilePic); 
        toast.success('Profile picture uploaded successfully');
      } catch (error) {
        toast.error('Error uploading profile picture');
      }
    }

    try {
      const updatedData = { ...formData, profile: profilePicUrl };
      await updateUser(updatedData); // Use the updateUser function from context
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-6'>
        <div className='flex flex-col items-center justify-center gap-6'>
          <div className='flex items-center justify-center mb-4 bg-black-default border rounded-full w-[100px] h-[100px] relative'>
            <img src={profilePicPreview} alt="Profile" className='w-full h-full object-cover rounded-full' />
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="cursor-pointer opacity-0 absolute inset-0 z-10"
            />
          </div>
          <form className='w-full max-w-4xl mx-auto flex flex-wrap gap-6' onSubmit={handleSubmit}>
            {/* Left Column */}
            <div className='flex-1 min-w-[300px]'>
              <div className='mb-4'>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  placeholder="First Name"
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  placeholder="Last Name"
                />
              </div>

              <div className='mb-4 text-black'>
                <Label htmlFor="gender">Gender</Label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  className="w-full border rounded px-4 py-2 bg-white-100"
                >
                  
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className='mb-4'>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email"
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Enter new password"
                />
              </div>
            </div>
            {/* Right Column */}
            <div className='flex-1 min-w-[300px]'>
              <div className='mb-4'>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input 
                  type="date" 
                  name="dateOfBirth" 
                  value={formData.dateOfBirth} 
                  onChange={handleChange} 
                  placeholder="Date of Birth"
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input 
                  type="text" 
                  name="contactNumber" 
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  placeholder="Contact Number"
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor="postalAddress">Postal Address</Label>
                <Input 
                  type="text" 
                  name="postalAddress" 
                  value={formData.postalAddress} 
                  onChange={handleChange} 
                  placeholder="Postal Address"
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                <Input 
                  type="text" 
                  name="permanentAddress" 
                  value={formData.permanentAddress} 
                  onChange={handleChange} 
                  placeholder="Permanent Address"
                />
              </div>
              
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
