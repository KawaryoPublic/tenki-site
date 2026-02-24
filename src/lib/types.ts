export interface Observation {
    day: number;
    morning: string[];
    noon: string[];
    afterSchool: string[];
    updatedAt: Date;
}

export interface DateInfo {
    date: string;
    plan: string;
    holiday: string[];
    updatedAt: Date;
}

export interface Notification {
    id: number;
    title: string;
    content: string;
    tags: string[];
    urls: string[];
    filenames: string[];
    tier: string;
    roles: number[];
    updatedAt: Date;
}

export interface File {
    id: number;
    title: string;
    url: string;
    tags: string[];
    tier: number;
    roles: number[];
    updatedAt: Date;
}

export interface Manual {
    id: number;
    title: string;
    content: string;
    tags: string[];
    urls: string[];
    filenames: string[];
    tier: string;
    roles: number[];
    updatedAt: Date;
}

export interface Shelf {
    id: number;
    name: string;
    type: number;
    location: Location;
    size: number[];
    position: number[];
    equipment: {
        id: number;
        name: string;
        size: number[];
        position: number[]
    }[];
    updatedAt: Date;
};

export interface Location {
    id: number;
    name: string;
    size: number[];
    equipment: Equipment[];
    shelves: Shelf[];
    updatedAt: Date;
}

export interface Equipment {
    id: number;
    name: string;
    location: Location;
    number: number;
    size: number[];
    contents: string[];
    description: string;
    tags: string[];
    urls: string[];
    filenames: string[];
    roles: number[];
    updatedAt: Date;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    markUrl: string;
    person: string;
    personDetail: string;
    personImageUrl: string;
    updatedAt: Date;
}