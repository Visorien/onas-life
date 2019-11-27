import { InstituteRepository } from '../../database/InstituteRepository';

export async function create(request, response, next) {
    const { body = { } } = request;

    const institute = await InstituteRepository.create({
        name: body.name,
    });

    if (response) {
        response.status(200).json(institute.toPlain());
    } else {
        return institute;
    }
}