import { SpecializationRepository } from '../../database/SpecializationRepository';

export async function search(request, response, next) {
    const { query = {} } = request;

    const specializations = await SpecializationRepository.search({
        specialityId: query['speciality_id'],
        degree: query['degree'],
    });

    if (response) {
        response.status(200).json(specializations.map(specialization => specialization.toPlain()));
    } else {
        return specializations;
    }
}