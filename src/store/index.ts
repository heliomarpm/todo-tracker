// import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADD_PROJECT, ADD_TASK, EDIT_PROJECT, EDIT_TASK, REMOVE_PROJECT, REMOVE_TASK } from "./mutations.types";

import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";

export interface IState {
    projects: IProject[],
    tasks: ITask[]
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
        projects: (localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects') as string) : []) as IProject[],
        tasks: (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string) : []) as ITask[],
    },
    // https://vuex.vuejs.org/ptbr/guide/mutations
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Object_initializer
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject

            state.projects.push(project);
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        [REMOVE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(p => p.id !== id);
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        [EDIT_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(p => p.id === project.id);
            state.projects[index] = project;
            localStorage.setItem('projects', JSON.stringify(state.projects));
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