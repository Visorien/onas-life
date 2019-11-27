import express from 'express';
import { ActivityRepository } from '../../database/ActivityRepository';
import { GroupRepository } from '../../database/GroupRepository';
import { SubjectRepository } from '../../database/SubjectRepository';
import { EmployeeRepository } from '../../database/EmployeeRepository';
import { ActivityType } from '../../enums/ActivityType';

export const legacyRouter = express.Router();

const LessonType = {
    [ActivityType.ASRS]: 'АСРС',
    [ActivityType.LAB]: 'Лабораторная',
    [ActivityType.LECTURE]: 'Лекция',
    [ActivityType.PRACTICE]: 'Практика',
    [ActivityType.PRACTICE_LAB]: 'Пр. лаб.'
};

legacyRouter.get(
    '/:groupId/schedule/:week/:day',
    async (req, res) => {
        const group = await GroupRepository.findById(req.params.groupId);

        const activities = await ActivityRepository.search({
            day: req.params.day,
            week: Number(req.params.week),
            scheduleId: group.scheduleId,
        });

        const subjects = await Promise.all(
            [...new Set(activities.map(a => a.subjectId))].map(id => (
                SubjectRepository.findById(id)
            ))
        );

        const employees = await Promise.all(
            [
                ...new Set([
                    ...activities.map(a => a.teacherEmployeeId),
                    ...subjects.map(s => s.teacherEmployeeId)
                ].filter(Boolean))
            ].map(id => (
                EmployeeRepository.findById(id)
            ))
        );

        res.status(200).json({
            'status': true,
            'schedule': activities.map((activity) => {
                const subject = subjects.find(s => s.id === activity.subjectId);
                const employeeId = activity.teacherEmployeeId || subject.teacherEmployeeId;
                const employee = employeeId && employees.find(e => e.id === employeeId)

                return {
                    'subject_id': activity.subjectId,
                    'order': activity.index,
                    'room': activity.place,
                    'lesson_type': LessonType[activity.type],
                    'subject_name': subject.name,
                    'teachers': [
                        employee && {
                            'first_name': employee.firstName,
                            'second_name': employee.middleName,
                            'last_name': employee.lastName
                        }
                    ].filter(Boolean)
                };
            }, {})
        });
    }
);

legacyRouter.get(
    '/:groupId/subjects',
    async (req, res) => {
        const group = await GroupRepository.findById(req.params.groupId);

        const activities = await ActivityRepository.search({
            scheduleId: group.scheduleId,
        });

        const subjects = await Promise.all(
            [...new Set(activities.map(a => a.subjectId))].map(id => (
                SubjectRepository.findById(id)
            ))
        );

        const employees = await Promise.all(
            [...new Set(subjects.map(s => s.teacherEmployeeId).filter(Boolean))].map(id => (
                EmployeeRepository.findById(id)
            ))
        );

        res.status(200).json({
            'status': true,
            'subjects': subjects.map(subject => {
                const employee = subject.teacherEmployeeId && employees.find(e => e.id === subject.teacherEmployeeId);

                return {
                    'name': subject.name,
                    'exam_form': '[Неизвестно]',
                    'teachers': [
                        employee && {
                            'first_name': employee.firstName,
                            'second_name': employee.middleName,
                            'last_name': employee.lastName
                        }
                    ].filter(Boolean)
                };
            })
        });
    }
);

legacyRouter.get(
    '/subject/:id',
    async (req, res) => {
        const subject = await SubjectRepository.findById(req.params.id);
        const employee = subject.teacherEmployeeId && (
            await EmployeeRepository.findById(subject.teacherEmployeeId)
        );

        res.status(200).json({
            'status': true,
            'subject': {
                'name': subject.name,
                'exam_form': '[Неизвестно]',
                'teachers': [
                    employee && {
                        'first_name': employee.firstName,
                        'second_name': employee.middleName,
                        'last_name': employee.lastName
                    }
                ].filter(Boolean)
            }
        });
    }
);