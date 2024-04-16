import { createRouter, createWebHistory, type NavigationGuardWithThis, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';
import authMiddleware from './authMiddleware';
import { PageName, Role } from '@/common/constants';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      public:true,
    },   
    children:[
      {
        path:'/job_seeker',
        name:'job_seeker',
        component:()=>import('../layouts/Home/Index.vue'),
        meta:{
          public:false,
          role:Role.JOB_SEEKER
        },
      },
      {
        path:'/managercv',
        name:'managercv',
        component:()=>import('../layouts/Home/FileCv/FileCvIndex.vue'),
        meta:{
          public:false,
          role:Role.JOB_SEEKER
        },
      },
      {
        path: '/companny/:id',
        name: PageName.COMPANNY_PAGE,
        component: ()=>import('../layouts/Home/Companny/Companny.vue'),
        meta:{
          public:true,
        }
      },
      {
        path: '/jobdetail/:id',
        name: PageName.JOBDETAIL_PAGE,
        component: ()=>import('../layouts/Home/Job/Jobdetail.vue'),
        meta:{
          public:true,
        }
      }

    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: ()=>import('../components/Element/Test.vue'),
    meta:{
      public:true,
    }
  },
  {
    path: '/login',
    name: PageName.LOGIN_PAGE,
    component: ()=>import('../pages/Auth/Login.vue'),
    meta:{
      public:true,
    }
  },
  {
    path: '/register',
    name: PageName.REGISTER_PAGE,
    component: ()=>import('../pages/Auth/Register.vue'),
    meta:{
      public:true,
    }
  },
   {
    path: '/loginbyemployers',
    name: PageName.LOGINBYEMPLOYERS_PAGE,
    component: ()=>import('../pages/Auth/LoginByEmployers.vue'),
    meta:{
      public:true,
    }
  },
  {
    path: '/registerbyemployers',
    name: PageName.REGISTERBYEMPLOYERS_PAGE,
    component: ()=>import('../pages/Auth/RegisterByEmployers.vue'),
    meta:{
      public:true,
    }
  },
  {
    path: '/employers',
    redirect:'/employers/index',
    name: PageName.EMPLOYERS_PAGE,
    component: ()=>import('../layouts/Employers/EmployersIndex.vue'),
    meta:{
      public:false,
      role:Role.EMPLOYER
    },
    children:[
      {
        path: 'index',
        name: PageName.EMPLOYERS_DASHBOARD_PAGE,
        component: ()=>import('../layouts/Employers/Dasdboard/Index.vue'),
      },
      {
        path: 'news',
        name: PageName.NEWS_PAGE,
        component: ()=>import('../layouts/Employers/News/NewsIndex.vue'),
      },
      {
        path: 'account',
        name: PageName.EMPLOYERS_ACCOUNT_PAGE,
        component: ()=>import('../layouts/Employers/Account/AccountIndex.vue'),
      },
      {
        path: 'recruitment',
        name: PageName.EMPLOYERS_RECRUIMENT_PAGE,
        component: ()=>import('../layouts/Employers/Recruitment/RecruitmentIndex.vue'),
      },
      {
        path: 'suitable',
        name: PageName.EMPLOYERS_RECRUIMENT_SUITABLE_PAGE,
        component: ()=>import('../layouts/Employers/Recruitment/RecruimentSuitable.vue'),
      },
    ]
  },










  {
    path: '/admin',
    redirect:'/admin/dashboard',
    name: PageName.ADMIN,
    component: ()=> import('../views/AdminView.vue'),
    meta:{
      public:false,
      role:Role.ADMIN
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
      {
        path: 'city',
        name: PageName.CITY_PAGE,
        component: ()=>import('../layouts/Admin/City/CityIndex.vue'),
      },
      {
        path: 'profession',
        name: PageName.PRORESSION_PAGE,
        component: ()=>import('../layouts/Admin/Profession/ProfessionIndex.vue'),
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
