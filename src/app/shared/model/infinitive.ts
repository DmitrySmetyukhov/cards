export class Infinitive {
    constructor(translation: string, infinitive: string, pastSimple: string, pastParticiple: string, _id?: string) {
        this.infinitive = infinitive;
        this.pastSimple = pastSimple;
        this.pastParticiple = pastParticiple;
        this.translation = translation;
        if(_id){
            this._id = _id;
        }
    }

    infinitive: string;
    pastSimple: string;
    pastParticiple: string;
    translation: string;
    _id: string;
}
