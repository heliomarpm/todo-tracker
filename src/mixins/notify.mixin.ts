import { store } from "@/store";
import { NOTIFY } from "@/store/types/mutations";
import { NotifyType } from "@/interfaces/INotify";

export const notifyMixin = {
    methods: {
        notify(title: string, message: string, type: NotifyType): void {
            store.commit(NOTIFY, { title, message, type });
        },
    }
}