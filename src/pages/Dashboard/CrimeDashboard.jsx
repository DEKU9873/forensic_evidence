import React, { useState } from "react";
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
import { GiPistolGun } from "react-icons/gi"
import { GiSuicide } from "react-icons/gi"
import { GiDeathSkull } from "react-icons/gi"
import { FaPeopleRobbery } from "react-icons/fa6"
import { GiTakeMyMoney } from "react-icons/gi"
import { HiFire } from "react-icons/hi"
import { GiMineExplosion } from "react-icons/gi"

const CrimeDashboard = () => {
  // بيانات إحصائية افتراضية
  const [crimeData, setCrimeData] = useState([
    {
      id: 1,
      name: "انتحار",
      fullName: "انتحار",
      value: 124,
      color: "#ffff54",
      icon: <GiSuicide className="w-6 h-6 text-white" />,
    },
    {
      id: 2,
      name: "قتل",
      fullName: "قتل",
      value: 87,
      color: "#ff4c4c",
      icon: <GiPistolGun className="w-6 h-6 text-white" />,
    },
    {
      id: 3,
      name: "وفاة",
      fullName: "وفاة",
      value: 203,
      color: "#000",
      icon: <GiDeathSkull className="w-6 h-6 text-white" />,
    },
    {
      id: 4,
      name: "إرهاب",
      fullName: "إرهاب",
      value: 12,
      color: "#792da4",
      icon: <GiMineExplosion className="w-6 h-6 text-white" />,
    },
    {
      id: 5,
      name: "حريق",
      fullName: "حريق",
      value: 156,
      color: "#FFA500",
      icon: <HiFire className="w-6 h-6 text-white" />,
    },
    {
      id: 6,
      name: "سرقة",
      fullName: "سرقة",
      value: 428,
      color: "#578dff",
      icon: <GiTakeMyMoney className="w-6 h-6 text-white" />,
    },
    {
      id: 7,
      name: "سرقة بالإكراه",
      fullName: "سرقة بالإكراه",
      value: 189,
      color: "#40b07b",
      icon: <FaPeopleRobbery className="w-6 h-6 text-white" />,
    },
  ]);

  // كارت لعرض إحصائية واحدة
  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div
        className={`rounded-full p-3 ml-4`}
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

  // مكون مخصص للتسميات على محور Y
  const CustomizedYAxisTick = (props) => {
    const { x, y, payload } = props;

    // الحصول على البيانات المرتبطة بهذه التسمية
    const dataItem = crimeData.find((item) => item.fullName === payload.value);

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={-10}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#666"
          style={{ fontSize: "14px" }}
        >
          {dataItem ? dataItem.fullName : payload.value}
        </text>
      </g>
    );
  };

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

  return (
    <div className="bg-gray-100 p-6 min-h-screen" dir="rtl">
      <div className="container mx-auto">
        {/* العنوان والتاريخ */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              لوحة إحصائيات الجرائم
            </h1>
            {/* <p className="text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 ml-1" />
              ٦ مارس ٢٠٢٥
            </p> */}
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {crimeData.map((item) => (
            <StatCard
              key={item.id}
              title={`عدد جرائم ${item.fullName}`}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        {/* المخطط البياني الأفقي */}
        <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-hidden w-[98%]">
          <h2 className="text-xl font-bold mb-6">إحصائيات الجرائم</h2>
          <div className="h-80 w-[90%] ">
            <ResponsiveContainer width="120%" height="100%">
              <BarChart
                data={crimeData}
                layout="horizontal"
                barCategoryGap={15} // تحسين توزيع الأعمدة
                margin={{ top: 20, right: 30, left: 50, bottom: 50 }} // توسيع الهوامش
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="fullName"
                  angle={0} // جعل النصوص أفقية
                  textAnchor="middle"
                  height={50} // زيادة المساحة السفلية للنصوص
                  tick={{ fontSize: 10 }} // تصغير حجم النص
                  interval={0} // إظهار جميع التصنيفات
                  padding={{ left: 20, right: 20 }} // إضافة تباعد
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





// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts";
// import { GiPistolGun, GiSuicide, GiDeathSkull, GiTakeMyMoney, GiMineExplosion } from "react-icons/gi";
// import { FaPeopleRobbery } from "react-icons/fa6";
// import { HiFire } from "react-icons/hi";
// import { Calendar, Clock, TrendingUp, TrendingDown, Activity } from "lucide-react";

// const CrimeDashboard = () => {
//   // بيانات إحصائية افتراضية
//   const [crimeData, setCrimeData] = useState([
//     {
//       id: 1,
//       name: "انتحار",
//       fullName: "انتحار",
//       value: 124,
//       color: "#FFCC00",
//       icon: <GiSuicide className="w-6 h-6 text-white" />,
//       change: +5,
//     },
//     {
//       id: 2,
//       name: "قتل",
//       fullName: "قتل",
//       value: 87,
//       color: "#FF4D4F",
//       icon: <GiPistolGun className="w-6 h-6 text-white" />,
//       change: -3,
//     },
//     {
//       id: 3,
//       name: "وفاة",
//       fullName: "وفاة",
//       value: 203,
//       color: "#222222",
//       icon: <GiDeathSkull className="w-6 h-6 text-white" />,
//       change: +12,
//     },
//     {
//       id: 4,
//       name: "إرهاب",
//       fullName: "إرهاب",
//       value: 12,
//       color: "#722ED1",
//       icon: <GiMineExplosion className="w-6 h-6 text-white" />,
//       change: -2,
//     },
//     {
//       id: 5,
//       name: "حريق",
//       fullName: "حريق",
//       value: 156,
//       color: "#FA8C16",
//       icon: <HiFire className="w-6 h-6 text-white" />,
//       change: +9,
//     },
//     {
//       id: 6,
//       name: "سرقة",
//       fullName: "سرقة",
//       value: 428,
//       color: "#1890FF",
//       icon: <GiTakeMyMoney className="w-6 h-6 text-white" />,
//       change: +15,
//     },
//     {
//       id: 7,
//       name: "سرقة بالإكراه",
//       fullName: "سرقة بالإكراه",
//       value: 189,
//       color: "#52C41A",
//       icon: <FaPeopleRobbery className="w-6 h-6 text-white" />,
//       change: -7,
//     },
//   ]);

//   const totalCrimes = crimeData.reduce((sum, item) => sum + item.value, 0);
//   const maxCrime = crimeData.reduce((max, item) => (max.value > item.value ? max : item), crimeData[0]);
//   const minCrime = crimeData.reduce((min, item) => (min.value < item.value ? min : item), crimeData[0]);
  
//   // كارت لعرض إحصائية واحدة
//   const StatCard = ({ title, value, icon, color, change }) => (
//     <div className="bg-white rounded-lg shadow-lg p-4 flex items-center transition-all duration-300 hover:shadow-xl border-r-4" style={{ borderRightColor: color }}>
//       <div
//         className="rounded-full p-3 ml-4 flex items-center justify-center"
//         style={{ backgroundColor: color }}
//       >
//         {icon}
//       </div>
//       <div className="flex-1 text-right">
//         <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
//         <div className="flex justify-between items-center">
//           <div className={`flex items-center ${change > 0 ? 'text-red-500' : 'text-green-500'}`}>
//             {change > 0 ? <TrendingUp className="w-4 h-4 ml-1" /> : <TrendingDown className="w-4 h-4 ml-1" />}
//             <span className="text-xs">{Math.abs(change)}%</span>
//           </div>
//           <p className="text-2xl font-bold" style={{ color }}>{value}</p>
//         </div>
//       </div>
//     </div>
//   );

//   // مكون مخصص للتلميح (Tooltip)
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div
//           className="bg-white p-3 border border-gray-200 shadow-md text-right rounded-md"
//           style={{ direction: "rtl" }}
//         >
//           <p className="font-bold text-lg" style={{ color: data.color }}>{data.fullName}</p>
//           <p className="text-gray-700">العدد: {data.value}</p>
//           <p className="text-gray-700">النسبة: {((data.value / totalCrimes) * 100).toFixed(1)}%</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-gray-50 p-6 min-h-screen" dir="rtl">
//       <div className="container mx-auto">
//         {/* العنوان والتاريخ */}
//         <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               لوحة إحصائيات الجرائم
//             </h1>
//             <p className="text-gray-600 flex items-center">
//               <Calendar className="w-4 h-4 ml-1" />
//               ٦ مارس ٢٠٢٥
//             </p>
//           </div>
//           <div className="flex items-center bg-blue-50 p-3 rounded-lg">
//             <Activity className="w-6 h-6 text-blue-600 ml-2" />
//             <div>
//               <p className="text-sm text-gray-600">إجمالي الجرائم</p>
//               <p className="text-2xl font-bold text-blue-600">{totalCrimes}</p>
//             </div>
//           </div>
//         </div>

//         {/* الإحصائيات الرئيسية */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//           {crimeData.map((item) => (
//             <StatCard
//               key={item.id}
//               title={`${item.fullName}`}
//               value={item.value}
//               icon={item.icon}
//               color={item.color}
//               change={item.change}
//             />
//           ))}
//         </div>

//         {/* إحصائيات إضافية */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500 transition-all duration-300 hover:shadow-xl">
//             <h2 className="text-xl font-bold mb-4 text-gray-700">إجمالي الجرائم</h2>
//             <p className="text-4xl font-bold text-blue-600">{totalCrimes}</p>
//             <p className="text-gray-500 mt-2">حالة مسجلة</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-lg border-t-4" style={{ borderTopColor: maxCrime.color, transition: "all 0.3s ease" }}>
//             <h2 className="text-xl font-bold mb-4 text-gray-700">الجريمة الأكثر</h2>
//             <div className="flex items-center">
//               <div
//                 className="rounded-full p-2 ml-3"
//                 style={{ backgroundColor: maxCrime.color }}
//               >
//                 {maxCrime.icon}
//               </div>
//               <div>
//                 <p className="text-xl font-bold" style={{ color: maxCrime.color }}>
//                   {maxCrime.fullName}
//                 </p>
//                 <p className="text-gray-500">{maxCrime.value} حالة</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-lg border-t-4" style={{ borderTopColor: minCrime.color, transition: "all 0.3s ease" }}>
//             <h2 className="text-xl font-bold mb-4 text-gray-700">الجريمة الأقل</h2>
//             <div className="flex items-center">
//               <div
//                 className="rounded-full p-2 ml-3"
//                 style={{ backgroundColor: minCrime.color }}
//               >
//                 {minCrime.icon}
//               </div>
//               <div>
//                 <p className="text-xl font-bold" style={{ color: minCrime.color }}>
//                   {minCrime.fullName}
//                 </p>
//                 <p className="text-gray-500">{minCrime.value} حالة</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* المخططات البيانية */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* المخطط البياني الأفقي */}
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
//             <h2 className="text-xl font-bold mb-6 text-gray-700 border-r-4 border-blue-500 pr-3">إحصائيات الجرائم</h2>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={crimeData}
//                   layout="vertical"
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis type="number" />
//                   <YAxis 
//                     dataKey="fullName" 
//                     type="category" 
//                     width={100} 
//                     tick={{ fontSize: 12 }}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend />
//                   <Bar dataKey="value" name="العدد">
//                     {crimeData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* مخطط دائري */}
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
//             <h2 className="text-xl font-bold mb-6 text-gray-700 border-r-4 border-blue-500 pr-3">توزيع الجرائم</h2>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={crimeData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={80}
//                     outerRadius={120}
//                     fill="#8884d8"
//                     paddingAngle={2}
//                     dataKey="value"
//                     labelLine={false}
//                   >
//                     {crimeData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend
//                     layout="horizontal"
//                     verticalAlign="bottom"
//                     align="center"
//                     formatter={(value, entry, index) => crimeData[index].fullName}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* مخطط راداري */}
//         <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
//           <h2 className="text-xl font-bold mb-6 text-gray-700 border-r-4 border-blue-500 pr-3">مقارنة أنواع الجرائم</h2>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={crimeData}>
//                 <PolarGrid stroke="#e0e0e0" />
//                 <PolarAngleAxis dataKey="fullName" />
//                 <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
//                 <Radar
//                   name="قيمة الجرائم"
//                   dataKey="value"
//                   stroke="#1890FF"
//                   fill="#1890FF"
//                   fillOpacity={0.6}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* ملخص تحليلي */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-gray-700 border-r-4 border-blue-500 pr-3">التحليل الإحصائي</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-lg font-bold mb-2 text-gray-600">المؤشرات الرئيسية</h3>
//               <ul className="list-disc list-inside space-y-2 text-gray-700 pr-4">
//                 <li>تشكل جرائم <span className="font-bold" style={{ color: maxCrime.color }}>{maxCrime.fullName}</span> النسبة الأعلى بـ {((maxCrime.value / totalCrimes) * 100).toFixed(1)}% من مجموع الجرائم</li>
//                 <li>تشكل جرائم <span className="font-bold" style={{ color: minCrime.color }}>{minCrime.fullName}</span> النسبة الأقل بـ {((minCrime.value / totalCrimes) * 100).toFixed(1)}% من مجموع الجرائم</li>
//                 <li>متوسط الجرائم المسجلة: {Math.round(totalCrimes / crimeData.length)} لكل نوع</li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-bold mb-2 text-gray-600">اتجاهات ومؤشرات</h3>
//               <ul className="list-disc list-inside space-y-2 text-gray-700 pr-4">
//                 <li>ارتفاع في نسبة جرائم السرقة بمعدل {crimeData.find(c => c.name === "سرقة")?.change}%</li>
//                 <li>انخفاض في جرائم السرقة بالإكراه بنسبة {Math.abs(crimeData.find(c => c.name === "سرقة بالإكراه")?.change)}%</li>
//                 <li>مجموع الجرائم العنيفة: {crimeData.filter(c => ["قتل", "إرهاب", "سرقة بالإكراه"].includes(c.name)).reduce((sum, item) => sum + item.value, 0)} حالة</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CrimeDashboard;
