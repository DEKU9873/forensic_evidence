import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye } from "lucide-react";

const CardForm = ({ name, date, link, onDelete, onEdit }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit();
  };

  return (
    <div className="mx-2 px-4 py-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-300 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative group">
        <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleDelete}
            className="p-2 text-rose-600 hover:bg-rose-50 rounded-full transition-colors duration-300"
            aria-label="حذف"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button 
            onClick={handleEdit}
            className="p-2 text-sky-600 hover:bg-sky-50 rounded-full transition-colors duration-300"
            aria-label="تعديل"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-4">
          <h2 className="text-xl font-bold text-center text-blue-800 mb-3">{name}</h2>
          <p className="text-blue-600 text-center mb-4">{date}</p>
          
           
          <div className="flex justify-center">
            <Link 
              to={link}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              <Eye className="w-4 h-4" />
              <span>عرض</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForm;