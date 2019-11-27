CREATE TABLE `groups` (
	`id` BINARY NOT NULL,
	`name` BINARY NOT NULL,
	`begin_year` BINARY NOT NULL
);

CREATE TABLE `subjects` (
	`id` BINARY NOT NULL,
	`name` BINARY NOT NULL,
	`semester` BINARY NOT NULL,
	`form_id` BINARY NOT NULL
);

CREATE TABLE `teachers` (
	`id` BINARY NOT NULL,
	`first_name` BINARY NOT NULL,
	`second_name` BINARY NOT NULL,
	`last_name` BINARY NOT NULL,
	`phone` BINARY NOT NULL
);

CREATE TABLE `students` (
	`id` BINARY NOT NULL,
	`first_name` BINARY NOT NULL,
	`second_name` BINARY NOT NULL,
	`last_name` BINARY NOT NULL,
	`phone` BINARY NOT NULL,
	`address` BINARY NOT NULL,
	`group_id` BINARY NOT NULL
);

CREATE TABLE `users` (
	`id` BINARY NOT NULL,
	`email` BINARY NOT NULL,
	`password` BINARY NOT NULL,
	`userable_id` BINARY NOT NULL,
	`userable_type` BINARY NOT NULL
);

CREATE TABLE `lesson_teacher` (
	`id` BINARY NOT NULL,
	`lesson_id` BINARY NOT NULL,
	`teacher_id` BINARY NOT NULL
);

CREATE TABLE `group_subject` (
	`id` BINARY NOT NULL,
	`group_id` BINARY NOT NULL,
	`subject_id` BINARY NOT NULL
);

CREATE TABLE `exam_form` (
	`id` BINARY NOT NULL,
	`name` BINARY NOT NULL
);

CREATE TABLE `lessons` (
	`id` BINARY NOT NULL,
	`subject_id` BINARY NOT NULL,
	`room` varchar NOT NULL,
	`order` BINARY NOT NULL,
	`week_day` BINARY NOT NULL,
	`type_id` BINARY NOT NULL,
	`parity` BINARY NOT NULL
);

CREATE TABLE `lesson_group` (
	`id` BINARY NOT NULL,
	`lesson_id` BINARY NOT NULL,
	`group_id` BINARY NOT NULL
);

CREATE TABLE `types` (
	`id` BINARY NOT NULL,
	`name` BINARY NOT NULL
);

ALTER TABLE `subjects` ADD CONSTRAINT `subjects_fk0` FOREIGN KEY (`form_id`) REFERENCES `exam_form`(`id`);

ALTER TABLE `students` ADD CONSTRAINT `students_fk0` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`);

ALTER TABLE `lesson_teacher` ADD CONSTRAINT `lesson_teacher_fk0` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`);

ALTER TABLE `lesson_teacher` ADD CONSTRAINT `lesson_teacher_fk1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`);

ALTER TABLE `group_subject` ADD CONSTRAINT `group_subject_fk0` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`);

ALTER TABLE `group_subject` ADD CONSTRAINT `group_subject_fk1` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`);

ALTER TABLE `lessons` ADD CONSTRAINT `lessons_fk0` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`);

ALTER TABLE `lessons` ADD CONSTRAINT `lessons_fk1` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`);

ALTER TABLE `lesson_group` ADD CONSTRAINT `lesson_group_fk0` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`);

ALTER TABLE `lesson_group` ADD CONSTRAINT `lesson_group_fk1` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`);

