// import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { http } from '@/http';

import { ADD_TASK, EDIT_TASK, LOAD_PROJECTS, NOTIFY, REMOVE_TASK } from "./mutations.types";
import { ADD_PROJECT, EDIT_PROJECT, GET_PROJECTS, REMOVE_PROJECT} from "./actions.types";

import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import INotify from "@/interfaces/INotify";

export interface IState {
    projects: IProject[],
    tasks: ITask[],
    notifications: INotify[]
}

export const keyStore: InjectionKey<Store<IState>> = Symbol();

export const store = createStore<IState>({
    // https://vuex.vuejs.org/ptbr/guide/state
    state: {
        // projects: [
        //     { id: new Date().toISOString(), name: "Typescript" },
        //     { id: new Date().toISOString(), name: "Vue3" },
        //     { id: new Date().toISOString(), name: "Vuex" },
        // ],
        projects: [] as IProject[], // (localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects') as string) : []) as IProject[],
        tasks: (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []) as ITask[],
        notifications: [] as INotify[]
    },
    // https://vuex.vuejs.org/ptbr/guide/mutations
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Object_initializer
    mutations: {
        // [ADD_PROJECT](state, projectName: string) {
        //     const project = {
        //         id: new Date().toISOString(),
        //         name: projectName
        //     } as IProject

        //     state.projects.push(project);
        //     localStorage.setItem('projects', JSON.stringify(state.projects));
        // },
        [REMOVE_PROJECT](state, id: number) {
            state.projects = state.projects.filter(p => p.id !== id);
            // localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        // [EDIT_PROJECT](state, project: IProject) {
        //     const index = state.projects.findIndex(p => p.id === project.id);
        //     state.projects[index] = project;
        //     localStorage.setItem('projects', JSON.stringify(state.projects));
        // },
        [LOAD_PROJECTS](state, projects: IProject[]) {
            state.projects = projects;
        },

        [ADD_TASK](state, task: ITask) {
            task.id = new Date().toISOString();
            state.tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        [REMOVE_TASK](state, id: string) {
            console.log(REMOVE_TASK, id);
            state.tasks = state.tasks.filter(t => t.id !== id);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        [EDIT_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id === task.id);
            state.tasks[index] = task;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },

        [NOTIFY](state, notify: INotify) {
            notify.id = new Date().getTime();
            state.notifications.push(notify);

            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id !== notify.id);
            }, 3000);
        }
    },
    actions: {
        // As actions aceita requisição assincronas
        [GET_PROJECTS]({ commit }) {
            http.get("projects")
                .then(resp => commit(LOAD_PROJECTS, resp.data));
        },
        [ADD_PROJECT](context, projectName: string) {
            return http.post("projects", {
                name: projectName
            });
        },
        [EDIT_PROJECT](context, project: IProject) {
            return http.put(`projects/${project.id}`, project);
        },   
        [REMOVE_PROJECT]({ commit }, id: number) {
            http.delete(`projects/${id}`).then(()=> commit(REMOVE_PROJECT, id));
        }   
    }
});

// export const useStore = () => {
//     return store as Store<IState>;
// }

export function useStore(): Store<IState> {
    return vuexUseStore(keyStore);
}

// export default createStore({
//     state: {
//         projets: [
//             { id: new Date().toISOString(), name: "Typescript" },
//             { id: new Date().toISOString(), name: "Vue3" },
//             { id: new Date().toISOString(), name: "Vuex" },
//         ]
//     }
// })