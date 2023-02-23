<template>
    <Box>
        <div class="columns">
            <div class="column is-7">{{ task.description || "Tarefa não definida" }}</div>
            <div class="column">
                <Cronometro :secondTime="task.timeInSeconds" />
            </div>
            <Botao text="remover" @onClick="removeTask" icon="fas fa-remove" />
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';
import Box from './Box.vue';

import ITask from '../interfaces/ITask';

export default defineComponent({
    name: '_Tarefa',
    components: {
        Cronometro,
        Botao,
        Box
    },
    emits: ["onRemoveTask"],
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    },
    methods: {
        removeTask() {
            console.log("Remover tarefa");
            this.$emit("onRemoveTask", this.task);
        }
    }
}
)
</script>

