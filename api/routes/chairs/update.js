import { ChairRepository } from '../../database/ChairRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const chair = await ChairRepository.update({
        id: params.id,
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