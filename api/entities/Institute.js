export class Institute {
    constructor({
        id = undefined,
        name,
    }) {
        this.id = id;
        this.name = name;
    }

    toPlain() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}