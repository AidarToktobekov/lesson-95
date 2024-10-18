export interface IUser{
    _id: string;
    username: string;
    token: string;
    role: string;
    avatar?: string;
    displayName: string;
    googleId?: string;
}

export interface ValidationError{
    errors: {
        [key:string]:{
            name: string;
            message:string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface RegisterMutation{
    username: string;
    password: string;
    avatar: string | null;
    displayName: string;
    googleId?: string;
}

export interface LoginMutation {
    username: string;  
    password: string;
}

export interface GlobalError{
    error: string;
}

export interface ICocktail{
    _id: string;
    name: string;
    user: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: {
        name: string;
        quantity: string;
    }[];
}