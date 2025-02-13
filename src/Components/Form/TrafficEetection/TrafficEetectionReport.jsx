import React from "react";
import { useParams } from "react-router-dom";
import TrafficeEtectionDetailsHook from "../../../hook/TrafficEetection/traffice-etection-details-hook";
const TrafficEetectionReport = () => {
  const { id } = useParams();
  const [data] = TrafficeEtectionDetailsHook(id);

  const handlePrint = () => {
    window.print();
  };
  return (
    <div
      className="w-[210mm] h-[297mm] bg-white p-2 mx-auto font-sans text-sm relative"
      dir="rtl"
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 z-0">
        <img
          src="/images/forensic_evidence.png"
          alt="Watermark"
          className="w-[800px] h-[800px] object-contain"
        />
      </div>

      {/* Header */}
      <div className="flex mb-1">
        <div className="text-sm text-right leading-tight absolute right-2">
          <h6 className="text-base">جمهورية العراق</h6>
          <h6 className="text-base">وزارة الداخلية</h6>
          <h6 className="text-base">وكالة الوزارة لشؤون الشرطة</h6>
          <h6 className="text-base">مديرية تحقيق الادلة الجنائية</h6>
          <h6 className="text-base ">قسم الطبعة الجرمية</h6>
        </div>

        <div className="w-24 h-24 mx-2 flex-grow flex justify-center ">
          <img
            src="/images/forensic_evidence.png"
            alt="logo"
            className="w-23 h-23 object-contain"
          />
        </div>

        <div className="text-sm absolute left-2">
          <div className="font-bold">رقــم القضــــية</div>
          <div className="border border-black p-0.5">text</div>
          <div className="border border-black p-0.5">NCRM: 1</div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center font-bold mb-1 text-base">
        محضر كشــــف الحرائق
      </div>

      <div className="mb-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                تاريخ اجراء الكشف
              </th>
              <th className="border border-black p-1 text-xs text-right ">
                {data.inspection_date}
              </th>
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                الجهة التحقيقية
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-2">
                {data.request_authority}
              </th>
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                وقت اجراء الكشف
              </th>
              <th className="border border-black p-1 text-xs  text-right">
                {data.inspection_time}
              </th>
            </tr>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                عنوان محل الحادث
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-1">
                {data.inspection_place}
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-5"></th>
            </tr>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                تاريخ الحــــادث
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-6">
                {data.incident_date}
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Description Section*/}
      <div className="mb-1">
        <div className="bg-gray-300 p-0.5 text-center border border-black">
          وصــــف محــــل الحــــادث
        </div>
        <div className="border border-black h-[150px] p-0.5">
          <div className="text-justify">{data.fire_place}</div>
        </div>
      </div>
      <div className="mb-1">
        <div className="bg-gray-300 p-0.5 text-center border border-black">
          الاضرار الناتجة
        </div>
        <div className="border border-black h-[150px] p-0.5">
          <div className="text-justify">{data.damage}</div>
        </div>
      </div>
      <div className="mb-1">
        <div className="bg-gray-300 p-0.5 text-center border border-black">
          اسباب الحريق
        </div>
        <div className="border border-black h-[300px] p-0.5">
          <div className="text-justify">{data.fire_reason}</div>
        </div>
      </div>
      <div className="mb-1">
        <div className="bg-gray-300 p-0.5 text-center border border-black">
          الاجراءات المتخذة
        </div>
        <div className="border border-black h-[80px] p-0.5">
          <div className="text-justify">{data.procedures}</div>
        </div>
      </div>

      {/* Signatures Section */}
      <div className="grid grid-cols-5 gap-1 text-center ">
        <div>
          <div className="font-bold text-xs">المشتكي</div>
          <div className="border border-black h-20"></div>
        </div>
        <div>
          <div className="font-bold text-xs">المصـــور</div>
          <div className="border border-black h-20"></div>
        </div>
        <div>
          <div className="font-bold text-xs">الممارس</div>
          <div className="border border-black h-20"></div>
        </div>
        <div>
          <div className="font-bold text-xs">المحقـــق</div>
          <div className="border border-black h-20"></div>
        </div>
        <div>
          <div className="font-bold text-xs">رئيــس هيئـة الكشـف</div>
          <div className="border border-black h-20"></div>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-8 no-print">
        <button
          onClick={handlePrint}
          className="px-8 py-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold rounded-xl 
              hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg hover:-translate-y-0.5 
              active:translate-y-0 transition-all duration-300 shadow-md 
              flex items-center gap-2 transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M18 14H6v8h12v-8Z" />
          </svg>
          <span>طباعة المحضر</span>
        </button>
      </div>
    </div>
  );
};

export default TrafficEetectionReport;
