import { Photo} from './photo'
export interface Member {
        id: number;
        userName: string;
        photoUrl: string;
        gender: string;
        age: number;
        knownas: string;
        created: Date;
        lastActive: Date;
        introduction: string;
        lookingFor: string;
        interests: string;
        city: string;
        country: string;
        photos: Photo[];
    }
