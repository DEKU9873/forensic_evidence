import React, { useState, useEffect } from "react";
import CardForm from "../../Components/Form/CriminalEffects/CardForm.jsx";
import CriminalEffectsTable from "../../Components/Form/CriminalEffects/CriminalEffectsTable.jsx";
import Heading from "../../Components/Uitily/Heading";
import ViewMode from "../../Components/Uitily/ViewMode.jsx";
import EvidenceHook from "../../hook/CriminalEffects/evidence-hook.js";
import IncidentsHook from "../../hook/CriminalEffects/Incidents-hook.js";
import SearchBar from "../../Components/Uitily/SearchBar.jsx";
import Pagination from "../../Components/Uitily/Pagination.jsx";

const CriminalEffectsPage = () => {
  const [incidents, loading, pageCount, getPage] = IncidentsHook();

  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("viewMode") || "grid";
  });

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <div className="ml-[120px] mx-[60px] py-4">
      <div className="flex justify-between items-center mb-6">
        <Heading
          title="محضر كشــــف وإظهار ورفــــع الآثار الجرمية لمســـرح الجريمة"
          subtitle=""
        />
      </div>
      <div className="flex felx-row mb-2">
        <SearchBar />
        <ViewMode mode={viewMode} setViewMode={setViewMode} />
      </div>

      {viewMode === "table" ? (
        <CriminalEffectsTable  />
      ) : (
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
      )}

      <Pagination pageCount={pageCount} onPress={getPage} />
    </div>
  );
};

export default CriminalEffectsPage;
