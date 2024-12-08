import React, { useState } from "react";
import RecommendMedicineForm from "./RecommendMedicineForm"; 
import ClassificationBot from "./ClassificationBot";


const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState<"gemini" | "classification">("gemini");

  // Handle tab change
  const handleTabChange = (tab: "gemini" | "classification") => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 bg-white text-primary rounded-lg shadow-md">
      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`mr-4 pb-2 text-lg font-bold ${activeTab === "gemini" ? "border-b-4 border-blue-500" : ""}`}
          onClick={() => handleTabChange("gemini")}
        >
          Gemini
        </button>
        <button
          className={`pb-2 text-lg font-bold ${activeTab === "classification" ? "border-b-4 border-blue-500" : ""}`}
          onClick={() => handleTabChange("classification")}
        >
          Classification
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "gemini" && (
          <div>
            <RecommendMedicineForm />
          </div>
        )}
        {activeTab === "classification" && (
          <div>
            <ClassificationBot/>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedInterface;
