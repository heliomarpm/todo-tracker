import IProject from "./IProject";

export default interface ITask {
    id: string;
    timeInSeconds: number;
    description: string;
    project: IProject;
}
