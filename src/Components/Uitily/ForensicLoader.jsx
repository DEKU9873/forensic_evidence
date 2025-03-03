import React from 'react';
import { AlertCircle } from 'lucide-react';

const ForensicLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-slate-50 rounded-lg p-6">
      <div className="relative">
        <AlertCircle 
          className="w-16 h-16 text-blue-600 animate-pulse" 
        />
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent" />
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-center">
        <h3 className="text-lg font-semibold text-slate-900">جاري التحميل</h3>
        <p className="text-sm text-slate-600">يرجى الانتظار ريثما يتم معالجة البيانات</p>
      </div>

      {/* شريط التقدم المتحرك */}
      <div className="w-64 h-2 mt-6 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full animate-progressBar" 
             style={{
               animation: "progress 2s ease-in-out infinite"
             }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ForensicLoader;