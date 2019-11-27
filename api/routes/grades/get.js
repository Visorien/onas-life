import { GradeRepository } from '../../database/GradeRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const grade = await GradeRepository.findById(params.id);

    if (response) {
        if (grade) {
            response.status(200).json(grade.toPlain());
        } else {
            response.sendStatus(404);
        }
    } else {
        return grade;
    }
}