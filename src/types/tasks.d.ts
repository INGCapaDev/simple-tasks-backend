export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type TaskTitle = Pick<Task, 'title'>;

export type TaskUpdate = Partial<Task>;
