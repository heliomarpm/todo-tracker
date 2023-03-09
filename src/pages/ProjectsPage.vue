<template>
    <section class="section">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">Nome do Projeto</label>
                <input type="text" class="input" v-model="projectName" id="projetName" autocomplete="off"
                    placeholder="Adicionar novo projeto" />
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                </tr>
            </tbody>
        </table>
        <code>
            {{ projects }}
        </code>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from "@/store";
import { ADD_PROJECT } from '@/store/mutations.types';
// import IProject from '@/interfaces/IProject';

export default defineComponent({
    name: "ProjectsPage",
    setup() {
        const store = useStore();
        return {
            store,
            projects: computed(() => store.state.projetcs),
        }
    },
    data() {
        return {
            projectName: "",
            //projectsList: [] as IProject[]
        }
    },
    methods: {
        save() {
            // const project: IProject = {
            //     id: new Date().toISOString(),
            //     name: this.projectName
            // };
            // this.projectsList.push(project);
            this.store.commit(ADD_PROJECT, this.projectName);
            this.projectName = "";
        }
    }
})

</script>

<style scoped>
/* .section {
  padding: 1.25rem;
} */
</style>