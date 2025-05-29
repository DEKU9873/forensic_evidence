import { useState } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
} from "lucide-react";
import AllUserHook from "../../hook/auth/all-user-hook";
import Register from "./Register";
import { useDispatch } from "react-redux";
import notify from "../../hook/useNotification";
import { ToastContainer } from "react-toastify";
import DeleteModal from "../../Components/modal/DeleteModal";
import { deleteUser, getAllUsers } from "../../redux/actions/authAction";
import baseURL from "../../Api/baseURL";

export default function UserTablePage() {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUserId) {
      setIsLoading(true);
      try {
        await dispatch(deleteUser(selectedUserId));
        await dispatch(getAllUsers());
        setDeleteModalOpen(false);
        setSelectedUserId(null);
        notify("تم حذف المستخدم بنجاح", "success");
      } catch (error) {
        notify("حدث خطأ أثناء حذف المستخدم", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  const handleToggleActivity = async (id) => {
    setIsLoading(true);
    try {
      const res = await baseURL.put(`/account/toggle-activity/${id}/`);
      if (res.status === 200) {
        await dispatch(getAllUsers());
        notify("تم تغيير حالة النشاط بنجاح", "success");
      } else {
        notify("حدث خطأ أثناء تغيير حالة النشاط", "error");
      }
    } catch (error) {
      notify("فشل الاتصال بالخادم", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await dispatch(getAllUsers());
      notify("تم تحديث البيانات", "success");
    } catch (error) {
      notify("فشل في تحديث البيانات", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const user = AllUserHook();
  const users =
    user && Array.isArray(user) && Array.isArray(user[0]) ? user[0] : user;

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleClos = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  const handleAddUser = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  const handleEditUser = (user) => {
    alert(`تعديل بيانات المستخدم: ${user.username}`);
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800 border-red-200",
      manager: "bg-blue-100 text-blue-800 border-blue-200",
      user: "bg-green-100 text-green-800 border-green-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[role?.toLowerCase()] || colors.default;
  };

  const getRoleText = (role) => {
    const roleTexts = {
      admin: "مدير النظام",
      manager: "مشرف",
      user: "مستخدم",
      default: "غير محدد",
    };
    return roleTexts[role?.toLowerCase()] || roleTexts.default;
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 ml-[70px]"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                إدارة المستخدمين
              </h1>
              <p className="text-gray-600">
                إدارة وتنظيم حسابات المستخدمين في النظام
              </p>
            </div>
            {/* <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 disabled:opacity-50"
              title="تحديث البيانات"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button> */}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في المستخدمين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-w-[150px]"
                >
                  <option value="all">جميع المناصب</option>
                  <option value="admin">مدير النظام</option>
                  <option value="manager">مشرف</option>
                  <option value="user">مستخدم</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAddUser}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-6 py-3 flex items-center gap-2 transition-all duration-200 font-medium"
            >
              <Plus size={20} />
              <span>إضافة مستخدم جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {users?.length || 0}
              </div>
              <div className="text-sm text-gray-600">إجمالي المستخدمين</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {users?.filter((u) => u.is_active).length || 0}
              </div>
              <div className="text-sm text-gray-600">المستخدمين النشطين</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {users?.filter((u) => !u.is_active).length || 0}
              </div>
              <div className="text-sm text-gray-600">
                المستخدمين غير النشطين
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {filteredUsers?.length || 0}
              </div>
              <div className="text-sm text-gray-600">نتائج البحث</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    المستخدم
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    المنصب
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    حالة النشاط
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers && filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user.username?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-base">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {getRoleText(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={user.is_active}
                              onChange={() => handleToggleActivity(user.id)}
                              disabled={isLoading}
                              className="sr-only peer"
                            />
                            <div className="relative w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300">
                              <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform peer-checked:-translate-x-6"></div>
                            </div>
                          </label>
                          <div className="flex items-center gap-1">
                            {user.is_active ? (
                              <UserCheck className="w-4 h-4 text-green-600" />
                            ) : (
                              <UserX className="w-4 h-4 text-red-600" />
                            )}
                            <span
                              className={`text-sm font-medium ${
                                user.is_active
                                  ? "text-green-700"
                                  : "text-red-600"
                              }`}
                            >
                              {user.is_active ? "مفعل" : "غير مفعل"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200"
                            title="تعديل المستخدم"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user.id)}
                            className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
                            title="حذف المستخدم"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-lg font-medium text-gray-900 mb-1">
                            {searchTerm || filterRole !== "all"
                              ? "لا توجد نتائج مطابقة"
                              : "لا توجد بيانات مستخدمين"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {searchTerm || filterRole !== "all"
                              ? "جرب تغيير معايير البحث أو المرشح"
                              : "ابدأ بإضافة مستخدمين جدد إلى النظام"}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ToastContainer/>
      </div>

      {isRegisterOpen && <Register open={isRegisterOpen} close={handleClos} />}

      {isDeleteModalOpen && (
        <DeleteModal
          onCancel={handleCancelDelete}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
