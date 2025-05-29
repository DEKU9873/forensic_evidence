import React, { useState } from "react";
import ExcelReport from "./ExcelReport";
import PdfReport from "./PDFReport";
import WordReport from "./WordReport";

const DropdownReport = () => {
  const [selectedReport, setSelectedReport] = useState("");

  const handleChange = (e) => {
    setSelectedReport(e.target.value);
  };

  const renderReportComponent = () => {
    switch (selectedReport) {
      case "excel":
        return <ExcelReport />;
      case "word":
        return <WordReport />;
      case "pdf":
        return <PdfReport />;
      default:
        return null;
    }
  };

  return (
    <div>
      <select
        id="reportDropdown"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        value={selectedReport}
      >
        <option value=""> اختر نوع التقرير</option>
        <option value="excel">تقرير Excel</option>
        <option value="word">تقرير Word</option>
        <option value="pdf">تقرير PDF</option>
      </select>

      <div className="mt-4">{renderReportComponent()}</div>
    </div>
  );
};

export default DropdownReport;
