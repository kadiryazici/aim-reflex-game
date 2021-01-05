import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'Home',
      component: () => import('/src/App.vue'),
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
   linkActiveClass: 'active',
});

export default router;
