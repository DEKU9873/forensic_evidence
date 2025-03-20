import React, { useEffect, useState } from "react";
import Heading from "../../Components/Uitily/Heading";
import ViewMode from "../../Components/Uitily/ViewMode";
import TrafficEetectionCard from "../../Components/Form/TrafficEetection/TrafficEetectionCard";
import TrafficeEtectionHook from "../../hook/TrafficEetection/traffice-etection-hook";
import SearchBar from "../../Components/Uitily/SearchBar";
import Pagination from "../../Components/Uitily/Pagination";
import TrafficEetectionReportTable from "../../Components/Form/TrafficEetection/TrafficEetectionReportTable";
import IncidentsHook from "../../hook/CriminalEffects/Incidents-hook.js";

const TrafficDetectionReportPage = () => {
  const [incidents, loading, pageCount, onPress] = IncidentsHook();
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("viewMode") || "grid";
  });

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const filteredIncidents = incidents?.data?.filter(
    (item) => item.category_accident === "fireAccident"
  );

  return (
    <div className="ml-[120px] mx-[60px] py-4">
      <div className="flex justify-between items-center mb-6">
        <Heading title="محضر كشــــف الحرائق" subtitle="" />
      </div>

      <div className="flex felx-row mb-10">
        <SearchBar />
        <ViewMode mode={viewMode} setViewMode={setViewMode} />
      </div>

      {viewMode === "table" ? (
        <TrafficEetectionReportTable data={filteredIncidents}  />
      ) : (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col"
          }`}
        >
          {filteredIncidents?.map((item, index) => (

            <TrafficEetectionCard key={index} data={item} viewMode={viewMode} />
          ))}
        </div>
      )}
      <Pagination pageCount={pageCount} onPress={onPress} />
    </div>
  );
};

export default TrafficDetectionReportPage;
