import { SpecializationRepository } from '../../database/SpecializationRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const specialization = await SpecializationRepository.findById(params.id);

    if (response) {
        if (specialization) {
            response.status(200).json(specialization.toPlain());
        } else {
            response.sendStatus(404);
        }
    } else {
        return specialization;
    }
}