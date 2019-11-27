import { EmployeeRepository } from '../../database/EmployeeRepository';

export async function remove(request, response, next) {
    const { params = {} } = request;

    await EmployeeRepository.deleteById(params.id);

    if (response) {
        response.sendStatus(204);
    }
}