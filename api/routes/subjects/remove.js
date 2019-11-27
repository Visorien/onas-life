import { SubjectRepository } from '../../database/SubjectRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await SubjectRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}