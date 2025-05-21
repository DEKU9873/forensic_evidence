import React, { useState } from 'react';
import ExcelReport from './ExcelReport';
import PdfReport from './PDFReport';
import WordReport from './WordReport';



const DropdownReport = ({excel}) => {
  const [selectedReport, setSelectedReport] = useState('');

  const handleChange = (e) => {
    setSelectedReport(e.target.value);
  };

  // دالة لعرض المكون حسب الاختيار
  const renderReportComponent = () => {
    switch (selectedReport) {
      case 'excel':
        return <ExcelReport />;
      case 'word':
        return <WordReport />;
      case 'pdf':
        return <PdfReport />;
     
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <label htmlFor="reportDropdown" className="block mb-2 text-sm font-medium text-gray-700">
        اختر التقرير:
      </label>
      <select
        id="reportDropdown"
        className="w-full p-2 border border-gray-300 rounded-md"
        onChange={handleChange}
        value={selectedReport}
      >
        <option value="">-- اختر تقريرًا --</option>
        <option value="excel">تقرير اكسل</option>
        <option value="word">تقرير وورد</option>
        <option value="pdf">تقرير PDF</option>
      </select>

      <div className="mt-4">
        {renderReportComponent()}
      </div>
    </div>
  );
};

export default DropdownReport;
