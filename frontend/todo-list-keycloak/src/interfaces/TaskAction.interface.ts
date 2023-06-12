import { ITaskProps } from "./TaskProps.interface";

export interface ITaskAction {
  type: string;
  payload: ITaskProps;
}