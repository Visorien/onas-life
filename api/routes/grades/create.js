import { GradeRepository } from '../../database/GradeRepository';

export async function create(request, response, next) {
    const { body = { } } = request;

    const grade = await GradeRepository.create({
        specializationId: body.specializationId,
        name: body.name,
    });

    if (response) {
        response.status(200).json(grade.toPlain());
    } else {
        return grade;
    }
}