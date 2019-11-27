import { ChairRepository } from '../../database/ChairRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const chair = await ChairRepository.findById(params.id);

    if (response) {
        if (chair) {
            response.status(200).json(chair.toPlain());
        } else {
            response.sendStatus(404);
        }
    } else {
        return chair;
    }
}