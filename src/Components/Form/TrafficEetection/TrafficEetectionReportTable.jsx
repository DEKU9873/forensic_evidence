import React, { useState } from "react";
import { Eye, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import IncidentsHook from "../../../hook/CriminalEffects/Incidents-hook";
import TrafficeEtectionHook from "../../../hook/TrafficEetection/traffice-etection-hook";

const TrafficEetectionReportTable = () => {
    const [fire, loading, pageCount, onPress] = TrafficeEtectionHook();
    const [isMenuOpen, setIsMenuOpen] = useState(null);

  const handleMenuToggle = (id) => {
    setIsMenuOpen(isMenuOpen === id ? null : id);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(null);
  };

  return (
    <div className="w-full border border-blue-50 rounded-lg  shadow-sm mt-10">
      {/* Header */}
      <div className="bg-blue-50">
        <div className="grid grid-cols-12 gap-4 px-6 py-3">
          <div className="col-span-1">
            <h3 className="text-blue-900 font-semibold">ت</h3>
          </div>
          <div className="col-span-4">
            <h3 className="text-blue-900 font-semibold">الجهة التحقيقية</h3>
          </div>
          <div className="col-span-4">
            <h3 className="text-blue-900 font-semibold">تاريخ اجراء الكشف</h3>
          </div>
          <div className="col-span-3">
            <h3 className="text-blue-900 font-semibold">الإجراءات</h3>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-white divide-y divide-blue-50">
        {fire?.data?.map((item, index) => (
          <div key={item.id} className="hover:bg-blue-50 transition-colors ">
            <div className="grid grid-cols-12 gap-4 items-center px-6 py-4">
              <div className="col-span-1">
                <p className="text-blue-900 font-medium">{index + 1}</p>
              </div>
              <div className="col-span-4">
                <p className="text-blue-900 font-medium">
                  {item.request_authority}
                </p>
              </div>
              <div className="col-span-4">
                <p className="text-blue-500 text-md">{item.inspection_date}</p>
              </div>
              <div className="col-span-3 flex items-center justify-start">
                {/* Dropdown Menu */}
                <div className="relative">
                  <button
                    onClick={() => handleMenuToggle(item.id)}
                    className="p-2  hover:bg-blue-100 rounded-full"
                  >
                    <MoreVertical className="w-5 h-5 text-blue-600" />
                  </button>

                  {isMenuOpen === item.id && (
                    <div
                      className="absolute left-10 top-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-blue-50 py-2 z-100"
                      onMouseLeave={handleCloseMenu}
                    >
                      <Link
                        to={`/form2/${item.id}`}
                        className="w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        عرض التفاصيل
                      </Link>
                      <button className="w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        تعديل
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-blue-50 flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficEetectionReportTable;
