export class Group {
    constructor({
        id = undefined,
        scheduleId = undefined,
        gradeId,
        name,
    }) {
        this.id = id;
        this.scheduleId = scheduleId;
        this.gradeId = gradeId;
        this.name = name;
    }

    toPlain() {
        return {
            id: this.id,
            scheduleId: this.scheduleId,
            gradeId: this.gradeId,
            name: this.name,
        };
    }
}