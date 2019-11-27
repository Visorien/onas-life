import { InstituteRepository } from '../../database/InstituteRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await InstituteRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}