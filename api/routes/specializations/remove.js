import { SpecializationRepository } from '../../database/SpecializationRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await SpecializationRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}