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
import { ADD_PROJECT } from '@/store/mutations.types';
// import IProject from '@/interfaces/IProject';

export default defineComponent({
    name: "_FormProject",
    setup() {
        const store = useStore();
        return {
            store
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
            this.$router.push("/projects");
        }
    }
})

</script>
