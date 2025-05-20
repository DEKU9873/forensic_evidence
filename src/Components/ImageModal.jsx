import React, { useState } from "react";
import { X } from "lucide-react";
import ImagesHook from "../hook/CriminalEffects/images-hook";
import axios from "axios";
import notify from "../hook/useNotification";
import { ToastContainer } from "react-toastify";
import baseURL from "../Api/baseURL";

const ImageModal = ({ onClose, id }) => {
  const [images] = ImagesHook(id);


  const handleSendClick = async () => {
    try {
      await baseURL.put(`/api/incidents/${id}/`, {
        send_to_admin: false,
      });
      notify("تم الإرسال بنجاح!", "success");

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("حدث خطأ أثناء الإرسال:", error);
      notify("فشل في الإرسال. حاول مرة أخرى.", "error");
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-2xl mx-4 transform transition-all duration-300 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            صور الجريمة
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        

        {/* Images */}
        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={`http://192.168.100.201:8000${image?.image}`}
                  alt={`صورة الحادث ${index + 1}`}
                  className="w-full h-[200px] object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center mb-6">
            لا توجد صور متاحة حالياً.
          </p>
        )}

        {/* Send Button */}
        <div onClick={handleSendClick} className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            إرسال
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImageModal;
