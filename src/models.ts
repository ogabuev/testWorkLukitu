export type Characters = {
    image: string;
    name: string;
    property: Skill[];
    addProperty: AddSkills[]
}

export type Skill = {
    id: number;
    name: string;
    value: number;
    addSkills?: AddSkills[];
}

export type AddSkills  = {
    id: number;
    name: string;
    value: number;
}

export type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: [],
    url: string,
    created: string,
}

enum LEVEL {
    Untrained = 0,
    Beginner = 1,
    Student = 2,
    Adept = 3,
    Expert = 4,
    Master = 5,
}
