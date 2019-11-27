import { GradeRepository } from '../../database/GradeRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const grade = await GradeRepository.update({
        id: params.id,
        specializationId: body.specializationId,
        name: body.name,
    });

    if (response) {
        response.status(200).json(grade.toPlain());
    } else {
        return grade;
    }
}