import { ChairRepository } from '../../database/ChairRepository';

export async function search(request, response, next) {
    const { query = {} } = request;

    const chairs = await ChairRepository.search({
        instituteId: query['institute_id'],
    });

    if (response) {
        response.status(200).json(chairs.map(chair => chair.toPlain()));
    } else {
        return chairs;
    }
}