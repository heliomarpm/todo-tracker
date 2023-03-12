<template>
    <div class="notify">
        <article class="message" v-for="(notify, index) in notifications" :key="index" :class="context[notify.type]">
            <div class="message-header">
                {{ notify.title }}
                <!-- <button class="delete" aria-label="delete"></button> -->
            </div>
            <div class="message-body">
                {{ notify.message }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { NotifyType } from '@/interfaces/INotify';

export default {
    name: '_Notify',
    setup() {
        const store = useStore();
        return {
            notifications: computed(() => store.state.notifications),
        }
    },
    data() {
        return {
            context: {
                [NotifyType.SUCCESS]: 'is-success',
                [NotifyType.WARNING]: 'is-warning',
                [NotifyType.ERROR]: 'is-danger',
                [NotifyType.INFO]: 'is-info',
            }
        }
    }
}

</script>

<style scoped>
.notify {
    z-index: 99999;
    position: absolute;
    right: 0;
    width: 300px;
    padding: 5px;
}
</style>