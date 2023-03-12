export enum NotifyType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
}
export default interface INotify{
    id: number
    title: string,
    message: string,
    type: NotifyType,
}