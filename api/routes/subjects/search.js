import { SubjectRepository } from '../../database/SubjectRepository';

export async function search(request, response, next) {
    const subjects = await SubjectRepository.search();

    if (response) {
        response.status(200).json(subjects.map(subject => subject.toPlain()));
    } else {
        return subjects;
    }
}