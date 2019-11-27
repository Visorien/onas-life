import { ScheduleRepository } from '../../database/ScheduleRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await ScheduleRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}