import { InstituteRepository } from '../../database/InstituteRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const institute = await InstituteRepository.update({
        id: params.id,
        name: body.name,
    });

    if (response) {
        response.status(200).json(institute.toPlain());
    } else {
        return institute;
    }
}