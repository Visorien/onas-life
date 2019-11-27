import { EmployeeRepository } from '../../database/EmployeeRepository';

export async function create(request, response, next) {
    const { body = { } } = request;

    const employee = await EmployeeRepository.create({
        firstName: body.firstName,
        lastName: body.lastName,
        middleName: body.middleName,
        phoneNumber: body.phoneNumber,
        email: body.email,
    });

    if (response) {
        response.status(200).json(employee.toPlain());
    } else {
        return employee;
    }
}