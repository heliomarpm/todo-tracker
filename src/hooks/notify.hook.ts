import { store } from "@/store";
import { NOTIFY } from "@/store/mutations.types";
import { NotifyType } from "@/interfaces/INotify"

type Notificator = {
    notify: (title: string, message: string, type: NotifyType) => void;
}

export default(): Notificator => {
    const notify= (title: string, message: string, type: NotifyType): void => {
            store.commit(NOTIFY, { title, message, type });
    }
    
    return {
        notify
    }
}

// export const useNotificator = {
//     notify: (title: string, message: string, type: NotifyType): void => {
//             store.commit(NOTIFY, { title, message, type });
//     },
// }