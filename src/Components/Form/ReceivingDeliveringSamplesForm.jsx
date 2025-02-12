import React from "react";
import { useParams } from "react-router-dom";
import SampleDetailsHook from "../../hook/ReceivingDeliveringSamples/sample-details-hook";
import IncidentseDetailsHook from "../../hook/CriminalEffects/Incidents-details-hook";

const ReceivingDeliveringSamplesForm = () => {
  const { id } = useParams();
  const [lab] = SampleDetailsHook(id);
  const [data, table] = IncidentseDetailsHook(id);

  console.log(table);
  console.log(lab);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-white p-8 shadow-lg relative">
      {/* Header with Logo and Text */}
      <div className="grid grid-cols-3 items-start mb-8">
        <div className="text-right">
          <h1 className="text-base font-bold mb-1">جمهورية العراق</h1>
          <h2 className="text-base font-bold mb-1">وزارة الداخلية</h2>
          <h3 className="text-base font-bold mb-1">
            وكالة الوزارة لشؤون الشرطة
          </h3>
          <h3 className="text-base font-bold mb-1">
            مديرية تحقيق الادلة الجنائية
          </h3>
          <h3 className="text-base font-bold">قسم الطبعة الجرمية</h3>
        </div>

        <div className="flex justify-center">
          <div className="w-23 h-23 bg-gray-100 rounded-full flex items-center justify-center">
            <img
              src="/images/forensic_evidence.png"
              alt="Forensic Evidence"
              className="w-22 h-22 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Form Title */}
      <div className="text-center mb-6">
        <h4 className="text-lg font-bold border-b-2 border-black inline-block pb-1">
          إستمارة إستلام وتسليم العينات
        </h4>
      </div>

      {/* Top Fields */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="border-b border-gray-300 pb-1">
          <span className="font-bold ml-2">تاريخ التفتيش:</span>
          <span className="text-gray-600">{data.inspection_date}</span>
        </div>
        <div className="border-b border-gray-300 pb-1">
          <span className="font-bold ml-2">جهة الطلب:</span>
          <span className="text-gray-600">{data.investigative_body}</span>
        </div>
        <div className="border-b border-gray-300 pb-1">
          <span className="font-bold ml-2">الحادث:</span>
          <span className="text-gray-600">_____________</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-black p-1 bg-blue-300 w-2/5">
                نوع المبرز او العينة او الأثر
              </th>
              <th className="border border-black p-1 bg-blue-300 w-12">
                العدد
              </th>
              <th className="border border-black p-1 bg-blue-300 w-16">
                طبيعة جرمية
              </th>
              <th className="border border-black p-1 bg-blue-300 w-12">
                مختبر التصوير
              </th>
              <th className="border border-black p-1 bg-blue-300 w-12">
                مختبر الأسلحة
              </th>
              <th className="border border-black p-1 bg-blue-300 w-12">
                مختبر الكيمياء
              </th>
              <th className="border border-black p-1 bg-blue-300 w-12">
                DNA مختبر
              </th>
              <th className="border border-black p-1 bg-blue-300 w-12">
                جرائم الكترونية
              </th>
            </tr>
          </thead>
          <tbody>
            {lab.map((item, index) => {
              // البحث عن نوع المبرز باستخدام evidence من lab وربطه بـ table
              const evidenceItem = table.find((e) => e.id === item.evidence);
              return (
                <tr key={index}>
                  <td className="border border-black p-2 h-8">
                    {evidenceItem ? evidenceItem.Typeofevidence : "غير معروف"}
                  </td>
                  <td className="border border-black p-2 h-8">{item.count}</td>
                  <td className="border border-black p-2 h-8">
                    {item.crime_lab ? "✅" : "❌"}
                  </td>
                  <td className="border border-black p-2 h-8">
                    {item.dna_lab ? "✅" : "❌"}
                  </td>
                  <td className="border border-black p-2 h-8">
                    {item.weapon_lab ? "✅" : "❌"}
                  </td>
                  <td className="border border-black p-2 h-8">
                    {item.chemistry_lab ? "✅" : "❌"}
                  </td>
                  <td className="border border-black p-2 h-8">
                    {item.dna_lab ? "✅" : "❌"}
                  </td>
                  <td className="border border-black p-2 h-8">
                    {item.cyber_crime_lab ? "✅" : "❌"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-between px-4 mt-6">
        <div>
          <p className="font-bold mb-4">المستلم</p>
          <div className="text-gray-600 mr-2">_____________</div>
        </div>
        <div>
          <p className="font-bold mb-4">رئيس هيئة الكشف</p>
          <div className="text-gray-600 mr-2">_____________</div>
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

export default ReceivingDeliveringSamplesForm;
