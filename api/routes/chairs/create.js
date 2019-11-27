import { ChairRepository } from '../../database/ChairRepository';

export async function create(request, response, next) {
    const { body = { } } = request;

    const chair = await ChairRepository.create({
        instituteId: body.instituteId,
        headEmployeeId: body.headEmployeeId,
        name: body.name,
    });

    if (response) {
        response.status(200).json(chair.toPlain());
    } else {
        return chair;
    }
}