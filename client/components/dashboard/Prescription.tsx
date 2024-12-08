import React, { useContext, useEffect, useState } from 'react';
import '../../app/scroll.css'; // Import the custom scrollbar styles
import { UserContext } from '@/context/UserContext';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import { X } from 'lucide-react'; // Importing the X icon

const Prescription = ({ users, appointmentId, setPrescription }) => {
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Active');
  const [nextReviewDate, setNextReviewDate] = useState('');
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        'https://medicine-api3.p.rapidapi.com/medicine?url=https%3A%2F%2Fmedicine-api.p.rapidapi.com%2Fmedicine%3Fid%3D123%26name%3DParacetamol%26product_name%3DPanadol',
        {
          headers: {
            'x-rapidapi-host': 'medicine-api3.p.rapidapi.com',
            'x-rapidapi-key': 'a53decced6msh6aef45436dba9b1p10b3bfjsn259fd0178f69', // Replace with your API key
          },
        }
      );
      console.log(response.data); // Log the response to verify its structure
      return response.data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching medicines:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadMedicines = async () => {
      const medicines = await fetchMedicines();
      console.log(medicines); // Set the fetched medicine list
    };
    loadMedicines();
  }, []);

  useEffect(() => {
    if (users[0]._id === user._id) {
      setDoctorId(users[1]._id);
      setPatientId(users[0]._id);
    } else {
      setDoctorId(users[0]._id);
      setPatientId(users[1]._id);
    }
  }, [users, user]);

  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    const newMedications = [...medications];
    newMedications[index][name] = value;
    setMedications(newMedications);
  };

  const handleAddMedicine = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const handleSubmit = async () => {
    const prescriptionData = {
      patientId,
      doctorId,
      appointmentId,
      medications,
      notes,
      nextReviewDate: nextReviewDate || null,
    };

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/prescriptions/`, prescriptionData);
      console.log(res.data);

      const statusRes = await axios.put(`${API_BASE_URL}/appointments/${appointmentId}/status`, { status: 'completed' });
      console.log(statusRes.data);

      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    console.log(prescriptionData);
    setPrescription(false); // Close the form after submitting
  };

  return (
    <div className="prescription-container w-[300px] h-[70%] bg-white text-black-default shadow-lg rounded-lg overflow-y-scroll p-4 relative">
      {/* Close Button */}
      <button
        onClick={() => setPrescription(false)} // Close the prescription form
        className="absolute top-2 right-2"
      >
        <X className="w-6 h-6 text-gray-500 hover:text-gray-800" /> {/* X Icon */}
      </button>

      <h3 className="text-lg font-semibold mb-4">Prescription</h3>

      {medications.map((medicine, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            name="name"
            value={medicine.name}
            onChange={(e) => handleMedicineChange(index, e)}
            placeholder="Medicine Name"
            className="w-full p-2 mb-1 border rounded"
          />
          <input
            type="text"
            name="dosage"
            value={medicine.dosage}
            onChange={(e) => handleMedicineChange(index, e)}
            placeholder="Dosage"
            className="w-full p-2 mb-1 border rounded"
          />
          <input
            type="text"
            name="frequency"
            value={medicine.frequency}
            onChange={(e) => handleMedicineChange(index, e)}
            placeholder="Frequency (e.g., Once a day)"
            className="w-full p-2 mb-1 border rounded"
          />
          <input
            type="text"
            name="duration"
            value={medicine.duration}
            onChange={(e) => handleMedicineChange(index, e)}
            placeholder="Duration (e.g., 7 days)"
            className="w-full p-2 mb-1 border rounded"
          />
          <input
            type="text"
            name="instructions"
            value={medicine.instructions}
            onChange={(e) => handleMedicineChange(index, e)}
            placeholder="Additional Instructions"
            className="w-full p-2 mb-1 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleAddMedicine}
        className="w-full bg-blue-500 text-white py-2 rounded mb-4"
      >
        Add Medicine
      </button>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        className="w-full p-2 mb-2 border rounded"
        rows="3"
      />

      <p>Re-visit Date</p>

      <input
        type="date"
        value={nextReviewDate}
        onChange={(e) => setNextReviewDate(e.target.value)}
        placeholder="Next Review Date"
        className="w-full p-2 mb-2 border rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        {loading ? 'loading...' : 'Submit Prescription'}
      </button>
    </div>
  );
};

export default Prescription;
