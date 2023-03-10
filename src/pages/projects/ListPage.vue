<template>
    <section>
        <RouterLink to="/projects/new" class="button">
            <span class="icon">
                <i class="fas fa-plus"></i>
            </span>
        </RouterLink>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td>
                        <router-link :to="`/projects/${project.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                    </td>
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
    name: "ProjectListPage",
    setup() {
        const store = useStore();
        return {
            projects: computed(() => store.state.projects),
        }
    },

})

</script>
