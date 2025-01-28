import React from "react";

const CrimeSceneForm = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div
      className="w-[210mm] h-[297mm] bg-white p-2 mx-auto font-sans text-sm"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-1">
        <div className="text-sm text-right leading-tight">
          <h6 className="text-base">جمهورية العراق</h6>
          <h6 className="text-base">وزارة الداخلية</h6>
          <h6 className="text-base">وكالة الوزارة لشؤون الشرطة</h6>
          <h6 className="text-base">مديرية تحقيق الادلة الجنائية</h6>
          <h6 className="text-base ">قسم الطبعة الجرمية</h6>
        </div>

        <div className="w-24 h-24 mx-2">
          <img
            src="/images/forensic_evidence.png"
            alt="logo"
            className="w-23 h-23 object-contain"
          />
        </div>

        <div className="text-sm">
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
        <div className="bg-blue-300 p-0.5 text-center border border-black">
          وصــــف محــــل الحــــادث
        </div>
        <div className="border border-black h-[440px] p-0.5">
          <div className="text-justify">
            في أحد الأحياء الهادئة، وقعت جريمة قتل هزّت المجتمع بأكمله. كانت
            الضحية، رجلًا في منتصف العمر، يعيش وحيدًا في منزله الواقع على أطراف
            الحي. في ليلة مظلمة، تسلل الجاني إلى المنزل عبر نافذة المطبخ
            المفتوحة. استغل السكون الذي يلف المكان لتنفيذ جريمته بدقة. وُجدت
            الضحية ملقاة في غرفة المعيشة، مصابة بعدة طعنات قاتلة، مما يشير إلى
            أن الجريمة تمت باستخدام سكين حاد. الشرطة استُدعيت بعد أن لاحظ أحد
            الجيران أصواتًا غير طبيعية وضوءًا مشتعلًا طوال الليل. عند وصولهم،
            بدأوا بتحليل مسرح الجريمة، حيث تم العثور على بصمات غير واضحة وآثار
            أقدام صغيرة قرب النافذة. الغريب أن الجاني لم يسرق أي شيء، مما أثار
            تساؤلات حول دوافع الجريمة. بدأت التحقيقات بالبحث في علاقات الضحية
            الشخصية، لتكتشف وجود خلافات سابقة مع أشخاص مقربين. ومع ذلك، ظلت هوية
            الجاني ودوافعه لغزًا محيرًا، مما زاد من تعقيد القضية وأشعل خوف
            السكان.
            في أحد الأحياء الهادئة، وقعت جريمة قتل هزّت المجتمع بأكمله. كانت
            الضحية، رجلًا في منتصف العمر، يعيش وحيدًا في منزله الواقع على أطراف
            الحي. في ليلة مظلمة، تسلل الجاني إلى المنزل عبر نافذة المطبخ
            المفتوحة. استغل السكون الذي يلف المكان لتنفيذ جريمته بدقة. وُجدت
            الضحية ملقاة في غرفة المعيشة، مصابة بعدة طعنات قاتلة، مما يشير إلى
            أن الجريمة تمت باستخدام سكين حاد. الشرطة استُدعيت بعد أن لاحظ أحد
            الجيران أصواتًا غير طبيعية وضوءًا مشتعلًا طوال الليل. عند وصولهم،
            بدأوا بتحليل مسرح الجريمة، حيث تم العثور على بصمات غير واضحة وآثار
            أقدام صغيرة قرب النافذة. الغريب أن الجاني لم يسرق أي شيء، مما أثار
            تساؤلات حول دوافع الجريمة. بدأت التحقيقات بالبحث في علاقات الضحية
            الشخصية، لتكتشف وجود خلافات سابقة مع أشخاص مقربين. ومع ذلك، ظلت هوية
            الجاني ودوافعه لغزًا محيرًا، مما زاد من تعقيد القضية وأشعل خوف
            السكان.
            في أحد الأحياء الهادئة، وقعت جريمة قتل هزّت المجتمع بأكمله. كانت
            الضحية، رجلًا في منتصف العمر، يعيش وحيدًا في منزله الواقع على أطراف
            الحي. في ليلة مظلمة، تسلل الجاني إلى المنزل عبر نافذة المطبخ
            المفتوحة. استغل السكون الذي يلف المكان لتنفيذ جريمته بدقة. وُجدت
            الضحية ملقاة في غرفة المعيشة، مصابة بعدة طعنات قاتلة، مما يشير إلى
            أن الجريمة تمت باستخدام سكين حاد. الشرطة استُدعيت بعد أن لاحظ أحد
            الجيران أصواتًا غير طبيعية وضوءًا مشتعلًا طوال الليل. عند وصولهم،
            بدأوا بتحليل مسرح الجريمة، حيث تم العثور على بصمات غير واضحة وآثار
            أقدام صغيرة قرب النافذة. الغريب أن الجاني لم يسرق أي شيء، مما أثار
            تساؤلات حول دوافع الجريمة. بدأت التحقيقات بالبحث في علاقات الضحية
            الشخصية، لتكتشف وجود خلافات سابقة مع أشخاص مقربين. ومع ذلك، ظلت هوية
            الجاني ودوافعه لغزًا محيرًا، مما زاد من تعقيد القضية وأشعل خوف
            السكان.
          </div>
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
              <th className="border border-black p-0.5 text-right text-xs col-span-6"></th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Procedures Section*/}
      <div className="mb-1">
        <div className="bg-blue-300 p-0.5 text-center border border-black">
          الإجــــراءات المتخــــذة
        </div>
        <div className=" p-0.5 text-center border border-black h-[60px]"></div>
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
            {[...Array(8)].map((_, i) => (
              <tr key={i} className="grid grid-cols-7">
                <td className="border border-black p-1 text-xs text-center bg-blue-300 break-words">
                  {i + 1}
                </td>
                <td className="border border-black p-1 text-xs text-right break-words whitespace-normal"></td>
                <td className="border border-black p-1 text-xs text-right break-words whitespace-normal"></td>
                <td className="border border-black p-1 text-xs text-right col-span-3 break-words whitespace-normal"></td>
                <td className="border border-black p-1 text-xs text-right break-words whitespace-normal"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signatures Section */}
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

      {/* Print Button */}
      <div className="flex justify-center mt-8 no-print">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 shadow-md"
        >
          طباعة
        </button>
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CrimeSceneForm;
