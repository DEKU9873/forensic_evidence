import React from "react";
import {
  BarChart3,
  FileSearch,
  Search,
  Shield,
  Users,
  MapIcon,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      title: "اتمتة العمل",
      description:
        "ادارة محاضر الكشف بطريقة رقمية لتسهيل ادارة البيانات الجنائية",
      icon: <FileSearch className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "الخرائط الذكية",
      description: "نظام خرائط تفاعلية لتتبع القضايا والتحقيقات الجارية",
      icon: <MapIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "إدارة القضايا",
      description: "تتبع متقدم وإدارة محكمة للقضايا الجنائية",
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "البحث الذكي",
      description: "محرك بحث متكامل مع فلاتر متقدمة للبيانات",
      icon: <Search className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "صلاحيات المستخدمين",
      description: "نظام تحكم دقيق في الصلاحيات والمهام",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "الأمان الرقمي",
      description: "نظام تشفير متقدم وفق أعلى المعايير الأمنية",
      icon: <Shield className="h-8 w-8 text-blue-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - تحسين التباين والقراءة */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-32">
        <div className="absolute inset-0 bg-blue-900/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              نظام الادلة الجنائية
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium mb-10 leading-relaxed">
              منصة التحقيقات الرقمية المتكاملة لإدارة الأدلة الجنائية وتحليل
              البيانات
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
                ابدأ الآن
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-200">
                اعرف المزيد
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid - تحسين المسافات والتناسق */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="mb-6 p-4 bg-blue-50 rounded-lg inline-block group-hover:bg-blue-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section - تحسين التباين والقراءة */}
      <div className="bg-blue-900 py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "5000+",
                title: "قضية تم حلها",
                subtitle: "بكفاءة تحليل عالية",
              },
              {
                number: "98%",
                title: "دقة النتائج",
                subtitle: "في التحليلات الجنائية",
              },
              {
                number: "24/7",
                title: "دعم فني",
                subtitle: "خدمة عملاء على مدار الساعة",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-blue-800/50 p-8 rounded-xl text-center"
              >
                <div className="text-5xl font-bold text-white mb-4">
                  {stat.number}
                </div>
                <div className="text-xl font-medium text-white mb-2">
                  {stat.title}
                </div>
                <div className="text-blue-200">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
