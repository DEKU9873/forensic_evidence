import React, { useState, useEffect } from "react";
import {
  GiPistolGun,
  GiBurningSkull,
  GiMagnifyingGlass,
  GiOverkill,
  GiArson,
  GiFireZone,
  GiCarDoor,
  GiFireBomb,
  GiSuicide,
  GiDeathSkull,
} from "react-icons/gi";
import { TbShieldQuestion } from "react-icons/tb";
import { FaPeopleRobbery } from "react-icons/fa6";
import { GiMineExplosion } from "react-icons/gi";
import { FaLockOpen } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Sector,
} from "recharts";
import StatisticsHook from "../../hook/ReceivingDeliveringSamples/statistics-hook";
import DropdownReport from "../Report/DropdownReport";

const StatisticsDashboard = () => {
  const [statistics, loading] = StatisticsHook();

  const [totalCrimes, setTotalCrimes] = useState(0);
  const [mostCommonCrime, setMostCommonCrime] = useState(null);
  const [leastCommonCrime, setLeastCommonCrime] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!loading && statistics && statistics.length > 0) {
      // Calculate total crimes
      const total = statistics.reduce((sum, item) => sum + item.count, 0);
      setTotalCrimes(total);

      // Find most common crime
      const sortedByCount = [...statistics].sort((a, b) => b.count - a.count);
      setMostCommonCrime(sortedByCount[0]);

      // Find least common crime
      const nonZeroCrimes = sortedByCount.filter((crime) => crime.count > 0);
      setLeastCommonCrime(
        nonZeroCrimes.length > 0
          ? nonZeroCrimes[nonZeroCrimes.length - 1]
          : null
      );
    }
  }, [statistics, loading]);

  const crimeDefinitions = [
    {
      id: 1,
      type: "killing",
      name: "قتل",
      icon: <GiPistolGun className="w-6 h-6 text-white" />,
      color: "#ff4c4c",
    },
    {
      id: 2,
      type: "murder associated with fire",
      name: "قتل مقترن بحريق",
      icon: <GiBurningSkull className="w-6 h-6 text-white" />,
      color: "#ff4c4c",
    },
    {
      id: 3,
      type: "suspected suicide",
      name: "أنتحار مشتبه به",
      icon: <GiMagnifyingGlass className="w-6 h-6 text-white" />,
      color: "#ffff54",
    },
    {
      id: 4,
      type: "suicide",
      name: "أنتحار",
      icon: <GiSuicide className="w-6 h-6 text-white" />,
      color: "#ffff54",
    },
    {
      id: 5,
      type: "Suspected death",
      name: "وفاه مشتبه بها",
      icon: <GiOverkill className="w-6 h-6 text-white" />,
      color: "#000000",
    },
    {
      id: 6,
      type: "theft",
      name: "سرقة",
      icon: <FaLockOpen className="w-6 h-6 text-white" />,
      color: "#578dff",
    },
    {
      id: 7,
      type: "robbery",
      name: "سرقة بالاكراه",
      icon: <FaPeopleRobbery className="w-6 h-6 text-white" />,
      color: "#578dff",
    },
    {
      id: 8,
      type: "theft coupled with fire",
      name: "سرقة مقترنة بحريق",
      icon: <GiArson className="w-6 h-6 text-white" />,
      color: "#578dff",
    },
    {
      id: 9,
      type: "fire",
      name: "حادث حريق",
      icon: <GiFireZone className="w-6 h-6 text-white" />,
      color: "#ff6333",
    },
    {
      id: 10,
      type: "wheel fire",
      name: "حريق عجلة",
      icon: <GiCarDoor className="w-6 h-6 text-white" />,
      color: "#ff6333",
    },
    {
      id: 11,
      type: "explosion (terrorist act)",
      name: "انفجار(عمل ارهابي)",
      icon: <GiFireBomb className="w-6 h-6 text-white" />,
      color: "#ffe840",
    },
    {
      id: 12,
      type: "explosion",
      name: "انفجار",
      icon: <GiMineExplosion className="w-6 h-6 text-white" />,
      color: "#ffe840",
    },
    {
      id: 13,
      type: "Examination of the body",
      name: "كشف على الجثة",
      icon: <GiDeathSkull className="w-6 h-6 text-white" />,
      color: "#4a148c",
    },
    {
      id: 14,
      type: "Other",
      name: "أخرى",
      icon: <TbShieldQuestion className="w-6 h-6 text-white" />,
      color: "#984c2b",
    },
  ];

  // Find the icon and color for a crime type
  const getCrimeInfo = (crimeType) => {
    const crime = crimeDefinitions.find((item) => item.name === crimeType);
    return (
      crime || {
        icon: <TbShieldQuestion className="w-6 h-6 text-white" />,
        color: "#984c2b",
      }
    );
  };

  // Prepare data for charts
  const chartData =
    !loading && statistics
      ? statistics
          ?.map((stat) => ({
            name: stat.typeAccident,
            value: stat.count,
            color: getCrimeInfo(stat.typeAccident).color,
            percentage:
              totalCrimes > 0
                ? ((stat.count / totalCrimes) * 100).toFixed(1)
                : 0,
          }))
          .sort((a, b) => b.value - a.value)
      : [];

  // Custom active sector for PieChart
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${value} حالة`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(1)}%)`}
        </text>
      </g>
    );
  };

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-bold text-lg mb-1">{data.name}</p>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: data.color }}
            ></div>
            <p className="text-sm">{`${data.value} حالة (${data.percentage}%)`}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Custom label for bar chart
  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <text
        x={x + width - 5}
        y={y + height / 2}
        fill="#000"
        textAnchor="end"
        dominantBaseline="middle"
      >
        {value}
      </text>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        لوحة إحصائيات الجرائم
      </h1>
      <DropdownReport />

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">إجمالي الجرائم</h2>
          <p className="text-4xl font-bold text-blue-600">{totalCrimes}</p>
        </div>

        {mostCommonCrime && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              الجريمة الأكثر شيوعاً
            </h2>
            <div className="flex items-center">
              {/* <div
                className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
                style={{
                  backgroundColor: getCrimeInfo(mostCommonCrime.typeAccident)
                    .color,
                }}
              >
                {getCrimeInfo(mostCommonCrime.typeAccident).icon}
              </div> */}
              <div>
                <p className="text-xl font-bold">
                  {mostCommonCrime.typeAccident}
                </p>
                <p className="text-sm">عدد الحالات: {mostCommonCrime.count}</p>
                {mostCommonCrime.most_common_city && (
                  <p className="text-sm">
                    المدينة الأكثر تسجيلاً: {mostCommonCrime.most_common_city}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {leastCommonCrime && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">الجريمة الأقل شيوعاً</h2>
            <div className="flex items-center">
              {/* <div
                className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
                style={{
                  backgroundColor: getCrimeInfo(leastCommonCrime.typeAccident)
                    .color,
                }}
              >
                {getCrimeInfo(leastCommonCrime.typeAccident).icon}
              </div> */}
              <div>
                <p className="text-xl font-bold">
                  {leastCommonCrime.typeAccident}
                </p>
                <p className="text-sm">عدد الحالات: {leastCommonCrime.count}</p>
                {leastCommonCrime.most_common_city && (
                  <p className="text-sm">
                    المدينة الأكثر تسجيلاً: {leastCommonCrime.most_common_city}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-center">
            توزيع الجرائم (مخطط دائري)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  onMouseEnter={onPieEnter}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value} حالة (${props.payload.percentage}%)`,
                    name,
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    padding: "10px",
                    textAlign: "right",
                    direction: "rtl",
                  }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ paddingLeft: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-center">
            عدد حالات كل جريمة
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData.slice(0, 10)} // Show top 10 for better visibility
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" tickFormatter={(value) => value} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  tick={{ fontSize: 12, textAnchor: "start", direction: "rtl" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{
                    paddingBottom: "10px",
                    textAlign: "center",
                  }}
                />
                <Bar
                  dataKey="value"
                  name="عدد الحالات"
                  barSize={24}
                  radius={[0, 4, 4, 0]}
                >
                  {chartData.slice(0, 10).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="right"
                    content={renderCustomizedLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {chartData.length > 10 && (
            <div className="text-center mt-2 text-gray-500 text-sm">
              * يتم عرض أعلى 10 جرائم فقط للوضوح
            </div>
          )}
        </div>
      </div>

      {/* Detailed Statistics Table */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          تفاصيل إحصائيات الجرائم
        </h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-right">نوع الجريمة</th>
              {/* <th className="py-3 px-4 border-b text-right">الفئة</th> */}
              <th className="py-3 px-4 border-b text-right">
                المدينة الأكثر تسجيلاً
              </th>
              <th className="py-3 px-4 border-b text-right">النسبة المئوية</th>
              <th className="py-3 px-4 border-b text-right">عدد الحالات</th>
            </tr>
          </thead>
          <tbody>
            {statistics &&
              statistics.map((stat, index) => {
                const percentage =
                  totalCrimes > 0
                    ? ((stat.count / totalCrimes) * 100).toFixed(1)
                    : 0;
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-3 px-4 border-b">
                      <div className="flex items-center">
                        {/* <div
                          className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                          style={{
                            backgroundColor: getCrimeInfo(stat.typeAccident)
                              .color,
                          }}
                        >
                          {getCrimeInfo(stat.typeAccident).icon}
                        </div> */}
                        {stat.typeAccident}
                      </div>
                    </td>
                    {/* <td className="py-3 px-4 border-b">{stat.category_accident}</td> */}
                    <td className="py-3 px-4 border-b">
                      {stat.most_common_city || "غير متوفر"}
                    </td>
                    <td className="py-3 px-4 border-b">{percentage}%</td>
                    <td className="py-3 px-4 border-b font-semibold">
                      {stat.count}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot className="bg-gray-200">
            <tr>
              <td colSpan="3" className="py-3 px-4 text-right font-bold">
                الإجمالي
              </td>
              <td className="py-3 px-4 font-bold">{totalCrimes}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
