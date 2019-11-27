import { GroupRepository } from '../../database/GroupRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await GroupRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}