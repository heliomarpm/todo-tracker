// import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
// import { http } from '@/http';

import { ADD_TASK, EDIT_TASK, NOTIFY, REMOVE_TASK } from "./types/mutations";
// import { ADD_PROJECT, EDIT_PROJECT, GET_PROJECTS, REMOVE_PROJECT } from "./types/actions";

import ITask from "@/interfaces/ITask";
import INotify from "@/interfaces/INotify";
import { IStateProject, project } from "./modules/project";

export interface IStateGlobal {
    // projects: IProject[],
    tasks: ITask[],
    notifications: INotify[],
    project: IStateProject,
}

export const keyStore: InjectionKey<Store<IStateGlobal>> = Symbol();

export const store = createStore<IStateGlobal>({
    // https://vuex.vuejs.org/ptbr/guide/state
    state: {
        // projects: [
        //     { id: new Date().toISOString(), name: "Typescript" },
        //     { id: new Date().toISOString(), name: "Vue3" },
        //     { id: new Date().toISOString(), name: "Vuex" },
        // ],
        //projects: [] as IProject[], // (localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects') as string) : []) as IProject[],
        tasks: (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []) as ITask[],
        notifications: [] as INotify[],
        project: {
            projects: [],
        },

    },
    // https://vuex.vuejs.org/ptbr/guide/mutations
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Object_initializer
    mutations: {

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
    // actions: {

    // },
    modules: {
        project,
    }
});

// export const useStore = () => {
//     return store as Store<IState>;
// }

export function useStore(): Store<IStateGlobal> {
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