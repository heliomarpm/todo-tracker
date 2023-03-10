// import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADD_PROJECT, EDIT_PROJECT, REMOVE_PROJECT } from "./mutations.types";

import IProject from "@/interfaces/IProject";

export interface IState {
    projects: IProject[]
}

export const keyStore: InjectionKey<Store<IState>> = Symbol();

export const store = createStore<IState>({
    // https://vuex.vuejs.org/ptbr/guide/state
    state: {
        projects: [
            // { id: new Date().toISOString(), name: "Typescript" },
            // { id: new Date().toISOString(), name: "Vue3" },
            // { id: new Date().toISOString(), name: "Vuex" },
        ]
    },
    // https://vuex.vuejs.org/ptbr/guide/mutations
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject

            state.projects.push(project);
        },
        [REMOVE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(p => p.id !== id);
        },
        [EDIT_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(p => p.id === project.id);
            state.projects[index] = project;

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