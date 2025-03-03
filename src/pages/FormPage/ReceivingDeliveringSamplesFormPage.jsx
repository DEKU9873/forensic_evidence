import React, { useEffect, useState } from "react";
import Heading from "../../Components/Uitily/Heading";
import ViewMode from "../../Components/Uitily/ViewMode";
import ReceivingDeliveringSamplesFormCard from "../../Components/Form/ReceivingDeliveringSamples/ReceivingDeliveringSamplesFormCard.jsx";
import IncidentsHook from "../../hook/CriminalEffects/Incidents-hook.js";
import SearchBar from "../../Components/Uitily/SearchBar.jsx";
import Pagination from "../../Components/Uitily/Pagination.jsx";
import ReceivingDeliveringSamplesFormTable from "../../Components/Form/ReceivingDeliveringSamples/ReceivingDeliveringSamplesFormTable.jsx";

const ReceivingDeliveringSamplesFormPage = () => {
  const [incidents, loading, pageCount, onPress] = IncidentsHook();

  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("viewMode") || "grid";
  });

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <div className="ml-[120px] mx-[60px] py-4">
      <div className="flex justify-between items-center mb-6">
        <Heading title="إستمارة إستلام وتسليم العينات" subtitle="" />
      </div>

      <div className="flex felx-row mb-10">
        <SearchBar />
        <ViewMode mode={viewMode} setViewMode={setViewMode} />
      </div>

      {viewMode === "table" ? (
        <ReceivingDeliveringSamplesFormTable  />
      ) : (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col"
          }`}
        >
          {incidents?.data?.map((item, index) => (
            <ReceivingDeliveringSamplesFormCard key={index} data={item} viewMode={viewMode} />
          ))}
        </div>
      )}
      <Pagination pageCount={pageCount} onPress={onPress} />
    </div>
  );
};

export default ReceivingDeliveringSamplesFormPage;
