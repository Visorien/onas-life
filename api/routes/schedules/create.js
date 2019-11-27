import { ScheduleRepository } from '../../database/ScheduleRepository';

export async function create(request, response, next) {
    const { body = {} } = request;

    const schedule = await ScheduleRepository.create({
        name: body.name
    });

    if (response) {
        response.status(200).json(schedule.toPlain());
    } else {
        return schedule;
    }
}