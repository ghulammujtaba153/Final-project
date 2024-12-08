"use client";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs for qualifications
import toast from 'react-hot-toast';
import upload from '@/utils/upload';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { editDoctor } from '@/redux/slices/doctorsSlice';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    boxShadow: 24,
    p: 8,
    overflowY: 'auto', // Enable vertical scrolling
    maxHeight: '80vh', // Limit the height of the modal
  };

const EditDoctorModal = ({ doctorId }) => {
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    gender: '',
    email: "",
    password: "",
    role: "doctor",
    dateOfBirth: "",
    contactNumber: "",
    postalAddress: "",
    permanentAddress: "",
    doctorId: "",
    specialization: "",
    experience: '',
    fee: 0,
    doctor_qualification: [
      { qualificationName: "", startYear: "", endYear: "" },
      { qualificationName: "", startYear: "", endYear: "" }
    ],
    availability: {}
  });

  // Fetch doctor data when the modal is opened
  useEffect(() => {
    if (open && doctorId) {
      const fetchedData = {
        _id: doctorId._id,
        availability: doctorId.availability,
        profile: doctorId.userId.profile,
        firstName: doctorId.userId.firstName,
        lastName: doctorId.userId.lastName,
        gender: doctorId.userId.gender,
        email: doctorId.userId.email,
        dateOfBirth: doctorId.userId.dateOfBirth.substring(0, 10),
        contactNumber: doctorId.userId.contactNumber,
        postalAddress: doctorId.userId.postalAddress,
        permanentAddress: doctorId.userId.permanentAddress,
        specialization: doctorId.specialization,
        doctor_qualification: doctorId.doctor_qualification,
        experience: doctorId.experience,
        fee: doctorId.fee,
      };
      if (doctorId.userId.profile) {
        setProfilePicPreview(doctorId.userId.profile);
      }
      setFormData(fetchedData);
    }
  }, [open, doctorId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["startTime", "endTime"].includes(name)) {
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQualifications = formData.doctor_qualification.map((qual, i) => 
      i === index ? { ...qual, [name]: value } : qual
    );
    setFormData({ ...formData, doctor_qualification: updatedQualifications });
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
      dispatch(editDoctor({ doctorId: doctorId.userId._id, updatedData }));
      // const res = await axios.put(`${API_BASE_URL}/doctors/profiles/${doctorId.userId._id}`, updatedData);
      // console.log('Updated doctor data:', res.data);
      

      toast.success('Profile updated successfully');
    //   router.push('/'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };
  

  

  

  return (
    <div >
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
        // className='overflow-scroll h-[90%] w-[200px] bg-white'
      >
        <form style={modalStyle} className="bg-white p-2" onSubmit={handleSubmit}>

          <Button
              onClick={handleClose}
              style={{ position: 'absolute', top: 16, right: 16 }}
            >
              <X />
            </Button>
          
            <div className="flex items-center justify-center mb-4 bg-black-default border rounded-full w-[100px] h-[100px] align-middle relative">
              {profilePicPreview ? (
                <img src={profilePicPreview} alt="Profile" className='w-full h-full object-cover rounded-full' />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
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

              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  placeholder="Tyler" 
                  type="text" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Durden" 
                  type="text" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="gender">Gender</Label>
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
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                placeholder="projectmayhem@fc.com" 
                type="email" 
                value={formData.email}  
                onChange={handleChange} 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input 
                id="dateOfBirth" 
                name="dateOfBirth" 
                placeholder="YYYY-MM-DD" 
                type="date" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input 
                id="contactNumber" 
                name="contactNumber" 
                placeholder="123-456-7890" 
                type="tel" 
                value={formData.contactNumber}  
                onChange={handleChange} 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="postalAddress">Postal Address</Label>
              <Input 
                id="postalAddress" 
                name="postalAddress" 
                placeholder="123 Project Mayhem St." 
                type="text" 
                value={formData.postalAddress}  
                onChange={handleChange} 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Input 
                id="permanentAddress" 
                name="permanentAddress" 
                placeholder="123 Project Mayhem St." 
                type="text" 
                value={formData.permanentAddress}  
                onChange={handleChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input 
                id="experience" 
                name="experience" 
                placeholder="3 years" 
                type="text" 
                value={formData.experience}  
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label htmlFor="fee">Fee</Label>
              <Input 
                id="fee" 
                name="fee" 
                placeholder="100" 
                type="text" 
                value={formData.fee}  
                onChange={handleChange} 
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="specialization">Specialization</Label>
              <Input 
                id="specialization" 
                name="specialization" 
                placeholder="Cardiology" 
                type="text" 
                value={formData.specialization}  
                onChange={handleChange} 
              />
            </div>
            {formData.doctor_qualification.map((qualification, index) => (
              <div key={index} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <div>
                  <Label htmlFor={`qualificationName_${index}`}>Qualification</Label>
                  <Input 
                    id={`qualificationName_${index}`} 
                    name="qualificationName" 
                    placeholder="MD" 
                    type="text" 
                    value={qualification.qualificationName} 
                    onChange={(e) => handleQualificationChange(index, e)} 
                  />
                </div>
                <div>
                  <Label htmlFor={`startYear_${index}`}>Start Year</Label>
                  <Input 
                    id={`startYear_${index}`} 
                    name="startYear" 
                    placeholder="2015" 
                    type="text" 
                    value={qualification.startYear} 
                    onChange={(e) => handleQualificationChange(index, e)} 
                  />
                </div>
                <div>
                  <Label htmlFor={`endYear_${index}`}>End Year</Label>
                  <Input 
                    id={`endYear_${index}`} 
                    name="endYear" 
                    placeholder="2020" 
                    type="text" 
                    value={qualification.endYear} 
                    onChange={(e) => handleQualificationChange(index, e)} 
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime" 
                  name="startTime" 
                  placeholder="09:00" 
                  type="time" 
                  value={formData.availability.startTime}  
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  id="endTime" 
                  name="endTime" 
                  placeholder="17:00" 
                  type="time" 
                  value={formData.availability.endTime}  
                  onChange={handleChange} 
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Update Profile
            </button>
          </form>
      </Modal>
    </div>
  );
};

export default EditDoctorModal;

