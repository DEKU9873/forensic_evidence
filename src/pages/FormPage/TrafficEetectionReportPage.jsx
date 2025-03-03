import React, { useEffect, useState } from "react";
import Heading from "../../Components/Uitily/Heading";
import ViewMode from "../../Components/Uitily/ViewMode";
import TrafficEetectionCard from "../../Components/Form/TrafficEetection/TrafficEetectionCard";
import TrafficeEtectionHook from "../../hook/TrafficEetection/traffice-etection-hook";
import SearchBar from "../../Components/Uitily/SearchBar";
import Pagination from "../../Components/Uitily/Pagination";
import TrafficEetectionReportTable from "../../Components/Form/TrafficEetection/TrafficEetectionReportTable";

const TrafficDetectionReportPage = () => {
  const [fire, loading, pageCount, getPage] = TrafficeEtectionHook();
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("viewMode") || "grid";
  });

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

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
        <TrafficEetectionReportTable  />
      ) : (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col"
          }`}
        >
          {fire?.data?.map((item, index) => (
            <TrafficEetectionCard key={index} data={item} viewMode={viewMode} />
          ))}
        </div>
      )}
      <Pagination pageCount={pageCount} onPress={getPage} />
    </div>
  );
};

export default TrafficDetectionReportPage;
