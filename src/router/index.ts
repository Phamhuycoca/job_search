import { createRouter, createWebHistory, type NavigationGuardWithThis, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';
import authMiddleware from './authMiddleware';
import { PageName } from '@/common/constants';
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })
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
