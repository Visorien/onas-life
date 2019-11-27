import { ActivityRepository } from '../../database/ActivityRepository';

export async function update(request, response, next) {
    const { body = {}, params = {} } = request;

    const activity = await ActivityRepository.update({
        id: params.id,
        scheduleId: body.scheduleId,
        subjectId: body.subjectId,
        teacherEmployeeId: body.teacherEmployeeId,
        type: body.type,
        place: body.place,
        week: body.week,
        weeks: body.weeks,
        day: body.day,
        index: body.index,
    });

    if (response) {
        response.status(200).json(activity.toPlain());
    } else {
        return activity;
    }
}