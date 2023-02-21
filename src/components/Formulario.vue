<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para a criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" />
            </div>
            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <section>
                        <strong>{{ elapsedTime }}</strong>
                    </section>
                    <button class="button" @click="start">
                        <span class="icon"><i class="fas fa-play"></i></span>
                        <span>start</span>
                    </button>
                    <button class="button" @click="stop">
                        <span class="icon"><i class="fas fa-stop"></i></span>
                        <span>stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "_Formulario",
    data() {
        return {
            secondTime: 0,
            idSecondTime: 0
        }
    },
    computed: {
        elapsedTime(): string {
            return new Date(this.secondTime * 1000).toISOString().substring(11, 19)
        }
    },
    methods: {
        start() {
            console.log("start");
            this.idSecondTime = setInterval(() => {
                this.secondTime++;
            }, 1000)
        },
        stop() {
            console.log("stop");
            clearInterval(this.idSecondTime);
        }
    }
});
</script>