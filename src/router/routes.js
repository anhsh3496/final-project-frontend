import DashboardLayout from "@/layout/DashboardLayout.vue";

// Admin pages
import Home from "@/pages/Home.vue";
import Problem from "@/pages/Problem.vue";
import Solution from "@/pages/Solution.vue";
import UserProfile from "@/pages/UserProfile.vue";
import ManagementSolution from "@/pages/ManagementSolution.vue";
import DashboardContent from "@/pages/DashboardContent.vue";
import UserSolution from "@/pages/UserSolution.vue";
import ManagementContent from "@/pages/ManagementContent.vue";

import Login from "@/pages/Login.vue";
import Logout from "@/pages/Logout.vue";
import Register from "@/pages/Register.vue";
import ResetPassword from "@/pages/ResetPassword.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/home",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "home",
        name: "Trang chủ",
        component: Home,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "problem",
        name: "Danh sách Bài tập",
        component: Problem,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "solution",
        name: "Giải bài tập",
        component: Solution,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "user-solution",
        name: "Danh sách bài làm",
        component: UserSolution,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "user-profile",
        name: "Thông tin người dùng",
        component: UserProfile,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "management-content",
        name: "Thêm mới nội dung",
        component: ManagementContent,
        meta: {
          requiresAuth: true,
          isAdmin: true
        }
      },
      {
        path: "dashboard-content",
        name: "Quản trị nội dung",
        component: DashboardContent,
        meta: {
          requiresAuth: true,
          isAdmin: true
        }
      },
      {
        path: "management-solution",
        name: "Quản trị bài tập",
        component: ManagementSolution,
        meta: {
          requiresAuth: true,
          isAdmin: true
        }
      },
      {
        path: "/logout",
        name: "logout",
        component: Logout,
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "/register",
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: "/resetpassword",
    name: "resetpassword",
    component: ResetPassword,
    meta: {
      guest: true
    }
  }
];

export default routes;
