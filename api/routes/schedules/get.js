import { ScheduleRepository } from '../../database/ScheduleRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const schedule = await ScheduleRepository.findById(params.id);

    if (response) {
        if (schedule) {
            response.status(200).json(schedule.toPlain());
        } else {
            response.sendStatus(404);
        }
    } else {
        return schedule;
    }
}