import { InstituteRepository } from '../../database/InstituteRepository';

export async function search(request, response, next) {
    const institutes = await InstituteRepository.search();

    if (response) {
        response.status(200).json(institutes.map(institute => institute.toPlain()));
    } else {
        return institutes;
    }
}