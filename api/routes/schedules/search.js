import { ScheduleRepository } from '../../database/ScheduleRepository';

export async function search(request, response, next) {
    const schedules = await ScheduleRepository.search();

    if (response) {
        response.status(200).json(schedules.map(schedule => schedule.toPlain()));
    } else {
        return schedules;
    }
}