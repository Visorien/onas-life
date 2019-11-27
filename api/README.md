# Digital Resistance API

## Authorization (temporary solution)

```
GET /check-auth?login=<login>&password=<password> => true/false
```

Add next header to each POST/DELETE request:
```
Authorization: <login>:<password>
```

## Structure

```
        Institutes
           /|\
          Chairs — (headEmployeeId) — Employees
           /|\
       Specialities
           /|\
      Specializations
           /|\
          Grades
           /|\
          Groups
           \|/
        Schedules
           /|\
        Activities — (teacherEmployeeId) — Employees
            |
         Subjects
            |
    (teacherEmployeeId)
            |
        Employees
```

## Activities

```
Activity {
    id?: number
    scheduleId: number
    subjectId: number
    teacherEmployeeId?: number
    type: ActivityType
    place: string
    week: Week
    weeks?: number[]
    day: Day
    index: number
}

Week [
    'every'
    'odd'
    'even'
    'custom'
]

ActivityType [
    'lecture'
    'lab'
    'practice'
    'practice-lab'
    'asrs'
]

day [
    'monday'
    'tuesday'
    'wednesday'
    'thursday'
    'friday'
    'saturday'
]

GET /activities { schedule_id?: number } => Activity[] [200]
GET /activities/:id => Activity [200]
POST /activities Activity => Activity [200]
POST /activities/:id Activity => Activity [200]
DELETE /activities/:id => <none> [204]
```

## Chairs

```
Chair {
    id?: number
    headEmployeeId?: number
    instituteId: number
    name: string
}

GET /chairs { institute_id?: number } => Chair[] [200]
GET /chairs/:id => Chair [200]
POST /chairs Chair => Chair [200]
POST /chairs/:id Chair => Chair [200]
DELETE /chairs/:id => <none> [204]
```

## Employees

```
Employee {
    id?: number
    firstName: string
    lastName: string
    middleName: string
    phoneNumber?: string
    email?: string
}

GET /employees => Employee[] [200]
GET /employees/:id => Employee [200]
POST /employees Employee => Employee [200]
POST /employees/:id Employee => Employee [200]
DELETE /employees/:id => <none> [204]
```

## Grades

```
Grade {
    id?: number
    specializationId?: number
    name: string
}

GET /grades { specialization_id?: number } => Grade[] [200]
GET /grades/:id => Grade [200]
POST /grades Grade => Grade [200]
POST /grades/:id Grade => Grade [200]
DELETE /grades/:id => <none> [204]
```

## Groups

```
Group {
    id?: number
    gradeId?: number
    scheduleId?: number
    name: string
}

GET /groups { grade_id?: number } => Group[] [200]
GET /groups/:id => Group [200]
POST /groups Group => Group [200]
POST /groups/:id Group => Group [200]
DELETE /groups/:id => <none> [204]
```

## Institutes

```
Institute {
    id?: number
    scheduleId?: number
    name: string
}

GET /institutes => Institute[] [200]
GET /institutes/:id => Institute [200]
POST /institutes Institute => Institute [200]
POST /institutes/:id Institute => Institute [200]
DELETE /institutes/:id => <none> [204]
```

## Schedules

```
Schedule {
    id?: number,
    name: string,
}

GET /schedules => Schedule[] [200]
GET /schedules/:id => Schedule [200]
POST /schedules Schedule => Schedule [200]
POST /schedules/:id Schedule => Schedule [200]
DELETE /schedules/:id => <none> [204]
```

## Specialities

```
Speciality {
    id?: number
    chairId?: number
    name: string
}

GET /specialities { chair_id?: number } => Speciality[] [200]
GET /specialities/:id => Speciality [200]
POST /specialities Speciality => Speciality [200]
POST /specialities/:id Speciality => Speciality [200]
DELETE /specialities/:id => <none> [204]
```

## Specializations

```
Specialization {
    id?: number
    specialityId?: number
    degree?: Degree
    name: string
}

Degree [
    'bachelor'
    'master'
]

GET /specializations { speciality_id?: number, degree?: Degree } => Specialization[] [200]
GET /specializations/:id => Specialization [200]
POST /specializations => Specialization [200]
POST /specializations/:id => Specialization [200]
DELETE /specializations/:id => <none> [204]
```

## Subjects

```
Subject {
    id?: number
    teacherEmployeeId?: string
    shortName: string
    fullName: string
}

GET /subjects => Subject[] [200]
GET /subjects/:id => Subject [200]
POST /subjects => Subject [200]
POST /subjects/:id => Subject [200]
DELETE /subjects/:id => <none> [204]
```

## Legacy routes

```
GET /legacy/:groupId/schedule/:week/:day
GET /legacy/:groupId/subjects
GET /legacy/subject/:id
```

Examples:
```
GET /legacy/13/schedule/1/friday
GET /legacy/13/schedule/5/tuesday
GET /legacy/13/subjects
GET /legacy/subject/6
```