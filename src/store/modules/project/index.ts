import { Module } from 'vuex';
import { http } from '@/http';

import { IStateGlobal } from '@/store';
import IProject from "@/interfaces/IProject";

import { LOAD_PROJECTS } from '@/store/types/mutations';
import { REMOVE_PROJECT, GET_PROJECTS, ADD_PROJECT, EDIT_PROJECT } from '@/store/types/actions';

export interface IStateProject {
    projects: IProject[]
}

export const project: Module<IStateProject, IStateGlobal> = {
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
            http.delete(`projects/${id}`).then(() => commit(REMOVE_PROJECT, id));
        }
    },
    getters: {
        projects(state) {
            return state.projects
        }
    }
}