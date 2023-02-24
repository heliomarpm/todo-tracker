
<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="description" />
            </div>
            <div class="column">
                <Temporizador @onTimerStopped="stopTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
    name: "_Formulario",
    components: {
        Temporizador,
    },
    emits: ["onSaveTask"],
    data() {
        return {
            description: "",
        }
    },
    methods: {
        stopTask(timeInSeconds: number): void {
            console.log(`Tempo da tarefa [${this.description}]:`, timeInSeconds);
            this.$emit("onSaveTask", {
                description: this.description,
                timeInSeconds: timeInSeconds,
            });
        }
    }
});
</script>

<style>
div.form {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>
