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
        path: '/test',
        name: 'Test',
        component: ()=>import('../components/Element/Test.vue'),
        meta:{
          public:true,
        }
      },
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
        name:PageName.MANAGERCV_PAGE,
        component:()=>import('../layouts/Home/FileCv/FileCv.vue'),
        meta:{
          public:false,
          role:Role.JOB_SEEKER
        },
      },
      {
        path:'/createcv',
        name:PageName.CREATECV_PAGE,
        component:()=>import('../layouts/Home/FileCv/FileCvIndex.vue'),
        meta:{
          public:false,
          role:Role.JOB_SEEKER
        },
      },
      {
        path: '/compannydetail/:id',
        name: PageName.COMPANNYDETAIL_PAGE,
        component: ()=>import('../layouts/Home/Companny/Companny.vue'),
        meta:{
          public:true,
        }
      },
      {
        path: '/compannylist',
        name: PageName.COMPANNYLIST_PAGE,
        component: ()=>import('../layouts/Home/Companny/CompanyList.vue'),
        meta:{
          public:true,
        }
      },
      {
        path: '/joblist',
        name: PageName.JOBS_PAGE,
        component: ()=>import('../layouts/Home/Job/Job.vue'),
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
      },
      {
        path: '/companny/:id',
        name: PageName.COMPANNY_PAGE,
        component: ()=>import('../components/Web/Companny.vue'),
        meta:{
          public:true,
        }
      },
      {
        path: '/template_cv',
        name: PageName.TEMPLATECV_PAGE,
        component: ()=>import('../layouts/Home/FileCv/TemplateCV.vue'),
        meta:{
          public:true,
        }
      }
    ]
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
      // public:true,
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
        path: 'recruitment/:id',
        name: PageName.EMPLOYERS_RECRUIMENT_PAGE,
        component: ()=>import('../layouts/Employers/Recruitment/RecruitmentIndex.vue'),
      },
      {
        path: 'suitable',
        name: PageName.EMPLOYERS_RECRUIMENT_SUITABLE_PAGE,
        component: ()=>import('../layouts/Employers/Recruitment/RecruimentSuitable.vue'),
      },
      {
        path: 'job_recruitment',
        name: PageName.JOB_RECRUIMENT_PAGE,
        component: ()=>import('../layouts/Employers/Recruitment/Job_Recruitment.vue'),
      },
      {
        path: 'job_seekerbyid/:id',
        name: PageName.JOB_SEEKERBYID_PAGE,
        component: ()=>import('../layouts/Employers/Recruitment/Job_seekerById.vue'),
      },
    ]
  },










  {
    path: '/admin',
    redirect:'/admin/dashboard',
    name: PageName.ADMIN,
    component: ()=> import('../views/AdminView.vue'),
 
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
      {
        path: 'companny',
        name: 'companny',
        component: ()=>import('../layouts/Admin/Companny/Companny_index.vue'),
      },
      {
        path: 'news',
        name: 'news',
        component: ()=>import('../layouts/Admin/News/News_index.vue'),
      },
      {
        path: 'admin_employer',
        name: PageName.ADMIN_EMPLOYER_PAGE,
        component: ()=>import('../layouts/Admin/Companny/Companny_index.vue'),
      },
      {
        path: 'admin_banner',
        name: PageName.ADMIN_BANNER_PAGE,
        component: ()=>import('../layouts/Admin/Banner/banner_index.vue'),
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
