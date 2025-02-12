import React from "react";
import { Link } from "react-router-dom";
import { Eye, FileText } from "lucide-react";
import ActionButtons from "../Uitily/ActionButtons";

const ReceivingDeliveringSamplesFormCard = ({
  data,
  viewMode="grid",
}) => {
  const handleDelete = (e) => {
    e.preventDefault();
  };

  const handleEdit = (e) => {
    e.preventDefault();
  };

  
  if (viewMode === "list") {
    return (
      <div className="group relative mb-3 mx-2">
        <div className="bg-gradient-to-r from-white to-blue-50 border-l-4 border-blue-300 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-2 h-14 bg-blue-200 rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
              <div>
                <h2 className="text-lg font-bold text-blue-900 mb-1">{data.investigative_body}</h2>
                <p className="text-blue-500 text-sm font-medium">{data.inspection_date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ActionButtons onDelete={handleDelete} onEdit={handleEdit} />
              <Link
                to={`/form1/${data.id}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium">عرض التفاصيل</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
    
  }

  return (
    <div className="group relative px-4 py-6 hover:transform hover:scale-[1.02] transition-all duration-300">
      <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm hover:shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="group relative w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center transition-all hover:bg-blue-100 cursor-pointer">
              <FileText className="w-5 h-5 text-blue-600 opacity-75 group-hover:opacity-100" />
              <div className="absolute inset-0 border-2 border-blue-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ActionButtons onDelete={handleDelete} onEdit={handleEdit} />{" "}
          </div>

          <h2 className="text-xl font-extrabold text-blue-900 mb-2">{data.investigative_body}</h2>
          <p className="text-blue-500 text-sm font-medium mb-6">{data.inspection_date}</p>

          <div className="flex justify-center">
            <Link
              to={`/form1/${data.id}`}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Eye className="w-5 h-5" />
              <span className="font-medium">عرض المحتوى</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivingDeliveringSamplesFormCard;
