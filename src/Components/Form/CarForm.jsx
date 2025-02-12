import React from "react";

const CarForm = () => {
  return (
    <div
      className="w-[210mm] h-[297mm]  p-2 mx-auto font-sans text-sm "
      dir="rtl"
    >
      {" "}
      <div className="h-[293mm] border border-black  relative">
        {/* Header with Logo and Text */}
        <div className="grid grid-cols-3 items-start mb-8">
          <div className="m-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="grid grid-cols-3">
                  <th className="border border-black p-1 text-xs bg-blue-300  text-center">
                    المشتكي المجنى عليه
                  </th>
                  <th className="border border-black p-1 text-xs  text-right col-span-2"></th>
                </tr>
                <tr className="grid grid-cols-3 h-[40px]">
                  <th className="border border-black p-2 text-xs bg-blue-300 text-center">
                    جهة الطلب
                  </th>
                  <th className="border border-black p-1 text-xs btext-right col-span-2"></th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="flex justify-center ">
            <div className="w-[100px] h-[100px] bg-gray-100 rounded-full flex items-center justify-center mt-2">
              <img
                src="/images/forensic_evidence.png"
                alt="Forensic Evidence"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Form Title */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-bold border-b-2 border-black inline-block pb-1">
            مخطط الكشف على عجلة
          </h4>
        </div>

        {/* Image */}
        <div>
          <img
            src="/body_images/car.jpg"
            alt="Car"
            className="w-[500px] h-[750px] mx-auto "
          />
        </div>

        {/* Signatures Section */}
        <div className="grid grid-cols-5 gap-1 text-center mt-[56px] mx-1 ">
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
      </div>
    </div>
  );
};

export default CarForm;
