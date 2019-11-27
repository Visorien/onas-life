import { EmployeeRepository } from '../../database/EmployeeRepository';

export async function search(request, response, next) {
    const employees = await EmployeeRepository.search();

    if (response) {
        response.status(200).json(employees.map(employee => employee.toPlain()));
    } else {
        return employees;
    }
}