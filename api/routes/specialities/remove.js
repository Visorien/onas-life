import { SpecialityRepository } from '../../database/SpecialityRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await SpecialityRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}