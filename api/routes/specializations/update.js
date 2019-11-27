import { SpecializationRepository } from '../../database/SpecializationRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const specialization = await SpecializationRepository.update({
        id: params.id,
        specialityId: body.specialityId,
        degree: body.degree,
        name: body.name,
    });

    if (response) {
        response.status(200).json(specialization.toPlain());
    } else {
        return specialization;
    }
}