import React, { useState } from "react";
import CardForm from "../../Components/Form/CardForm";
import Heading from "../../Components/Uitily/Heading";
import { LayoutGrid, List } from "lucide-react";
import ViewMode from "../../Components/Uitily/ViewMode";
import ReceivingDeliveringSamplesFormCard from "../../Components/Form/ReceivingDeliveringSamplesFormCard";
import IncidentsHook from "../../hook/CriminalEffects/Incidents-hook.js";
import { getAllEvidence } from "../../redux/actions/CriminalEffectsAction";

const ReceivingDeliveringSamplesFormPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [incidents,loading] = IncidentsHook();

  // const cases = [
  //   { id: 1, name: "قضية 1", date: "30/11/2023", link: "/form1Details:id" },
  //   { id: 2, name: "قضية 2", date: "30/11/2023", link: "/form1Details:id" },
  //   { id: 3, name: "قضية 3", date: "30/11/2023", link: "/form1Details:id" },
  //   { id: 4, name: "قضية 4", date: "30/11/2023", link: "/form1Details:id" },
  //   { id: 5, name: "قضية 5", date: "30/11/2023", link: "/form1Details:id" },
  //   { id: 6, name: "قضية 6", date: "30/11/2023", link: "/form1Details:id" },
  // ];

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
          title="إستمارة إستلام وتسليم العينات" 
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
        {incidents?.data?.map((item, index) => (
          <ReceivingDeliveringSamplesFormCard
          key={index} data={item} viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ReceivingDeliveringSamplesFormPage;