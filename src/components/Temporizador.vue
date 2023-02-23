<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :secondTime="timeInSeconds" />
        <Botao text="start" @onClick="start" icon="fas fa-play" :disabled="timerStarted" />
        <Botao text="stop" @onClick="stop" icon="fas fa-stop" :disabled="!timerStarted"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";

export default defineComponent({
    name: "_Formulario",
    components: {
        Cronometro,
        Botao,
    },
    data() {
        return {
            timeInSeconds: 0,
            idTimer: 0,
            timerStarted: false,
        }
    },
    methods: {
        start() {
            console.log("start");
            this.timerStarted = true;
            this.idTimer = setInterval(() => {
                this.timeInSeconds++;
            }, 1000)
        },
        stop() {
            console.log("stop");
            this.timerStarted = false;
            clearInterval(this.idTimer); //stopped

            this.timeInSeconds = 0;
        }
    }
});
</script>