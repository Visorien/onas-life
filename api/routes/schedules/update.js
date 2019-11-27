import { ScheduleRepository } from '../../database/ScheduleRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const schedule = await ScheduleRepository.update({
        id: params.id,
        name: body.name,
    });

    if (response) {
        response.status(200).json(schedule.toPlain());
    } else {
        return schedule;
    }
}