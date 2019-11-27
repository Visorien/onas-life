import { SpecialityRepository } from '../../database/SpecialityRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const speciality = await SpecialityRepository.update({
        id: params.id,
        chairId: body.chairId,
        name: body.name,
    });

    if (response) {
        response.status(200).json(speciality.toPlain());
    } else {
        return speciality;
    }
}