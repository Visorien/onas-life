import { SubjectRepository } from '../../database/SubjectRepository';

export async function create(request, response, next) {
    const { body = { } } = request;

    const subject = await SubjectRepository.create({
        teacherEmployeeId: body.teacherEmployeeId,
        fullName: body.fullName,
        shortName: body.shortName,
    });

    if (response) {
        response.status(200).json(subject.toPlain());
    } else {
        return subject;
    }
}