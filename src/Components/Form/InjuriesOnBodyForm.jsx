import React from "react";

const InjuriesOnBodyForm = () => {
  return (
    <div
      className="w-[210mm] h-[297mm]  p-2 mx-auto font-sans text-sm "
      dir="rtl"
    >
      {/* Outer Border */}
      <div className="h-[293mm] border border-black  relative">
        {/* Header */}
        <div className="flex mb-1 mt-4">
          <div className="w-[120px] h-[40px]  border-2 border-dotted border-black  text-sm text-right leading-tight absolute right-4"></div>

          <div className="w-24 h-24 mx-2 flex-grow flex justify-center mt-2 text-xl">
            مفصل ومخطط موقع الاصابة على الجثة
          </div>

          <div className="text-sm absolute left-4 mt-2">
            <div className="font-bold">رقــم القضــــية</div>
          </div>
        </div>

        {/* Body front and back */}
        <div className="flex justify-between">
          <img
            src="/body_images/body_back.jpg"
            alt=""
            className="w-[45%] -ml-8 h-[400px] object-contain"
          />
          <img
            src="/body_images/body_front.jpg"
            alt=""
            className="w-[45%] -mr-8 h-[400px] object-contain"
          />
        </div>

        {/* Body right and left */}
        <div className="flex justify-between mt-4">
          <img
            src="/body_images/body_right.jpg"
            alt=""
            className="w-[45%] -ml-8 h-[400px] object-contain"
          />
          <img
            src="/body_images/body_left.jpg"
            alt=""
            className="w-[45%] -mr-8 h-[400px] object-contain"
          />
        </div>

        {/* Head front */}
        <img
          src="/body_images/head_front.png"
          alt=""
          className="w-[170px] h-[170px] absolute right-1/2 translate-x-1/2 top-[140px] object-contain"
        />

        {/* Head sides */}
        <img
          src="/body_images/head_right.png"
          alt=""
          className="w-[170px] h-[170px] absolute right-[230px] top-[300px] object-contain"
        />
        <img
          src="/body_images/head_left.png"
          alt=""
          className="w-[170px] h-[170px] absolute left-[230px] top-[300px] object-contain"
        />

        {/* Foot */}
        <img
          src="/body_images/foot.png"
          alt=""
          className="w-[200px] h-[200px] absolute right-1/2 translate-x-1/2 top-[650px] object-contain"
        />

        {/* Signatures Section */}
<div className="grid grid-cols-5 gap-1 text-center mt-[65px] mx-1 ">
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

export default InjuriesOnBodyForm;
