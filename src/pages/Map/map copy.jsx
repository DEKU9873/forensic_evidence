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

  // قائمة ثابتة بأنواع الجرائم المعتمدة
  const crimeTypes = [
    {
      type: "murder",
      name: "جريمة قتل",
      icon: <GiPistolGun className="w-6 h-6 text-white" />,
      color: "#ff4c4c",
    },
    {
      type: "suicide",
      name: "انتحار",
      icon: <GiSuicide className="w-6 h-6 text-white" />,
      color: "#ffff54",
    },
    {
      type: "die",
      name: "وفاة",
      icon: <GiDeathSkull className="w-6 h-6 text-white" />,
      color: "#000",
    },
    {
      type: "theft",
      name: "سرقة",
      icon: <GiTakeMyMoney className="w-6 h-6 text-white" />,
      color: "#578dff",
    },
    {
      type: "robbery",
      name: "سرقة بالإكراه",
      icon: <FaPeopleRobbery className="w-6 h-6 text-white" />,
      color: "#40b07b",
    },
    {
      type: "fire",
      name: "حريق",
      icon: <HiFire className="w-6 h-6 text-white" />,
      color: "#FFA500",
    },
    {
      type: "terror",
      name: "انفجار إرهابي",
      icon: <GiMineExplosion className="w-6 h-6 text-white" />,
      color: "#792da4",
    },
  ];

  // تحويل typeAccident من API إلى النوع المطابق في قائمتنا
  const typeMapping = {
    crime: "theft", // افتراضياً نعتبر "crime" كسرقة
    die: "die",
    suicide: "suicide",
    murder: "murder",
    terror: "terror",
    fire: "fire",
    theft: "theft",
    robbery: "robbery",
  };

  // معالجة البيانات القادمة من الـ hook
  const getCrimeData = () => {
    if (!statistics || !statistics.incident_type_counts) {
      return [];
    }

    // تحويل البيانات إلى الصيغة المطلوبة
    return statistics.incident_type_counts.map((item, index) => {
      const mappedType = typeMapping[item.typeAccident] || item.typeAccident;
      const crimeInfo = crimeTypes.find(crime => crime.type === mappedType) || {
        type: item.typeAccident,
        name: item.typeAccident,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        icon: <GiDeathSkull className="w-6 h-6 text-white" />,
      };
      
      return {
        id: index + 1,
        name: crimeInfo.name,
        fullName: crimeInfo.name,
        value: item.count,
        color: crimeInfo.color,
        icon: crimeInfo.icon,
        typeAccident: item.typeAccident,
      };
    });
  };

  const crimeData = getCrimeData();

  // كارت لعرض إحصائية واحدة
  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div
        className="rounded-full p-3 ml-4"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="flex-1 text-right">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
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
          <p className="font-bold">{data.fullName}</p>
          <p className="text-gray-700">العدد: {data.value}</p>
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

  // حالة عدم وجود بيانات
  if (!crimeData || crimeData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">لا توجد بيانات متاحة</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 min-h-screen" dir="rtl">
      <div className="container mx-auto">
        {/* العنوان والتاريخ */}
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
              title={`عدد ${item.fullName}`}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        {/* المخطط البياني الأفقي */}
        <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-hidden w-full">
          <h2 className="text-xl font-bold mb-6">إحصائيات الجرائم</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={crimeData}
                layout="horizontal"
                barCategoryGap={15}
                margin={{ top: 20, right: 30, left: 30, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="fullName"
                  angle={0}
                  textAnchor="middle"
                  height={50}
                  tick={{ fontSize: 12 }}
                  interval={0}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis padding={{ top: 10, bottom: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="العدد">
                  {crimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* إحصائيات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">إجمالي الجرائم</h2>
            <p className="text-3xl font-bold text-blue-600">
              {crimeData.reduce((sum, item) => sum + item.value, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">الجريمة الأكثر</h2>
            <p
              className="text-xl font-bold"
              style={{
                color: crimeData.reduce(
                  (max, item) => (max.value > item.value ? max : item),
                  crimeData[0]
                ).color,
              }}
            >
              {
                crimeData.reduce(
                  (max, item) => (max.value > item.value ? max : item),
                  crimeData[0]
                ).fullName
              }
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">الجريمة الأقل</h2>
            <p
              className="text-xl font-bold"
              style={{
                color: crimeData.reduce(
                  (min, item) => (min.value < item.value ? min : item),
                  crimeData[0]
                ).color,
              }}
            >
              {
                crimeData.reduce(
                  (min, item) => (min.value < item.value ? min : item),
                  crimeData[0]
                ).fullName
              }
            </p>
          </div>
        </div>

        {/* مخطط دائري مبسط */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-6">توزيع الجرائم</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={crimeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {crimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value, entry, index) => crimeData[index].fullName}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeDashboard;