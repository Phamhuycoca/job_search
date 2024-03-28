import { createRouter, createWebHistory, type NavigationGuardWithThis, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';
import authMiddleware from './authMiddleware';
import { PageName } from '@/common/constants';
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'home',
    component: HomeView,
    meta:{
      public:true
    },
    children:[
      {
        path: 'index',
        name: 'index',
        component: ()=>import('../layouts/Home/Index.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: PageName.LOGIN_PAGE,
    component: ()=>import('../pages/Auth/Login.vue'),
    meta:{
      public:true
    }
  },
  {
    path: '/register',
    name: PageName.REGISTER_PAGE,
    component: ()=>import('../pages/Auth/Register.vue'),
    meta:{
      public:true
    }
  },
   {
    path: '/loginbyemployers',
    name: PageName.LOGINBYEMPLOYERS_PAGE,
    component: ()=>import('../pages/Auth/LoginByEmployers.vue'),
    meta:{
      public:true
    }
  },
  {
    path: '/registerbyemployers',
    name: PageName.REGISTERBYEMPLOYERS_PAGE,
    component: ()=>import('../pages/Auth/RegisterByEmployers.vue'),
    meta:{
      public:true
    }
  },
  {
    path: '/employers',
    name: PageName.EMPLOYERS_PAGE,
    component: ()=>import('../layouts/Employers/Dasdboard/Index.vue'),
    meta:{
      public:true
    },
    children:[
      {
        path: 'news',
        name: PageName.NEWS_PAGE,
        component: ()=>import('../layouts/Employers/News/NewsIndex.vue'),
      },
    ]
  },










  {
    path: '/admin',
    redirect:'/admin/dashboard',
    name: 'admin',
    component: ()=> import('../views/AdminView.vue'),
    meta:{
      public:true
    },
    children:[
      {
        path: 'dashboard',
        name: PageName.DASHBOARD_PAGE,
        component: ()=>import('../layouts/Admin/Dashboard/Dashboard.vue'),
      },
      {
        path: 'employees',
        name: PageName.EMPLOYEE_PAGE,
        component: ()=>import('../layouts/Admin/Employees/EmployeesIndex.vue'),
      },
      {
        path: 'roles',
        name: PageName.ROLE_PAGE,
        component: ()=>import('../layouts/Admin/Roles/RolesIndex.vue'),
      },
      {
        path: 'formofwork',
        name: PageName.FORMOFWORK_PAGE,
        component: ()=>import('../layouts/Admin/Formofwork/FormofworkIndex.vue'),
      },
      {
        path: 'workexperience',
        name: PageName.WORKEXPERIENCE_PAGE,
        component: ()=>import('../layouts/Admin/Workexperience/WorkexperienceIndex.vue'),
      },
      {
        path: 'salary',
        name: PageName.SALARY_PAGE,
        component: ()=>import('../layouts/Admin/Salary/SalaryIndex.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach(
  VueRouteMiddleware({
    [GLOBAL_MIDDLEWARE_NAME]: authMiddleware,
  }) as NavigationGuardWithThis<unknown>,
);

export default router
