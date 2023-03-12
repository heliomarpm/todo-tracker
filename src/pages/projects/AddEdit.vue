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
import { computed, defineComponent } from 'vue';
import { useStore } from "@/store"

import { ADD_PROJECT, EDIT_PROJECT, NOTIFY } from '@/store/mutations.types';
import { NotifyType } from '@/interfaces/INotify';

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
                    this.store.commit(NOTIFY, {
                        title: 'Ops!',
                        description: "Já existe um projeto com esse nome!",
                        type: NotifyType.ERROR,
                    }); // notificamos o usuário
                    return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
                }

                // EDICAO
                this.store.commit(EDIT_PROJECT, {
                    id: this.id,
                    name: this.projectName
                });
            }
            else {
                const projeto = this.store.state.projects.find((p) => p.name === this.projectName); // primeiro, buscamos pelo projeto
                if (projeto) { // se o projeto não existe...
                    this.store.commit(NOTIFY, {
                        title: 'Ops!',
                        description: "Projeto já cadastrado!",
                        type: NotifyType.ERROR,
                    }); // notificamos o usuário
                    return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
                }
                this.store.commit(ADD_PROJECT, this.projectName);
            }
            this.projectName = "";

            this.store.commit("NOTIFY", {
                title: "PROJETO",
                description: "Projeto GRAVADO com sucesso!",
                type: NotifyType.SUCCESS
            })
            this.$router.push("/projects");
        }
    }
})

</script>
