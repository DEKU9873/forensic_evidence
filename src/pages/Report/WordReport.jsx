import React from 'react';
import StatisticsHook from '../../hook/ReceivingDeliveringSamples/statistics-hook';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  TextRun,
  BorderStyle,
  VerticalAlign,
} from 'docx';
import { saveAs } from 'file-saver';

const WordReport = () => {
  const [statistics, loading] = StatisticsHook();

  const generateDoc = async () => {
    try {
      // if (!statistics?.data || statistics.data.length === 0) {
      //   alert("لا توجد بيانات لعرضها");
      //   return;
      // }

      // إنشاء صفوف الجدول
    const tableRows = [
  // الصف الأول - رؤوس الأعمدة
  new TableRow({
    tableHeader: true,
    children: [
     
      new TableCell({
        children: [new Paragraph({ text: "نوع الحادث", alignment: "center" })],
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: "D9D9D9" },
      }),
      new TableCell({
        children: [new Paragraph({ text: "المدينة الأكثر تكراراً", alignment: "center" })],
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: "D9D9D9" },
      }),
      new TableCell({
        children: [new Paragraph({ text: "عدد الحالات", alignment: "center" })],
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: "D9D9D9" },
      }),

       new TableCell({
        children: [new Paragraph({ text: "ت", alignment: "center" })],
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: "D9D9D9" },
      }),
    ],
  }),

  // الصفوف التالية - البيانات
  ...statistics.map((item, index) =>
    new TableRow({
      children: [

        new TableCell({
          children: [
            new Paragraph({
              text: item.typeAccident || '',
              alignment: "center",
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: item.most_common_city || 'لا توجد',
              alignment: "center",
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: item.count.toString(),
              alignment: "center",
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),

                new TableCell({
          children: [
            new Paragraph({
              text: (index + 1).toString(),
              alignment: "center",
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
      ],
    })
  ),
];

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "تقرير الإحصائيات",
              bold: true,
              size: 28,
              font: "Arial",
            }),
          ],
          alignment: "center",
          spacing: { after: 300 },
          bidirectional: true,
        }),
        new Table({
          rows: tableRows,
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          },
        }),
      ],
    },
  ],
});


      // إنشاء الملف وتحميله
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "تقرير_الحوادث.docx");
    } catch (error) {
      console.error("خطأ في توليد الملف:", error);
      alert("حدث خطأ أثناء إنشاء الملف.");
    }
  };

  return (
   <div style={{ padding: "20px" }}>
      <button onClick={generateDoc} disabled={loading}>
        {loading ? "جاري التحميل..." : "تصدير إلى Word"}
      </button>

      {/* جدول العرض في الصفحة */}
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

export default WordReport;
