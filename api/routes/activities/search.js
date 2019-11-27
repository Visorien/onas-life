import { ActivityRepository } from '../../database/ActivityRepository';

export async function search(request, response, next) {
    const {
        query = {}
    } = request;

    const activities = await ActivityRepository.search({
        scheduleId: query['schedule_id'],
        week: query['week'],
    });

    if (response) {
        response.status(200).json(activities.map(activity => activity.toPlain()));
    } else {
        return activities;
    }
}