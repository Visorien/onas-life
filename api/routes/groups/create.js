import { GroupRepository } from '../../database/GroupRepository';

export async function create(request, response, next) {
    const { body = { } } = request;

    const group = await GroupRepository.create({
        scheduleId: body.scheduleId,
        gradeId: body.gradeId,
        name: body.name,
    });

    if (response) {
        response.status(200).json(group.toPlain());
    } else {
        return group;
    }
}