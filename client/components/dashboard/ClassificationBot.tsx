"use client";
import React, { useState } from "react";

interface PatientData {
  Gender: string;
  Symptoms: string;
  Causes: string;
  Disease: string;
}

interface PredictionResponse {
  predicted_medicine: string;
}

const ClassificationBot = () => {
  const [formData, setFormData] = useState<PatientData>({
    Gender: "",
    Symptoms: "",
    Causes: "",
    Disease: "",
  });
  const [predictedMedicine, setPredictedMedicine] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes for all input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictedMedicine(null);

    try {
      const response = await fetch("http://localhost:8001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get a prediction.");
      }

      const data: PredictionResponse = await response.json();
      setPredictedMedicine(data.predicted_medicine);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 text-primary rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Medicine Prediction</h2>
      <form onSubmit={handleSubmit}>
        {/* Gender Input */}
        <div className="mb-4">
          <label htmlFor="Gender" className="block font-semibold">Gender</label>
          <select
            id="Gender"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="border rounded-md p-2 w-full outline-none cursor-pointer bg-white-100 text-black"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Symptoms Input */}
        <div className="mb-4">
          <label htmlFor="Symptoms" className="block font-semibold">Symptoms</label>
          <input
            type="text"
            id="Symptoms"
            name="Symptoms"
            value={formData.Symptoms}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>

        {/* Causes Input */}
        <div className="mb-4">
          <label htmlFor="Causes" className="block font-semibold">Causes</label>
          <input
            type="text"
            id="Causes"
            name="Causes"
            value={formData.Causes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>

        {/* Disease Input */}
        <div className="mb-4">
          <label htmlFor="Disease" className="block font-semibold">Disease</label>
          <input
            type="text"
            id="Disease"
            name="Disease"
            value={formData.Disease}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Get Prediction"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {predictedMedicine && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow text-black">
          <h3 className="text-xl font-bold mb-2">Predicted Medicine</h3>
          <p>{predictedMedicine}</p>
        </div>
      )}
    </div>
  );
};

export default ClassificationBot;
