import { GroupRepository } from '../../database/GroupRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const group = await GroupRepository.update({
        id: params.id,
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