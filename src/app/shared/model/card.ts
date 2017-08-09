export class Card {
    constructor(word: string, translation: string, category: string, _id?: string) {
        this.word = word;
        this.translation = translation;
        this.category = category;
        if(_id){
            this._id = _id;
        }
    }

    word: string;
    translation: string;
    category: string;
    _id: string;
}
