<template>
    <button class="button" @click="onClick" :disabled="disabled">
        <span class="icon"><i :class="icon"></i></span>
        <span>{{ text }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: '_Botao',
    emits: ["onClick"],
    props: {
        text: {
            type: String,
            required: true,
        },
        icon: { type: String },
        disabled: { type: Boolean }
    },
    methods: {
        onClick(): void {
            this.$emit('onClick');
        }
    }
})
</script>