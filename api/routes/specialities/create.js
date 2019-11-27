import { SpecialityRepository } from '../../database/SpecialityRepository';

export async function create(request, response, next) {
    const { body = { } } = request;

    const speciality = await SpecialityRepository.create({
        chairId: body.chairId,
        name: body.name,
    });

    if (response) {
        response.status(200).json(speciality.toPlain());
    } else {
        return speciality;
    }
}