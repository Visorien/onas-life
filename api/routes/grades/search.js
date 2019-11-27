import { GradeRepository } from '../../database/GradeRepository';

export async function search(request, response, next) {
    const { query = {} } = request;

    const grades = await GradeRepository.search({
        specializationId: query['specialization_id']
    });

    if (response) {
        response.status(200).json(grades.map(grade => grade.toPlain()));
    } else {
        return grades;
    }
}