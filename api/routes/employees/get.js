import { EmployeeRepository } from '../../database/EmployeeRepository';

export async function get(request, response, next) {
    const { params = {} } = request;

    const employee = await EmployeeRepository.findById(params.id);

    if (response) {
        response.status(200).json(employee.toPlain());
    } else {
        return employee;
    }
}