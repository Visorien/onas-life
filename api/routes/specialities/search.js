import { SpecialityRepository } from '../../database/SpecialityRepository';

export async function search(request, response, next) {
    const { query = {} } = request;

    const specialities = await SpecialityRepository.search({
        chairId: query['chair_id'],
    });

    if (response) {
        response.status(200).json(specialities.map(speciality => speciality.toPlain()));
    } else {
        return specialities;
    }
}