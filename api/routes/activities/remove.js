import { ActivityRepository } from '../../database/ActivityRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await ActivityRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}