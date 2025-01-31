import React from "react";
import {
  BarChart3,
  FileSearch,
  Fingerprint,
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
      icon: (
        <FileSearch className="h-12 w-12 text-white p-2 bg-blue-600 rounded-lg" />
      ),
    },
    {
      title: "الخرائط الذكية",
      description: "نظام خرائط تفاعلية لتتبع القضايا والتحقيقات الجارية",
      icon: (
        <MapIcon className="h-12 w-12 text-white p-2 bg-blue-600 rounded-lg" />
      ),
    },
    {
      title: "إدارة القضايا",
      description: "تتبع متقدم وإدارة محكمة للقضايا الجنائية",
      icon: (
        <BarChart3 className="h-12 w-12 text-white p-2 bg-blue-600 rounded-lg" />
      ),
    },
    {
      title: "البحث الذكي",
      description: "محرك بحث متكامل مع فلاتر متقدمة للبيانات",
      icon: (
        <Search className="h-12 w-12 text-white p-2 bg-blue-600 rounded-lg" />
      ),
    },
    {
      title: "صلاحيات المستخدمين",
      description: "نظام تحكم دقيق في الصلاحيات والمهام",
      icon: (
        <Users className="h-12 w-12 text-white p-2 bg-blue-600 rounded-lg" />
      ),
    },
    {
      title: "الأمان الرقمي",
      description: "نظام تشفير متقدم وفق أعلى المعايير الأمنية",
      icon: (
        <Shield className="h-12 w-12 text-white p-2 bg-blue-600 rounded-lg" />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl font-bold mb-6 leading-tight animate-fade-in-down">
            النظام الجنائي الذكي
            <br />
            <span className="text-blue-200">
              منصة التحقيقات الرقمية المتكاملة
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            نظام متكامل لإدارة الأدلة الجنائية، تحليل البيانات، ومتابعة القضايا
            بدقة وكفاءة غير مسبوقة
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group h-64 bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              {/* Rotated Background Element */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100/30 rounded-full rotate-45 transform group-hover:rotate-12 transition-all duration-500"></div>

              {/* Main Content */}
              <div className="relative h-full flex flex-col justify-center items-center p-8 space-y-4">
                {/* Icon with Floating Effect */}
                <div className="relative z-10 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-black text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed opacity-90">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-300 mb-4 animate-count">
                5000+
              </div>
              <div className="text-xl font-medium">قضية تم حلها</div>
              <div className="mt-2 text-blue-200">بكفاءة تحليل عالية</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-300 mb-4">98%</div>
              <div className="text-xl font-medium">دقة النتائج</div>
              <div className="mt-2 text-blue-200">في التحليلات الجنائية</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-300 mb-4">24/7</div>
              <div className="text-xl font-medium">دعم فني</div>
              <div className="mt-2 text-blue-200">
                خدمة عملاء على مدار الساعة
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
