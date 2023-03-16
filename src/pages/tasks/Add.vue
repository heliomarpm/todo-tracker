
<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="description" />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
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
import { useStore, store } from "@/store"
import { ADD_TASK } from "@/store/types/mutations";
import { computed, defineComponent } from "vue";

import Temporizador from "../../components/Temporizador.vue";
import useNotificator from "@/hooks/notify.hook";

export default defineComponent({
    name: "AddTaskComp",
    components: {
        Temporizador,
    },
    // emits: ["onSaveTask"],
    setup() {
        const store = useStore();
        const { notify } = useNotificator();

        return {
            store,
            notify,
            projects: computed(() => store.state.project.projects),
            tasks: computed(() => store.state.tasks)
        }
    },
    data() {
        return {
            description: "",
            projectId: 0
        }
    },
    methods: {
        stopTask(timeInSeconds: number): void {
            console.log(`stopTask [${this.description}]:`, timeInSeconds);
            store.commit(ADD_TASK, {
                description: this.description,
                timeInSeconds: timeInSeconds,
                project: this.projects.find(p => p.id === this.projectId)
            });

            this.notify(
                "Tudo certo",
                `Tarefa [${this.description}], adicionada com sucesso!`,
                NotifyType.SUCCESS);


            // this.$emit("onSaveTask", {
            //     description: this.description,
            //     timeInSeconds: timeInSeconds,
            //     project: this.projects.find(p => p.id === this.idProject)
            // });
            this.description = "";
        }
    }
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
