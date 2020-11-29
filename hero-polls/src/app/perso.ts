export interface Perso {
    id: number;                         //Id du personnage
    name: string;                       //Nom du personnage
    description : string;               //Description du personnage
    backstory: string;                  //Histoire du personnage
    connections: Array<Perso>;          //Liste de personnages en lien avec lui : compagnons ou autre
    abilities: Array<string>;           //Liste de ses capacités caractéristiques
    origin : string;                    //Provenance du personnage : société créatrice
    image: string;                      //URL de l'image à afficher
}
