"use client";

import React, { use, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import AppointmentModal from '@/components/AppointmentModal';
import { UserContext } from '@/context/UserContext';
import StarRating from '@/components/dashboard/StarRatings';

const DoctorDetail = ({ params: { id } }) => {
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [totalRating, setTotalRating] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const userId = id;
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      const fetchDoctor = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/doctors/${userId}`);
          setDoctor(res.data);
        } catch (error) {
          console.error('Error fetching doctor:', error);
        }
      };
      fetchDoctor();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchReviews = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/ratings/doctor/${userId}`);
          const reviewsData = res.data;
          const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = sum / reviewsData.length;
          setTotalRating(averageRating);
          setReviews(res.data);
        } catch (error) {
          console.error('Error fetching doctor ratings:', error);
        }
      };
      fetchReviews();
    }
  }, [userId]);

  const formatTime = (time24) => {
    const [hour, minute] = time24.split(':');
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500">no doctor</div>
      </div>
    );
  }

  return (
    <div className=" w-full flex items-center text-primary flex-col pl-[80px]">
      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between gap-8 md:flex-row flex-col items-center md:items-start">
          {/* Doctor Information Section */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-4">
              <img src={doctor.userId.profile} alt="Doctor Profile" className="h-24 w-24 rounded-full object-cover border border-gray-300" />
              <div>
                <p className="text-2xl font-semibold">{doctor.userId.firstName} {doctor.userId.lastName}</p>
                {totalRating ? (
                  <StarRating num={totalRating} />
                ) : (
                  <p className=" text-sm">new</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold">Contact:</p>
              <p className="">{doctor.userId.email}</p>
              <p className="">{doctor.userId.contactNumber}</p>
            </div>
            <div>
              <p className="text-lg font-semibol">Specialization:</p>
              <p className="">{doctor.specialization}</p>
            </div>
            <div>
              <p className="text-lg font-semibol">Experience:</p>
              <p className="">{doctor.experience} years</p>
            </div>
            <div>
              <p className="text-lg font-semibol">Qualifications:</p>
              {doctor.doctor_qualification.map((qualification, index) => (
                <p key={index} className="">
                  {qualification.qualificationName} ({qualification.startYear} - {qualification.endYear})
                </p>
              ))}
            </div>
            <div>
              <p className="text-lg font-semibold">Availability:</p>
              <p className="">
                {formatTime(doctor.availability.startTime)} - {formatTime(doctor.availability.endTime)}
              </p>
            </div>
          </div>

          {/* Book Appointment Section */}
          <div className="flex flex-col items-center justify-center bg-blue-100 p-6 rounded-lg shadow-lg">
            <p className="text-lg font-bold text-gray-800 mb-4">Consultation Fee: PKR- {doctor.fee}</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all"
            >
              Book Appointment!
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="flex flex-col gap-6 mt-8 w-full max-w-4xl bg-white p-8 mb-4 rounded-lg shadow-md">
        <p className="text-xl font-semibold">Reviews</p>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50">
              <div className="flex gap-4 items-center">
                <img src={review.patientId.profile} alt="Profile" className="w-10 h-10 rounded-full border border-gray-300" />
                <StarRating num={review.rating} />
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet</p>
        )}
      </div>

      {/* Appointment Modal */}
      {showModal && (
        <AppointmentModal
          doctorId={userId}
          amount={doctor.fee}
          onClose={() => setShowModal(false)}
          doctorAvailability={doctor.availability}
        />
      )}
    </div>
  );
};

export default DoctorDetail;
