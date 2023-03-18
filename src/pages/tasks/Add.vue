
<template>
    <div div class="box form">
        <div class="columns">
            <div class="column is-6" role="form" aria-label="Formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?"
                    v-model="data.description" />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="data.projectId">
                        <option value="">Selecione o projeto</option>
                        <option v-for="project in projects" :key="project.id" :value="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @onTimerStopped="stopTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { NotifyType } from "@/interfaces/INotify";
import { useStore } from "@/store"
import { ADD_TASK } from "@/store/types/mutations";
import { computed, defineComponent, ref } from "vue";

import useNotify from "@/hooks/notify.hook";

import Temporizador from "../../components/Temporizador.vue";

export default defineComponent({
    name: "AddTask",
    components: {
        Temporizador,
    },
    
    /**
     * PADRÃO COMPOSITION API
     */
    // setup(pros, { emit }) {
    setup() {
        const store = useStore();
        const { notify } = useNotify();

        const projects = computed(() => store.state.project.projects);

        const data = ref({
            description: "",
            projectId: 0,
        })

        const stopTask = (timeInSeconds: number): void => {
            console.log(`stopTask [${data.value.description}]:`, timeInSeconds);
            store.commit(ADD_TASK, {
                description: data.value.description,
                timeInSeconds: timeInSeconds,
                project: projects.value.find(p => p.id == data.value.projectId)
            });

            notify("Tudo certo",
                `Tarefa [${data.value.description}], adicionada com sucesso!`,
                NotifyType.SUCCESS);

            // emit("onSaveTask", {
            //     description: data.value.description,
            //     timeInSeconds: timeInSeconds,
            //     project: projects.value.find(p => p.id === data.value.projectId)
            // });

            data.value.description = "";
        }

        return {
            data,
            stopTask,
            projects
        }
    },

    /**
     * PADRÃO OPTIONS API
     */
    
    // emits: ["onSaveTask"],
    // setup() {
    //     const store = useStore();
    //     const { notify } = useNotify();

    //     return {
    //         store,
    //         notify,
    //         projects: computed(() => store.state.project.projects),
    //         tasks: computed(() => store.state.tasks)
    //     }
    // },
    // data() {
    //     return {
    //         description: "",
    //         projectId: 0
    //     }
    // },
    // methods: {
    //     stopTask(timeInSeconds: number): void {
    //         console.log(`stopTask [${this.description}]:`, timeInSeconds);
    //         store.commit(ADD_TASK, {
    //             description: this.description,
    //             timeInSeconds: timeInSeconds,
    //             project: this.projects.find(p => p.id === this.projectId)
    //         });

    //         this.notify(
    //             "Tudo certo",
    //             `Tarefa [${this.description}], adicionada com sucesso!`,
    //             NotifyType.SUCCESS);


    //         // this.$emit("onSaveTask", {
    //         //     description: this.description,
    //         //     timeInSeconds: timeInSeconds,
    //         //     project: this.projects.find(p => p.id === this.idProject)
    //         // });
    //         this.description = "";
    //     }
    // }
});
</script>

<style scope>
div.form {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}

.button {
    margin-left: 8px;
}
</style>
