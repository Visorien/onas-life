import { ActivityRepository } from '../../database/ActivityRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const activity = await ActivityRepository.findById(params.id);

    if (response) {
        response.status(200).json(activity.toPlain());
    } else {
        return activity;
    }
}