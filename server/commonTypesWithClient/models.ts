import type { TaskId, UserId } from './branded';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  created: number;
};

export type TrendModel = {
  isHashtag: boolean;
  word: string;
};

export type DolanModel = {
  id: string;
  message: string;
  created: number;
};
