<template>
    <section>
        <RouterLink to="/projects/add" class="button">
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
                        <router-link :to="`/projects/edit/${project.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button is-danger" @click="removeProject(project.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
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
import { REMOVE_PROJECT } from '@/store/mutations.types';

export default defineComponent({
    name: "ProjectList",
    setup() {
        const store = useStore();
        return {
            store,
            projects: computed(() => store.state.projects),
        }
    },
    methods: {
        removeProject(id: string) {
            this.store.commit(REMOVE_PROJECT, id);
        }
    },
})

</script>
