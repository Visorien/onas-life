import { InstituteRepository } from '../../database/InstituteRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const institute = await InstituteRepository.findById(params.id);

    if (response) {
        if (institute) {
            response.status(200).json(institute.toPlain());
        } else {
            response.sendStatus(404);
        }
    } else {
        return institute;
    }
}