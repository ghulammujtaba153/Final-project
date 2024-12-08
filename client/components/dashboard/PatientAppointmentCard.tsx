import React, { useContext } from "react";
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { useRouter } from "next/navigation";
import moment from "moment";
import toast from "react-hot-toast";
import { updateAppointmentStatus } from "@/redux/slices/appointmentSlice";
import { useDispatch } from "react-redux";
import { UserContext } from "@/context/UserContext";

export function PatientAppointmentCard({ cardData }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    router.push(`/dashboard/appointments/${cardData._id}`);
  };

  let formattedTiming;
  if (moment(cardData.timing, moment.ISO_8601, true).isValid()) {
    formattedTiming = moment(cardData.timing).format("YYYY-MM-DD hh:mm A");
  } else {
    formattedTiming = moment(cardData.timing, "YYYY-MM-DDThh:mm A").format("YYYY-MM-DD hh:mm A");
  }

  const handleCancel = async () => {
    const now = moment();
    const appointmentTime = moment(cardData.timing);

    if (now.isSame(appointmentTime, 'minute')) {
      toast.error("You cannot cancel the appointment at this time.");
      return;
    }

    try {
      dispatch(updateAppointmentStatus({ id: cardData._id, status: 'canceled' }));
      toast.success("Appointment canceled successfully.");
    } catch {
      toast.error("Error updating appointment status.");
    }
  };

  return (
    <CardContainer className="w-[300px] h-[300px] m-1">  {/* Reduced height to 300px */}
      <CardBody className="flex flex-col justify-center items-center group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-grey5 dark:border-white/[0.2] border-black/[0.1] rounded-xl gap-3 p-4 border text-white">
        
        <div className="w-[50px] h-[50px] mb-2">  {/* Smaller image */}
          <img
            src={cardData?.doctorId?.profile}
            className="w-full h-full object-cover rounded-full shadow-md"
            alt="Doctor Profile"
          />
        </div>

        <CardItem 
          translateZ="50"
          className="text-lg font-bold text-neutral-600 dark:text-white text-center"
        >
          {cardData?.doctorId?.firstName} {cardData?.doctorId?.lastName}
        </CardItem>

        <p className={`${cardData?.status === "new" ? "bg-green-400" : "bg-red-400"} px-2 py-1 rounded-full text-xs`}>
          {cardData?.status}
        </p>

        <p className="font-bold text-neutral-600 dark:text-white text-center mt-2">
          Appointment Timing: <span className="text-gray-400">{formattedTiming || "Invalid Date"}</span>
        </p>

        {cardData?.status === "completed" && (
          <button 
            onClick={handleCardClick} 
            className="p-2 bg-white text-sm text-black rounded-md mt-4"
          >
            View Prescription
          </button>
        )}

        {cardData?.status === "new" && (
          <button 
            onClick={handleCancel} 
            className="p-2 bg-red-500 text-sm text-white rounded-md mt-4"
          >
            Cancel
          </button>
        )}
      </CardBody>
    </CardContainer>
  );
}
