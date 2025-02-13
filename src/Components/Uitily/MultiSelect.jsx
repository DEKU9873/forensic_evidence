import React, { useState, useRef, useEffect } from "react";

const MultiSelect = () => {
  // حالة فتح القائمة أو إغلاقها
  const [open, setOpen] = useState(false);
  // الحالة التي تحتوي على العناصر المُختارة
  const [selected, setSelected] = useState([]);
  // حالة النص المكتوب في حقل البحث
  const [query, setQuery] = useState("");
  // مرجع للحاوية الخارجة، لاستخدامه في إغلاق القائمة عند النقر خارجها
  const containerRef = useRef(null);

  // إغلاق القائمة عند النقر خارج المكون
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // قائمة الخيارات
  const options = [
    { id: 1, label: "تفاح" },
    { id: 2, label: "موز" },
    { id: 3, label: "برتقال" },
    { id: 4, label: "مانجو" },
    { id: 5, label: "فراولة" },
    { id: 6, label: "عنب" },
  ];

  // تصفية الخيارات بناءً على النص المكتوب في البحث
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  // تبديل اختيار العنصر: إضافة إذا لم يكن موجودًا أو إزالته إذا كان موجودًا
  const toggleOption = (option) => {
    if (selected.some((item) => item.id === option.id)) {
      setSelected(selected.filter((item) => item.id !== option.id));
    } else {
      setSelected([...selected, option]);
    }
  };

  // إزالة عنصر من العناصر المُختارة
  const removeItem = (id) => {
    setSelected(selected.filter((item) => item.id !== id));
  };

  return (
    <div className="relative w-72" ref={containerRef}>
      {/* زر القائمة لإظهار العناصر المُختارة */}
      <div
        className="min-h-[45px] border rounded-lg p-2 bg-white cursor-pointer flex flex-wrap gap-2 hover:border-blue-500 transition-all duration-200"
        onClick={() => setOpen(!open)}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">اختر عناصر...</span>
        ) : (
          selected.map((item) => (
            <span
              key={item.id}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full flex items-center"
            >
              {item.label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </span>
          ))
        )}
      </div>

      {/* القائمة المنسدلة */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          {/* حقل البحث */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="بحث..."
              className="w-full border rounded px-2 py-1 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {/* عرض الخيارات */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-center text-gray-500">لا توجد نتائج</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className="p-2 hover:bg-gray-100 flex items-center cursor-pointer transition-colors duration-200"
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={selected.some((item) => item.id === option.id)}
                    className="mr-2"
                  />
                  <span>{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
