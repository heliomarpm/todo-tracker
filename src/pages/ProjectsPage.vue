<template>
    <section class="section">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="save">
        <div class="field">
            <label for="projectName" class="label">Nome do Projeto</label>
            <input type="text" class="input" v-model="projectName" id="projetName" autocomplete="off" placeholder="Adicionar novo projeto"/>
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
                <tr v-for="project in projectsList" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                </tr>
            </tbody>
        </table>
        <code>
            {{ projectsList }}
        </code>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IProject from '@/interfaces/IProject';

export default defineComponent({
    name: "ProjectsPage",
    data() {
        return {
            projectName: "",
            projectsList: [] as IProject[]
        }
    },
    methods: {
        save() {
            const project: IProject = {
                id: new Date().toISOString(),
                name: this.projectName
            };
            this.projectsList.push(project);
            this.projectName = "";
        }
    }
})

</script>

<style scoped>
.section {
  padding: 1.25rem;
}
</style>