<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: '_Box',
})
</script>
  
<style scoped>
.box {
    background-color: #a1c4e4;
    border-radius: 5px;
}
</style>