import React, { useState } from "react";
import CardForm from "../../Components/Form/CardForm";
import Heading from "../../Components/Uitily/Heading";
import { LayoutGrid, List } from "lucide-react";
import ViewMode from "../../Components/Uitily/ViewMode";
import TrafficEetectionCard from "../../Components/Form/TrafficEetectionCard";
import TrafficeEtectionHook from "../../hook/TrafficEetection/traffice-etection-hook";

const TrafficDetectionReportPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [fire,loading] = TrafficeEtectionHook ();


  const handleDelete = (id) => {
    // تنفيذ منطق الحذف
    console.log('Delete case:', id);
  };

  const handleEdit = (id) => {
    // تنفيذ منطق التعديل
    console.log('Edit case:', id);
  };

  return (
    <div className="ml-[120px] mx-[60px] py-4">
      <div className="flex justify-between items-center mb-6">
        <Heading 
          title="محضر كشــــف الحرائق" 
          subtitle="" 
        />
              <ViewMode mode={viewMode} setViewMode={setViewMode} />

      </div>

      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'flex flex-col'
        }
      `}>
        {fire?.data?.map((item, index) => (
          <TrafficEetectionCard
          key={index} data={item} viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default TrafficDetectionReportPage;