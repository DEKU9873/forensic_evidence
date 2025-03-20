import React, { useState } from 'react';
import * as docx from 'docx'; // مكتبة لإنشاء مستندات Word
import { saveAs } from 'file-saver'; // مكتبة لتنزيل الملفات
import { FileText, Download, X, CheckSquare } from 'lucide-react'; // أيقونات جاهزة للاستخدام

const ReportDownloader = () => {
  // تعريف أنواع التقارير المتاحة
  // كل تقرير له معرف وعنوان وأيقونة
  const reportOptions = [
    { id: 'sales', label: 'تقرير المبيعات', icon: FileText },
    { id: 'inventory', label: 'تقرير المخزون', icon: FileText },
    { id: 'expenses', label: 'تقرير المصروفات', icon: FileText },
    { id: 'customers', label: 'تقرير العملاء', icon: FileText },
    { id: 'employees', label: 'تقرير الموظفين', icon: FileText }
  ];

  // حالة لتخزين التقارير التي تم اختيارها
  const [selectedReports, setSelectedReports] = useState([]);
  
  // حالات لإدارة المعاينة والتنزيل
  const [previewContent, setPreviewContent] = useState(''); // محتوى المعاينة
  const [showPreview, setShowPreview] = useState(false); // هل تظهر نافذة المعاينة
  const [documentBlob, setDocumentBlob] = useState(null); // ملف الوورد الذي سيتم تنزيله

  // دالة لإضافة أو إزالة التقارير من القائمة المحددة
  const handleReportSelection = (reportId) => {
    setSelectedReports(prevSelected => 
      // إذا كان التقرير موجوداً بالفعل، قم بإزالته
      // وإلا أضفه للقائمة
      prevSelected.includes(reportId)
        ? prevSelected.filter(id => id !== reportId)
        : [...prevSelected, reportId]
    );
  };

  // إنشاء محتوى نصي للمعاينة
  const generatePreviewContent = (reports) => {
    let previewText = "التقارير المحددة\n";
    previewText += "-------------------\n\n";

    // عرض كل التقارير المحددة
    reports.forEach(reportId => {
      const reportLabel = reportOptions.find(r => r.id === reportId)?.label || '';
      previewText += `${reportLabel}\n`;
    });

    return previewText;
  };

  // إنشاء معاينة للتقارير
  const createPreview = () => {
    // التأكد من وجود تقارير مختارة
    if (selectedReports.length === 0) return;

    // إنشاء نص المعاينة
    const previewText = generatePreviewContent(selectedReports);
    setPreviewContent(previewText);

    // إنشاء مستند Word
    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: generateReportContent(selectedReports)
      }]
    });

    // تحويل المستند إلى ملف قابل للتنزيل
    docx.Packer.toBlob(doc).then(blob => {
      setDocumentBlob(blob);
      setShowPreview(true);
    });
  };

  // دالة توليد محتوى التقارير (يمكن تخصيصها حسب احتياجاتك)
  const generateReportContent = (reports) => {
    // هذه الدالة يمكن تعديلها لإضافة محتوى فعلي للتقارير
    return reports.map(reportId => {
      const reportLabel = reportOptions.find(r => r.id === reportId)?.label || '';
      return new docx.Paragraph({
        text: `تقرير: ${reportLabel}`
      });
    });
  };

  // تنزيل المستند
  const downloadDocument = () => {
    if (documentBlob) {
      saveAs(documentBlob, 'التقارير.docx');
    }
  };

  // إغلاق نافذة المعاينة
  const closePreview = () => {
    setShowPreview(false);
    setPreviewContent('');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4 rtl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">توليد التقارير</h2>
      
      {/* قائمة اختيار التقارير */}
      <div className="space-y-2 mb-4">
        {reportOptions.map((report) => (
          <div 
            key={report.id} 
            className="flex items-center"
          >
            {/* مربع اختيار لكل تقرير */}
            <input
              type="checkbox"
              id={report.id}
              checked={selectedReports.includes(report.id)}
              onChange={() => handleReportSelection(report.id)}
              className="form-checkbox h-5 w-5 text-blue-600 ml-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label 
              htmlFor={report.id} 
              className="flex items-center text-gray-700"
            >
              <report.icon className="w-5 h-5 ml-2 text-blue-500" />
              {report.label}
            </label>
          </div>
        ))}
      </div>
      
      {/* أزرار المعاينة والتنزيل */}
      <div className="flex space-x-2 rtl:space-x-reverse">
        <button 
          onClick={createPreview} 
          disabled={selectedReports.length === 0}
          className={`flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse py-2 px-4 rounded-md transition-colors duration-300 ${
            selectedReports.length > 0 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span>معاينة التقرير</span>
        </button>
        
        <button 
          onClick={downloadDocument} 
          disabled={!documentBlob}
          className={`flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse py-2 px-4 rounded-md transition-colors duration-300 ${
            documentBlob 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          <Download className="w-5 h-5" />
          <span>تنزيل التقرير</span>
        </button>
      </div>

      {/* نافذة المعاينة */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-2xl max-h-[90vh] overflow-hidden">
            {/* رأس نافذة المعاينة */}
            <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-semibold text-gray-800">معاينة التقرير</h3>
              <button 
                onClick={closePreview}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* محتوى المعاينة */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm font-sans whitespace-pre-wrap break-words text-right">
                {previewContent}
              </pre>
            </div>

            {/* أزرار أسفل نافذة المعاينة */}
            <div className="bg-gray-100 p-4 flex justify-between items-center border-t">
              <button 
                onClick={downloadDocument}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>تنزيل</span>
              </button>
              <button 
                onClick={closePreview}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
                <span>إغلاق</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDownloader;