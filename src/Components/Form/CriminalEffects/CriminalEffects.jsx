import React from "react";
import { useParams } from "react-router-dom";
import IncidentseDetailsHook from "../../../hook/CriminalEffects/Incidents-details-hook";
const CrimeSceneForm = () => {
  const { id } = useParams();
  const [data, table] = IncidentseDetailsHook(id);


  const handlePrint = () => {
    window.print();
  };
  return (
    <div
      className="w-[210mm] h-[297mm] bg-white p-2 mx-auto font-sans text-sm relative"
      dir="rtl"
    >
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
            src="/images/logo3.jpg"
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
        محضر كشــــف وإظهار ورفــــع الآثار الجرمية لمســـرح الجريمة
      </div>

      <div className="mb-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                تاريخ اجراء الكشف
              </th>
              <th className="border border-black p-1 text-xs text-right ">
                {data.date_discovery}
              </th>
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                الجهة التحقيقية
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-2">
                {data.investigating_body}
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
                {data.accident_location}
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-5"></th>
            </tr>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                تاريخ الحــــادث
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-1">
                {data.accident_date}
              </th>
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                نوع الحادث
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-4">
                {data.typeAccident}
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Description Section*/}
      <div className="mb-1">
        <div className="bg-blue-300 p-0.5 text-center border border-black">
          وصــــف محــــل الحــــادث
        </div>
        <div className="border border-black min-h-[440px] p-0.5">
          <div className="text-justify">{data.accident_description}</div>
        </div>
      </div>

      {/* Method Section*/}
      <div className="mb-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-0.5 text-right text-x bg-blue-300">
                الطريقة
              </th>
              <th className="border border-black p-0.5 text-right text-xs col-span-6">
                {data.method}
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Procedures Section */}
      <div className="mb-1">
        <div className="bg-blue-300 p-0.5 text-center border border-black">
          الإجــــراءات المتخــــذة
        </div>
        <div className=" p-0.5 text-right border border-black h-[60px]">{data.action_taken}</div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-1 text-xs bg-blue-300">ت</th>
              <th className="border border-black p-1 text-xs bg-blue-300">
                رقم الأثر او المبرز
              </th>
              <th className="border border-black p-1 text-xs bg-blue-300">
                نوع الأثر او المبرز
              </th>
              <th className="border border-black p-1 text-xs col-span-3 bg-blue-300">
                مكان الرفـــــع
              </th>
              <th className="border border-black p-1 text-xs bg-blue-300">
                طريقـــة الرفـــع
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((item, index) => (
              <tr key={index} className="grid grid-cols-7">
                <td className="border border-black p-1 text-xs text-center break-words">
                  {index + 1}
                </td>
                <td className="border border-black p-1 text-xs text-right break-words whitespace-normal">
                  {item.sampleNumber}
                </td>
                <td className="border border-black p-1 text-xs text-right break-words whitespace-normal">
                  {item.sampleType}
                </td>
                <td className="border border-black p-1 text-xs text-right col-span-3 break-words whitespace-normal">
                  {item.Placeoflifting}
                </td>
                <td className="border border-black p-1 text-xs text-right break-words whitespace-normal">
                  {item.metodeIifting}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signatures Section */}
      <div className="absolute bottom-1 left-1 right-1">
        <div className="grid grid-cols-5 gap-1 text-center ">
          <div>
            <div className="font-bold text-xs">المشتكي</div>
            <div className="border border-black h-10"></div>
          </div>
          <div>
            <div className="font-bold text-xs">المصـــور</div>
            <div className="border border-black h-10"></div>
          </div>
          <div>
            <div className="font-bold text-xs">الممارس</div>
            <div className="border border-black h-10"></div>
          </div>
          <div>
            <div className="font-bold text-xs">المحقـــق</div>
            <div className="border border-black h-10"></div>
          </div>
          <div>
            <div className="font-bold text-xs">رئيــس هيئـة الكشـف</div>
            <div className="border border-black h-10"></div>
          </div>
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

export default CrimeSceneForm;
