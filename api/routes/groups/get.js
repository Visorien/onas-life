import { GroupRepository } from '../../database/GroupRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const group = await GroupRepository.findById(params.id);

    if (response) {
        if (group) {
            response.status(200).json(group.toPlain());
        } else {
            response.sendStatus(404);
        }
    } else {
        return group;
    }
}