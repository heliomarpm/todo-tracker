import { createRouter, createWebHashHistory } from "vue-router";

import TasksPage from '../pages/TasksPage.vue';
import ProjectsPage from "../pages/ProjectsPage.vue";

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
            path: '/projects',
            component: ProjectsPage,
            children: [
                {
                    path: '', name: 'projects', component: () => import('../pages/projects/ListPage.vue')
                },
                {
                    path: 'new', name: 'new project', component: () => import('../pages/projects/FormPage.vue')
                },
                {
                    path: ':id', name: 'edit project', component: () => import('../pages/projects/FormPage.vue'), props: true
                },
            ]
        },
        {
            path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue')
        }
    ]
});