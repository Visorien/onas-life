export class Speciality {
    constructor({
        id = undefined,
        chairId,
        name,
    }) {
        this.id = id;
        this.chairId = chairId;
        this.name = name;
    }

    toPlain() {
        return {
            id: this.id,
            chairId: this.chairId,
            name: this.name,
        };
    }
}