"use client";
import TabbedInterface from "@/components/dashboard/BotTab";
import React, { useState } from "react";

interface PatientData {
  blood_pressure: string;
  heart_rate: string;
  respiratory_rate: string;
  temperature: string;
  saturation: string;
  problem: string;
  symptoms: string[];
  body_weight: string;
  drug_history: string;
  notes: string;
}

interface MedicineRecommendation {
  medicine_name: string;
  medicine_details: string;
  medicine_dosage: string;
  instructions: string;
}

const RecommendMedicineForm = () => {
  const [formData, setFormData] = useState<PatientData>({
    blood_pressure: "",
    heart_rate: "",
    respiratory_rate: "",
    temperature: "",
    saturation: "",
    problem: "",
    symptoms: [],
    body_weight: "",
    drug_history: "",
    notes: "",
  });

  const [medicine, setMedicine] = useState<MedicineRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle symptoms change (comma-separated input)
  const handleSymptomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const symptomsArray = e.target.value.split(",").map(symptom => symptom.trim());
    setFormData({
      ...formData,
      symptoms: symptomsArray,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMedicine(null);

    try {
      const response = await fetch("http://localhost:8000/recommend_medicine/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medicine recommendation.");
      }

      const data: MedicineRecommendation = await response.json();
      setMedicine(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <TabbedInterface/>
    </div>
  );
};

export default RecommendMedicineForm;
