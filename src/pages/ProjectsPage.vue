<template>
    <section class="section">
        <h1 class="title">Projetos</h1>
        <router-view></router-view>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "ProjectsPage"
})
</script>