export class Specialization {
    constructor({
        id = undefined,
        degree = undefined,
        specialityId,
        name,
    }) {
        this.id = id;
        this.degree = degree;
        this.specialityId = specialityId;
        this.name = name;
    }

    toPlain() {
        return {
            id: this.id,
            degree: this.degree,
            specialityId: this.specialityId,
            name: this.name,
        };
    }
}