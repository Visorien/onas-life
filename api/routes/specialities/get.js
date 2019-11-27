import { SpecialityRepository } from '../../database/SpecialityRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const speciality = await SpecialityRepository.findById(params.id);

    if (response) {
        if (speciality) {
            response.status(200).json(speciality.toPlain());
        } else {
            response.sendStatus(404);
        }
    } else {
        return speciality;
    }
}