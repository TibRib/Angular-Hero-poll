import { Participant } from "./participant";

export interface Battle{
    id : number,
    name : String,
    participants: Array<Participant>
}