import React, { useState } from "react";
import CardForm from "../../Components/Form/CardForm";
import Heading from "../../Components/Uitily/Heading";
import { LayoutGrid, List } from "lucide-react";

const ReceivingDeliveringSamplesFormPage = () => {
  const [viewMode, setViewMode] = useState('grid');

  const cases = [
    { id: 1, name: "قضية 1", date: "30/11/2023", link: "/form1Details:id" },
    { id: 2, name: "قضية 2", date: "30/11/2023", link: "/form1Details:id" },
    { id: 3, name: "قضية 3", date: "30/11/2023", link: "/form1Details:id" },
    { id: 4, name: "قضية 4", date: "30/11/2023", link: "/form1Details:id" },
    { id: 5, name: "قضية 5", date: "30/11/2023", link: "/form1Details:id" },
    { id: 6, name: "قضية 6", date: "30/11/2023", link: "/form1Details:id" },
  ];

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
        <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="عرض شبكي"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="عرض قائمة"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'flex flex-col'
        }
      `}>
        {cases.map((caseItem) => (
          <CardForm
            key={caseItem.id}
            name={caseItem.name}
            date={caseItem.date}
            link={caseItem.link}
            viewMode={viewMode}
            onDelete={() => handleDelete(caseItem.id)}
            onEdit={() => handleEdit(caseItem.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReceivingDeliveringSamplesFormPage;