import { GradeRepository } from '../../database/GradeRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await GradeRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}