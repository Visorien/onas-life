import { ChairRepository } from '../../database/ChairRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await ChairRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}