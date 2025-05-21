import React, { useRef } from 'react';
import StatisticsHook from '../../hook/ReceivingDeliveringSamples/statistics-hook';
import html2pdf from 'html2pdf.js';

const PDFReport = () => {
  const [statistics, loading] = StatisticsHook();
  const reportRef = useRef();

  const handleExportPDF = () => {
    if (!reportRef.current) return;

    const opt = {
      margin: 0.5,
      filename: 'تقرير_الإحصائيات.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(reportRef.current).save();
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={handleExportPDF}
        disabled={loading || !statistics?.length}
        style={{
          padding: "10px 20px",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "جاري التحميل..." : "تصدير إلى PDF"}
      </button>

      {/* جدول معاينة البيانات */}
      <div
        ref={reportRef}
        style={{
          direction: "rtl",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: "#f3f4f6",
        }}
      >
        {(!loading && Array.isArray(statistics) && statistics.length > 0) ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
            border="1"
          >
            <thead style={{ backgroundColor: "#D9D9D9" }}>
              <tr>
                <th style={{ padding: "8px" }}>ت</th>
                <th style={{ padding: "8px" }}>نوع الحادث</th>
                <th style={{ padding: "8px" }}>المدينة الأكثر تكراراً</th>
                <th style={{ padding: "8px" }}>عدد الحالات</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px" }}>{index + 1}</td>
                  <td style={{ padding: "8px" }}>{item.typeAccident || '-'}</td>
                  <td style={{ padding: "8px" }}>{item.most_common_city || 'لا توجد'}</td>
                  <td style={{ padding: "8px" }}>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            لا توجد بيانات لعرضها
          </p>
        )}
      </div>
    </div>
  );
};

export default PDFReport;
