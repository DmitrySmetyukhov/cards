export class Infinitive {
    constructor(translation: string, infinitive: string, pastSimple: string, pastParticiple: string) {
        this.infinitive = infinitive;
        this.pastSimple = pastSimple;
        this.pastParticiple = pastParticiple;
        this.translation = translation;
    }

    infinitive: string;
    pastSimple: string;
    pastParticiple: string;
    translation: string;
}
