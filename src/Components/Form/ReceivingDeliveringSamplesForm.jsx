import React from "react";

const ReceivingDeliveringSamplesForm = () => {
  const handlePrint = () => {
    window.print();
  };

  // البيانات الخاصة بالجدول
  const tableData = [
    {
      type: "عينة دم",
      count: 5,
      criminalNature: "نعم",
      photographyLab: "لا",
      weaponsLab: "نعم",
      chemistryLab: "لا",
      dnaLab: "نعم",
      cyberCrimesLab: "لا",
    },
    {
      type: "بصمات أصابع",
      count: 3,
      criminalNature: "نعم",
      photographyLab: "نعم",
      weaponsLab: "لا",
      chemistryLab: "لا",
      dnaLab: "لا",
      cyberCrimesLab: "نعم",
    },
  ];

  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-white p-8 shadow-lg relative">
      {/* Header with Logo and Text */}
      <div className="grid grid-cols-3 items-start mb-8">
        <div className="text-right">
          <h1 className="text-base font-bold mb-1">جمهورية العراق</h1>
          <h2 className="text-base font-bold mb-1">وزارة الداخلية</h2>
          <h3 className="text-base font-bold mb-1">وكالة الوزارة لشؤون الشرطة</h3>
          <h3 className="text-base font-bold mb-1">مديرية تحقيق الادلة الجنائية</h3>
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
          <span className="text-gray-600">_____________</span>
        </div>
        <div className="border-b border-gray-300 pb-1">
          <span className="font-bold ml-2">جهة الطلب:</span>
          <span className="text-gray-600">_____________</span>
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
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border border-black p-2 h-8">{item.type}</td>
                <td className="border border-black p-2 h-8">{item.count}</td>
                <td className="border border-black p-2 h-8">
                  {item.criminalNature}
                </td>
                <td className="border border-black p-2 h-8">
                  {item.photographyLab}
                </td>
                <td className="border border-black p-2 h-8">
                  {item.weaponsLab}
                </td>
                <td className="border border-black p-2 h-8">
                  {item.chemistryLab}
                </td>
                <td className="border border-black p-2 h-8">{item.dnaLab}</td>
                <td className="border border-black p-2 h-8">
                  {item.cyberCrimesLab}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="8" className="border border-black p-2 text-right">
                <span className="font-bold">مجموع المبرز:</span>
                <span className="text-gray-600 mr-2">_____________</span>
              </td>
            </tr>
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
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 shadow-md"
        >
          طباعة
        </button>
      </div>

   
    </div>
  );
};

export default ReceivingDeliveringSamplesForm;
