import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "leaflet/dist/leaflet.css";
import { GiPistolGun } from "react-icons/gi";
import { GiSuicide } from "react-icons/gi";
import { GiDeathSkull } from "react-icons/gi";
import { FaPeopleRobbery } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiFire } from "react-icons/hi";
import { GiMineExplosion } from "react-icons/gi";
import StatisticsHook from "../../hook/ReceivingDeliveringSamples/statistics-hook";

const CrimeDashboard = () => {
  const [statistics, loading] = StatisticsHook();

  // تهيئة مجموعة ثابتة من أنواع الجرائم مع الألوان والأيقونات المحددة
  const crimeDefinitions = [
    {
      id: 1,
      type: "murder",
      name: "جريمة قتل",
      icon: <GiPistolGun className="w-6 h-6 text-white" />,
      color: "#ff4c4c",
    },
    {
      id: 2,
      type: "suicide",
      name: "انتحار",
      icon: <GiSuicide className="w-6 h-6 text-white" />,
      color: "#ffff54",
    },
    {
      id: 3,
      type: "die",
      name: "وفاة",
      icon: <GiDeathSkull className="w-6 h-6 text-white" />,
      color: "#000",
    },
    {
      id: 4,
      type: "theft",
      name: "سرقة",
      icon: <GiTakeMyMoney className="w-6 h-6 text-white" />,
      color: "#578dff",
    },
    {
      id: 5,
      type: "robbery",
      name: "سرقة بالإكراه",
      icon: <FaPeopleRobbery className="w-6 h-6 text-white" />,
      color: "#40b07b",
    },
    {
      id: 6,
      type: "fire",
      name: "حريق",
      icon: <HiFire className="w-6 h-6 text-white" />,
      color: "#FFA500",
    },
    {
      id: 7,
      type: "terror",
      name: "انفجار إرهابي",
      icon: <GiMineExplosion className="w-6 h-6 text-white" />,
      color: "#792da4",
    },
  ];

  // معالجة البيانات القادمة من الـ hook
  const getCrimeData = () => {
    if (!statistics || !statistics.incident_type_counts) {
      // إذا لم تكن البيانات متاحة، نعرض جميع أنواع الجرائم بقيمة صفر
      return crimeDefinitions.map((crime) => ({
        ...crime,
        value: 0,
      }));
    }

    console.log("Raw API data:", statistics.incident_type_counts);

    // إنشاء نسخة من تعريفات الجرائم للعمل عليها
    const resultData = [...crimeDefinitions];

    // خريطة لتحويل أنواع الحوادث العربية إلى الأنواع المحددة في التعريفات
    const arabicToTypeMapping = {
      "جريمة قتل": "murder",
      انتحار: "suicide",
      وفاة: "die",
      سرقة: "theft",
      "سرقة بالإكراه": "robbery",
      حريق: "fire",
      "انفجار إرهابي": "terror",
    };

    // تحديث القيم بناءً على البيانات الواردة
    statistics.incident_type_counts.forEach((item) => {
      const mappedType = arabicToTypeMapping[item.typeAccident];

      if (mappedType) {
        const crimeIndex = resultData.findIndex(
          (crime) => crime.type === mappedType
        );

        if (crimeIndex !== -1) {
          resultData[crimeIndex].value = parseInt(item.count) || 0;
        }
      } else {
        console.warn(`نوع الحادثة غير معروف: ${item.typeAccident}`);
      }
    });

    console.log("Processed data:", resultData);
    return resultData;
  };

  const crimeData = getCrimeData();

  // كارت لعرض إحصائية واحدة
  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div className="rounded-full p-3 ml-4" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="flex-1 text-right">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value || 0}</p>
      </div>
    </div>
  );

  // مكون مخصص للتلميح (Tooltip)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="bg-white p-3 border border-gray-200 shadow-md text-right"
          style={{ direction: "rtl" }}
        >
          <p className="font-bold">{data.name}</p>
          <p className="text-gray-700">العدد: {data.value || 0}</p>
        </div>
      );
    }
    return null;
  };

  // حالة التحميل
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 min-h-screen" dir="rtl">
      <div className="container mx-auto">
        {/* العنوان */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              لوحة إحصائيات الجرائم
            </h1>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {crimeData.map((item) => (
            <StatCard
              key={item.id}
              title={`عدد ${item.name}`}
              value={item.value || 0}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        {/* المخطط البياني العمودي */}
        <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-hidden w-full">
          <h2 className="text-xl font-bold mb-6">إحصائيات الجرائم</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={crimeData.filter((item) => item.value !== undefined)}
                barCategoryGap={15}
                margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={0}
                  textAnchor="end"
                  height={70}
                />
                <YAxis
                  type="number"
                  domain={[0, "dataMax + 1"]}
                  allowDecimals={false}
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="العدد" minPointSize={3}>
                  {crimeData.map((entry) => (
                    <Cell key={`cell-${entry.id}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* إحصائيات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">إجمالي الحوادث</h2>
            <p className="text-3xl font-bold text-blue-600">
              {crimeData.reduce((sum, item) => sum + (item.value || 0), 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">الحادثة الأكثر</h2>
            {crimeData.some((item) => (item.value || 0) > 0) ? (
              <p
                className="text-xl font-bold"
                style={{
                  color: crimeData.reduce(
                    (max, item) =>
                      (max.value || 0) > (item.value || 0) ? max : item,
                    crimeData[0]
                  ).color,
                }}
              >
                {
                  crimeData.reduce(
                    (max, item) =>
                      (max.value || 0) > (item.value || 0) ? max : item,
                    crimeData[0]
                  ).name
                }
              </p>
            ) : (
              <p className="text-xl text-gray-500">لا توجد بيانات</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">الحادثة الأقل</h2>
            {crimeData.some((item) => (item.value || 0) > 0) ? (
              <p
                className="text-xl font-bold"
                style={{
                  color: crimeData
                    .filter((item) => (item.value || 0) > 0)
                    .reduce(
                      (min, item) =>
                        (min.value || 0) < (item.value || 0) ? min : item,
                      crimeData.find((item) => (item.value || 0) > 0) ||
                        crimeData[0]
                    ).color,
                }}
              >
                {
                  crimeData
                    .filter((item) => (item.value || 0) > 0)
                    .reduce(
                      (min, item) =>
                        (min.value || 0) < (item.value || 0) ? min : item,
                      crimeData.find((item) => (item.value || 0) > 0) ||
                        crimeData[0]
                    ).name
                }
              </p>
            ) : (
              <p className="text-xl text-gray-500">لا توجد بيانات</p>
            )}
          </div>
        </div>

        {/* مخطط دائري */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-6">توزيع الحوادث</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={crimeData.filter((item) => (item.value || 0) > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {crimeData.map((entry) => (
                    <Cell key={`cell-${entry.id}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeDashboard;
