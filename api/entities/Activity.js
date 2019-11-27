export class Activity {
    constructor({
        id = undefined,
        teacherEmployeeId = undefined,
        weeks = undefined,
        week,
        scheduleId, subjectId,
        type, place,
        day, index
    }) {
        this.id = id;
        this.scheduleId = scheduleId;
        this.subjectId = subjectId;
        this.teacherEmployeeId = teacherEmployeeId;
        this.type = type;
        this.place = place;
        this.week = week;
        this.weeks = weeks;
        this.day = day;
        this.index = index;
    }

    toPlain() {
        return {
            id: this.id,
            scheduleId: this.scheduleId,
            subjectId: this.subjectId,
            teacherEmployeeId: this.teacherEmployeeId,
            type: this.type,
            place: this.place,
            week: this.week,
            weeks: this.weeks,
            day: this.day,
            index: this.index,
        };
    }
}
