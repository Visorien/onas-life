export class Employee {
    constructor({
        id = undefined,
        firstName,
        lastName,
        middleName,
        phoneNumber = undefined,
        email = undefined,
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    get fullName() {
        return `${this.lastName} ${this.firstName} ${this.middleName}`;
    }

    toPlain() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            phoneNumber: this.phoneNumber,
            email: this.email,
        };
    }
}