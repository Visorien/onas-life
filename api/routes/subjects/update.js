import { SubjectRepository } from '../../database/SubjectRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const subject = await SubjectRepository.update({
        id: params.id,
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