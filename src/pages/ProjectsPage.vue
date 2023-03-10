<template>
    <section class="section">
        <h1 class="title">Projetos</h1>

        <RouterLink to="/project" class="button">
            <span class="icon">
                <i class="fas fa-plus"></i>
            </span>
        </RouterLink>

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

export default defineComponent({
    name: "ProjectsPage",
    setup() {
        const store = useStore();
        return {
            projects: computed(() => store.state.projetcs),
        }
    },

})

</script>
