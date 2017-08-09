export class Card {
    constructor(word: string, translation: string, category: string) {
        this.word = word;
        this.translation = translation;
        this.category = category;
    }

    word: string;
    translation: string;
    category: string;
}
