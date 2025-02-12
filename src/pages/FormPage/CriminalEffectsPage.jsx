import React, { useState } from "react";
import CardForm from "../../Components/Form/CardForm";
import Heading from "../../Components/Uitily/Heading";
import ViewMode from "../../Components/Uitily/ViewMode.jsx";
import MultiSelect from "../../Components/Uitily/MultiSelect.jsx";
import EvidenceHook from "../../hook/CriminalEffects/evidence-hook.js";
import IncidentsHook from "../../hook/CriminalEffects/Incidents-hook.js";

const CriminalEffectsPage = () => {
  const [incidents,loading] = IncidentsHook();
  const [viewMode, setViewMode] = useState("grid");



  const handleDelete = (id) => {
    // تنفيذ منطق الحذف
    console.log("Delete case:", id);
  };

  const handleEdit = (id) => {
    // تنفيذ منطق التعديل
    console.log("Edit case:", id);
  };

  return (
    <div className="ml-[120px] mx-[60px] py-4">
      <div className="flex justify-between items-center mb-6">
        <Heading
          title="محضر كشــــف وإظهار ورفــــع الآثار الجرمية لمســـرح الجريمة"
          subtitle=""
        />

        <ViewMode mode={viewMode} setViewMode={setViewMode} />
      </div>

      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col"
        }`}
      >
        {incidents?.data?.map((item, index) => (
          <CardForm key={index} data={item} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

export default CriminalEffectsPage;
