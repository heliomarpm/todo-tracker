<template>
    <div class="box has-text-weight-bold" :style="styleComponent">
        <slot></slot>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: '_Box',
    data() {
        return {
            styleComponent: {
                backgroundColor: "#a1c4e4"
            }
        }
    },
})
</script>

