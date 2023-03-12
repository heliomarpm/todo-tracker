<template>
    <section>
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
import { useStore } from "@/store"

import { ADD_PROJECT, EDIT_PROJECT } from '@/store/mutations.types';
import { NotifyType } from '@/interfaces/INotify';
import { notifyMixin } from '@/mixins/notify.mixin';

export default defineComponent({
    name: "ProjectAddEdit",
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
    mixins: [
        notifyMixin
    ],
    methods: {
        save() {

            // const project: IProject = {
            //     id: new Date().toISOString(),
            //     name: this.projectName
            // };
            // this.projectsList.push(project);

            if (this.id) {
                const projeto = this.store.state.projects.find((p) => p.id !== this.id && p.name === this.projectName); // primeiro, buscamos pelo projeto
                if (projeto) { // se o projeto não existe...
                    this.notify('Ops!', "Já existe um projeto com esse nome!", NotifyType.ERROR);
                    return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
                }

                // EDICAO
                this.store.commit(EDIT_PROJECT, {
                    id: this.id,
                    name: this.projectName
                });
                this.notify("PROJETO", "Projeto ALTERADO com sucesso!", NotifyType.SUCCESS);
            }
            else {
                const projeto = this.store.state.projects.find((p) => p.name === this.projectName); // primeiro, buscamos pelo projeto
                if (projeto) { // s
                    this.notify('Ops!', "Projeto já cadastrado!", NotifyType.ERROR);
                    return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
                }
                this.store.commit(ADD_PROJECT, this.projectName);
                this.notify("PROJETO", "Projeto ADICIONADO com sucesso!", NotifyType.SUCCESS);
            }
            this.projectName = "";

            // this.store.commit("NOTIFY", {
            //     title: "PROJETO",
            //     description: "Projeto GRAVADO com sucesso!",
            //     type: NotifyType.SUCCESS
            // })
            
            this.$router.push("/projects");
        }
    }
})

</script>
