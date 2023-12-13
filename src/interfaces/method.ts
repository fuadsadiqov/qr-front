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
  SUCCESSFULL = "success",
  UNSUCCESSFULL = "error",
  EDIT = "info",
}

export interface Team {
  name: string;
  _id: number;
}

export interface Voter {
  _id: string;
  name: string;
  pin: string;
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

export interface QRModalInterface{
  open: boolean,
  value: string,
  name: string
}