# TS_LAB_2025

Лабараторні роботи з ts

Завдання 6

Тема: TypeScript & Enum
Мета роботи

Мета: Набути практичних навичок роботи з TypeScript, зокрема з використанням Enum, через створення системи управління навчальним процесом університету.

Завдання

Створіть наступні `Enum`:
StudentStatus: статус студента (Active, Academic_Leave, Graduated, Expelled)
CourseType: тип курсу (Mandatory, Optional, Special)
Semester: семестр навчання (First, Second)
Grade: оцінки (Excellent = 5, Good = 4, Satisfactory = 3, Unsatisfactory = 2)
Faculty: факультети університету (Computer_Science, Economics, Law, Engineering)
Створіть інтерфейси:

```ts
interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface Grade {
  studentId: number;
  courseId: number;
  grade: Grade;
  date: Date;
  semester: Semester;
}
```

Реалізуйте клас `UniversityManagementSystem` з наступними методами:

```ts
enrollStudent(student: Omit<Student, "id">): Student

registerForCourse(studentId: number, courseId: number): void

setGrade(studentId: number, courseId: number, grade: Grade): void

updateStudentStatus(studentId: number, newStatus: StudentStatus): void

getStudentsByFaculty(faculty: Faculty): Student[]

getStudentGrades(studentId: number): Grade[]

getAvailableCourses(faculty: Faculty, semester: Semester): Course[]

calculateAverageGrade(studentId: number): number
```

Додаткові вимоги:
Реалізуйте перевірку на можливість реєстрації на курс (перевірка кількості студентів, відповідність факультету)

Додайте валідацію при зміні статусу студента

Реалізуйте перевірку на можливість виставлення оцінки (чи зареєстрований студент на курс)

Створіть метод для отримання списку відмінників по факультету

Вимоги до здачі:

- Код має бути написаний з використанням TypeScript

- Всі методи повинні мати типізацію параметрів та повернених значень
- Код має бути покритий коментарями

Результат роботи завантажити на GitHub в окрему гілкуУся логіка має бути написана в одному файлі (без модулів)
