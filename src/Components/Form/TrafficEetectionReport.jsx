import React from "react";

const TrafficEetectionReport = () => {
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
              <th className="border border-black p-1 text-xs text-right "></th>
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                الجهة التحقيقية
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-2"></th>
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                وقت اجراء الكشف
              </th>
              <th className="border border-black p-1 text-xs  text-right"></th>
            </tr>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                عنوان محل الحادث
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-1"></th>
              <th className="border border-black p-1 text-xs text-right col-span-5"></th>
            </tr>
            <tr className="grid grid-cols-7">
              <th className="border border-black p-1 text-xs bg-blue-300 text-right">
                تاريخ الحــــادث
              </th>
              <th className="border border-black p-1 text-xs text-right col-span-6"></th>
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
          <div className="text-justify"></div>
        </div>
      </div>
      <div className="mb-1">
        <div className="bg-gray-300 p-0.5 text-center border border-black">
          الاضرار الناتجة
        </div>
        <div className="border border-black h-[150px] p-0.5">
          <div className="text-justify"></div>
        </div>
      </div>
      <div className="mb-1">
        <div className="bg-gray-300 p-0.5 text-center border border-black">
          اسباب الحريق
        </div>
        <div className="border border-black h-[300px] p-0.5">
          <div className="text-justify"></div>
        </div>
      </div>
      <div className="mb-1">
        <div className="bg-gray-300 p-0.5 text-center border border-black">
          الاجراءات المتخذة
        </div>
        <div className="border border-black h-[80px] p-0.5">
          <div className="text-justify"></div>
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
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 shadow-md"
        >
          طباعة
        </button>
      </div>

   
    </div>
  );
};

export default TrafficEetectionReport;
