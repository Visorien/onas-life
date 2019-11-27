import { SpecializationRepository } from '../../database/SpecializationRepository';

export async function create(request, response, next) {
    const { body = { } } = request;

    const specialization = await SpecializationRepository.create({
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