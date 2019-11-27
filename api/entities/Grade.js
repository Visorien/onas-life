export class Grade {
    constructor({
        id = undefined,
        specializationId,
        name,
    }) {
        this.id = id;
        this.specializationId = specializationId;
        this.name = name;
    }

    toPlain() {
        return {
            id: this.id,
            specializationId: this.specializationId,
            name: this.name,
        };
    }
}