# TS_LAB_2025

Лабараторні роботи з ts

Завдання 3

Тема: "Розробка системи управління розкладом в університеті"

Мета: Створити систему для управління розкладом занять в університеті, використовуючи концепції Union Types, Type Aliases та Arrays в TypeScript.



Завдання:

Визначення базових типів:

- Створіть type alias DayOfWeek для днів тижня ("Monday" | "Tuesday" | ... | "Friday").
- Створіть union type TimeSlot для можливих часових слотів занять ("8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15").
- Визначте type alias CourseType для типів занять ("Lecture" | "Seminar" | "Lab" | "Practice").

Створення основних структур:
- Створіть type alias Professor з полями: id (number), name (string), department (string).
- Визначте type alias Classroom з полями: number (string), capacity (number), hasProjector (boolean).
- Створіть type alias Course з полями: id (number), name (string), type (CourseType).
- Визначте type alias Lesson з полями: courseId (number), professorId (number), classroomNumber (string), dayOfWeek (DayOfWeek), timeSlot (TimeSlot).

Робота з масивами даних:
- Створіть масиви professors: Professor[], classrooms: Classroom[], courses: Course[], та schedule: Lesson[].
- Напишіть функцію addProfessor(professor: Professor): void для додавання нового професора.
- Створіть функцію addLesson(lesson: Lesson): boolean, яка додає заняття до розкладу, якщо немає конфліктів.

Функції пошуку та фільтрації:
- Реалізуйте функцію findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[], яка повертає номери вільних аудиторій у вказаний час.
- Напишіть функцію getProfessorSchedule(professorId: number): Lesson[], яка повертає розклад конкретного професора.

Обробка конфліктів та валідація:
- Створіть type alias ScheduleConflict з полями: type ("ProfessorConflict" | "ClassroomConflict"), lessonDetails: Lesson.
- Напишіть функцію validateLesson(lesson: Lesson): ScheduleConflict | null, яка перевіряє, чи не створює нове заняття конфліктів у розкладі.

Аналіз та звіти:
- Реалізуйте функцію getClassroomUtilization(classroomNumber: string): number, яка повертає відсоток використання аудиторії.
- Створіть функцію getMostPopularCourseType(): CourseType, яка визначає найпопулярніший тип занять.

Модифікація даних:
- Напишіть функцію reassignClassroom(lessonId: number, newClassroomNumber: string): boolean, яка змінює аудиторію для заняття, якщо це можливо.
- Реалізуйте функцію cancelLesson(lessonId: number): void, яка видаляє заняття з розкладу.




Очікувані результати:

Всі типи коректно визначені з використанням type aliases та union types.
Функції реалізовані з правильною типізацією параметрів та повернутих значень.
Ефективна робота з масивами даних, включаючи додавання, видалення та пошук елементів.
Коректна обробка конфліктів розкладу та валідація даних.
Функції аналізу надають корисну інформацію про використання ресурсів університету.


Завдання вважається виконаним, якщо:

Усі пункти завдання реалізовані та функціонують коректно.
Код написаний з використанням правильних практик TypeScript, без використання інтерфейсів та дженериків.
Типізація використовується послідовно та коректно у всьому проекті.
Функції повертають очікувані результати для різних вхідних даних.
Реалізована базова обробка помилок та крайових випадків.
Код супроводжується короткими коментарями, що пояснюють логіку роботи складних частин.

## Preview

![preview](image.png)
