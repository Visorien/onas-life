export class Chair {
    constructor({
        id = undefined,
        headEmployeeId = undefined,
        instituteId,
        name,
    }) {
        this.id = id;
        this.instituteId = instituteId;
        this.headEmployeeId = headEmployeeId;
        this.name = name;
    }

    toPlain() {
        return {
            id: this.id,
            instituteId: this.instituteId,
            headEmployeeId: this.headEmployeeId,
            name: this.name,
        };
    }
}