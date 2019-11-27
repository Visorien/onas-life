import { SubjectRepository } from '../../database/SubjectRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const subject = await SubjectRepository.findById(params.id);

    if (response) {
        response.status(200).json(subject.toPlain());
    } else {
        return subject;
    }
}