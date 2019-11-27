import { EmployeeRepository } from '../../database/EmployeeRepository';

export async function update(request, response, next) {
    const { body = { }, params = {} } = request;

    const employee = await EmployeeRepository.update({
        id: params.id,
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