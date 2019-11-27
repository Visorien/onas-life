export class Subject {
    constructor({
        id = undefined,
        teacherEmployeeId = undefined,
        shortName,
        fullName
    }) {
        this.id = id;
        this.teacherEmployeeId = teacherEmployeeId;
        this.shortName = shortName;
        this.fullName = fullName;
    }

    get name() {
        return `${this.fullName} (${this.shortName})`;
    }

    toPlain() {
        return {
            id: this.id,
            teacherEmployeeId: this.teacherEmployeeId,
            shortName: this.shortName,
            fullName: this.fullName,
        }
    }
}