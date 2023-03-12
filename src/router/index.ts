import { createRouter, createWebHashHistory } from "vue-router";

import TasksPage from '../pages/Tasks.vue';
import ProjectsPage from "../pages/Projects.vue";

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
                    path: '', name: 'projects', component: () => import('../pages/projects/List.vue')
                },
                {
                    path: 'add', name: 'new project', component: () => import('../pages/projects/AddEdit.vue')
                },
                {
                    path: 'edit/:id', name: 'edit project', component: () => import('../pages/projects/AddEdit.vue'), props: true
                },
            ]
        },
        {
            path: '/about', name: 'about', component: () => import('../pages/About.vue')
        }
    ]
});