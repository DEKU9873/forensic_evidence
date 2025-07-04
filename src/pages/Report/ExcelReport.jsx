import React from "react";
import StatisticsHook from "../../hook/ReceivingDeliveringSamples/statistics-hook";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExcelReport = () => {
  const [statistics, loading] = StatisticsHook();

  const generateExcel = async () => {
    try {
      // if (!statistics?.data || statistics.length === 0) {
      //   alert("لا توجد بيانات لعرضها");
      //   return;
      // }

      const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("تقرير الحوادث", {
  views: [{ rightToLeft: true }],
});
      // العنوان الرئيسي
      worksheet.mergeCells("A1:D1");
      const titleCell = worksheet.getCell("A1");
      titleCell.value = "تقرير الإحصائيات";
      titleCell.alignment = { vertical: "middle", horizontal: "center" };
      titleCell.font = { bold: true, size: 16 };
      titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9D9D9" },
      };

      // رؤوس الأعمدة
      const headerRow = worksheet.addRow([
        "ت",
        "نوع الحادث",
        "المدينة الأكثر تكراراً",
        "عدد الحالات",
      ]);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFD9D9D9" },
        };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // البيانات
      statistics.forEach((item, index) => {
        worksheet.addRow([
          index + 1,
          item.typeAccident || "",
          item.most_common_city || "لا توجد",
          item.count,
        ]);
      });

      // تنسيق الأعمدة
      worksheet.columns = [
        { width: 5 },
        { width: 20 },
        { width: 25 },
        { width: 15 },
      ];

      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      // إنشاء الملف وتحميله
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "تقرير_الحوادث.xlsx");
    } catch (error) {
      console.error("خطأ في توليد الملف:", error);
      alert("حدث خطأ أثناء إنشاء الملف.");
    }
  };

  return (
   <div style={{ padding: "20px" }}>
      <button onClick={generateExcel} disabled={loading}>
        {loading ? "جاري التحميل..." : "تصدير إلى Excel"}
      </button>

      {/* جدول معاينة البيانات */}
      <table
        style={{
          marginTop: 20,
          borderCollapse: "collapse",
          width: "100%",
          direction: "rtl",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
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
          {statistics && statistics.length > 0 ? (
            statistics.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "8px" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>{item.typeAccident || "-"}</td>
                <td style={{ padding: "8px" }}>{item.most_common_city || "لا توجد"}</td>
                <td style={{ padding: "8px" }}>{item.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: "8px" }}>
                لا توجد بيانات لعرضها
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelReport;
