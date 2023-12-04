export enum ApiMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum UserType {
  PRESENTER = 1,
  VIEWER = 2,
}

export enum SnackbarStatus {
  SUCCCESSFULL = "success",
  UNSUCCESSFULL = "error",
  EDIT = "info",
}

export interface Team {
  name: string;
  _id: number;
}

export interface Voter {
  voterId: string;
  name: string;
}

export interface TeamWithMembers {
  name: string;
  _id: string;
  teamMembers: {
    name: string;
    type: number | string;
    image: string;
  }[];
}

export interface SnackbarInterface {
  status: SnackbarStatus | null;
  opened: boolean;
  message: string;
}
