import React, { useEffect, useState } from "react";
import CardForm from "../../Components/Form/CriminalEffects/CardForm.jsx";
import Heading from "../../Components/Uitily/Heading";
import { LayoutGrid, List } from "lucide-react";
import ViewMode from "../../Components/Uitily/ViewMode";
import ReceivingDeliveringSamplesFormCard from "../../Components/Form/ReceivingDeliveringSamples/ReceivingDeliveringSamplesFormCard.jsx";
import IncidentsHook from "../../hook/CriminalEffects/Incidents-hook.js";
import { getAllEvidence } from "../../redux/actions/CriminalEffectsAction";
import SearchBar from "../../Components/Uitily/SearchBar.jsx";
import Pagination from "../../Components/Uitily/Pagination.jsx";

const ReceivingDeliveringSamplesFormPage = () => {
  const [incidents, loading, pageCount, getPage] = IncidentsHook();

  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("viewMode") || "grid";
  });

  // حفظ الـ viewMode في localStorage عند تغييره
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <div className="ml-[120px] mx-[60px] py-4">
      <div className="flex justify-between items-center mb-6">
        <Heading title="إستمارة إستلام وتسليم العينات" subtitle="" />
      </div>

      <div className="flex felx-row mb-2">
        <SearchBar />
        <ViewMode mode={viewMode} setViewMode={setViewMode} />
      </div>

      <div
        className={`
        ${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col"
        }
      `}
      >
        {incidents?.data?.map((item, index) => (
          <ReceivingDeliveringSamplesFormCard
            key={index}
            data={item}
            viewMode={viewMode}
          />
        ))}
      </div>
      <Pagination pageCount={pageCount} onPress={getPage} />
    </div>
  );
};

export default ReceivingDeliveringSamplesFormPage;
