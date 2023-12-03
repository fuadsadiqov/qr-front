export enum ApiMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export enum UserType {
    PRESENTER = 1,
    VIEWER = 2,
}

export interface Team {
    name: string;
    _id: number;
}

export interface TeamWithMembers {
    name: string;
    _id: string;
    teamMembers: {
        name: string;
        type: string;
    }[];
}