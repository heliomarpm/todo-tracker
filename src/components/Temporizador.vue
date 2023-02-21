<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :secondTime="secondTime" />
        <button class="button" @click="start" :disabled="timerStarted">
            <span class="icon"><i class="fas fa-play"></i></span>
            <span>play</span>
        </button>
        <button class="button" @click="stop" :disabled="!timerStarted">
            <span class="icon"><i class="fas fa-stop"></i></span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
    name: "_Formulario",
    components: {
        Cronometro,
    },
    data() {
        return {
            secondTime: 0,
            idSecondTime: 0,
            timerStarted: false,
        }
    },
    methods: {
        start() {
            console.log("start");
            this.timerStarted = true;
            this.idSecondTime = setInterval(() => {
                this.secondTime++;
            }, 1000)
        },
        stop() {
            console.log("stop");
            this.timerStarted = false;
            clearInterval(this.idSecondTime);
        }
    }
});
</script>