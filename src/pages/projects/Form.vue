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

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from "@/store";

import { ADD_PROJECT, EDIT_PROJECT } from '@/store/mutations.types';

export default defineComponent({
    name: "_FormProject",
    props: {
        id: { type: String }
    },
    setup() {
        const store = useStore();
        return {
            store
        }
    },
    mounted() {
        if (this.id) {
            const project = this.store.state.projects.find(p => p.id === this.id);
            this.projectName = project?.name || '';
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

            if (this.id) {
                // EDICAO
                this.store.commit(EDIT_PROJECT, {
                    id: this.id,
                    name: this.projectName
                });
            }
            else {
                this.store.commit(ADD_PROJECT, this.projectName);
            }
            this.projectName = "";
            this.$router.push("/projects");


        }
    }
})

</script>
