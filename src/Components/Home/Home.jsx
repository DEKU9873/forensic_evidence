import React from 'react';
import { BarChart3, FileSearch, Fingerprint, Search, Shield, Users, MapIcon} from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: "اتمتة العمل",
      description: "ادارة محاضر الكشف بطريقة رقمية لتسهيل ادارة البيانات الجنائية",
      icon: <FileSearch className="h-8 w-8 text-blue-600" />
    },
    {
      title: "الخرائط",
      description: "نظام خرائط القضايا والتحقيقات الجارية",
      icon: <MapIcon className="h-8 w-8 text-blue-600" />
    },
    {
      title: "إدارة القضايا",
      description: "تتبع وإدارة القضايا والتحقيقات الجارية",
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />
    },
    {
      title: "البحث المتقدم",
      description: "محرك بحث متقدم في قاعدة البيانات الجنائية",
      icon: <Search className="h-8 w-8 text-blue-600" />
    },
    {
      title: "إدارة المستخدمين",
      description: "إدارة صلاحيات ومهام فريق العمل",
      icon: <Users className="h-8 w-8 text-blue-600" />
    },
    {
      title: "أمن المعلومات",
      description: "حماية وتشفير البيانات الحساسة",
      icon: <Shield className="h-8 w-8 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-400 text-white py-16">
        <div className=" mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">نظام الأدلة الجنائية المتكامل</h1>
          <p className="text-xl text-blue-100">منصة متطورة لإدارة وتحليل الأدلة الجنائية بكفاءة عالية</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-6 px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">{feature.icon}</div>
              <h2 className="text-xl font-bold text-center">{feature.title}</h2>
              <p className="text-gray-600 text-center mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400">+5000</div>
              <div className="mt-2">قضية تم حلها</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">98%</div>
              <div className="mt-2">نسبة دقة التحليل</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">24/7</div>
              <div className="mt-2">دعم فني متواصل</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;