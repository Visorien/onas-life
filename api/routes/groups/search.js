import { GroupRepository } from '../../database/GroupRepository';

export async function search(request, response, next) {
    const { query = {} } = request;

    const groups = await GroupRepository.search({
        name: query['name'],
        gradeId: query['grade_id']
    });

    if (response) {
        response.status(200).json(groups.map(group => group.toPlain()));
    } else {
        return groups;
    }
}