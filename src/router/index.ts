import { createRouter, createWebHashHistory } from "vue-router";

import TasksPage from '../pages/TasksPage.vue';

// const routes: RouteRecordRaw[] = [
//     {
//         path: '/', name: 'tasks', component: Tasks 
//     }
// ];

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes
// });
// export default router;

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', name: 'tasks', component: TasksPage
        },
        {
            path: '/projects', name: 'projects', component: () => import('../pages/ProjectsPage.vue')
        },
        {
            path: '/project', name: 'new project', component: () => import('../pages/projects/Form.vue')
        },
        {
            path: '/project/:id', name: 'edit project', component: () => import('../pages/projects/Form.vue'), props: true
        },
        {
            path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue')
        }
    ]
});