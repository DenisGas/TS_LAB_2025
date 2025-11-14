"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var Grade;
(function (Grade) {
    Grade[Grade["Excellent"] = 5] = "Excellent";
    Grade[Grade["Good"] = 4] = "Good";
    Grade[Grade["Satisfactory"] = 3] = "Satisfactory";
    Grade[Grade["Unsatisfactory"] = 2] = "Unsatisfactory";
    Grade[Grade["None"] = 0] = "None";
})(Grade || (Grade = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
class UniversityManagementSystem {
    students = [];
    courses = [];
    grades = [];
    // Додавання курсу
    addCourse(_course) {
        const course = this.courses.find((c) => c.name === _course.name &&
            c.semester === _course.semester &&
            c.faculty === _course.faculty);
        if (course) {
            throw new Error("Курс з таким ім'ям вже існує для цього факультету та семестру");
        }
        const newCourse = {
            id: this.courses.length + 1,
            ..._course,
        };
        this.courses.push(newCourse);
    }
    // Додавання студента
    enrollStudent(student) {
        const newStudent = {
            id: this.students.length + 1,
            ...student,
        };
        this.students.push(newStudent);
        return newStudent;
    }
    // Реєстрація студента на курс
    registerForCourse(studentId, courseId) {
        const student = this.students.find((s) => s.id === studentId);
        if (!student)
            throw new Error("Студента не знайдено");
        const course = this.courses.find((c) => c.id === courseId);
        if (!course)
            throw new Error("Курс не знайдено");
        if (course.faculty !== student.faculty) {
            throw new Error("Студент не може реєструватися на курс іншого факультету");
        }
        const enrolledCount = this.grades.filter((g) => g.courseId === courseId).length;
        if (enrolledCount >= course.maxStudents) {
            throw new Error("Курс вже заповнений");
        }
        const alreadyRegistered = this.grades.some((g) => g.studentId === studentId && g.courseId === courseId);
        if (alreadyRegistered) {
            throw new Error("Студент вже зареєстрований на цей курс");
        }
        const newGrade = {
            studentId,
            courseId,
            grade: Grade.None,
            date: new Date(),
            semester: course.semester,
        };
        this.grades.push(newGrade);
    }
    // Встановлення оцінки студенту за курс
    setGrade(studentId, courseId, grade) {
        const gradeRecord = this.grades.find((g) => g.studentId === studentId && g.courseId === courseId);
        if (!gradeRecord)
            throw new Error("Реєстрація на курс не знайдена");
        gradeRecord.grade = grade;
        gradeRecord.date = new Date();
    }
    // Зміна статусу студента
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find((s) => s.id === studentId);
        if (!student)
            throw new Error("Студента не знайдено");
        if (student.status === StudentStatus.Expelled) {
            throw new Error("Неможливо змінити статус відрахованому студенту");
        }
        student.status = newStatus;
    }
    // Пошук студентів за факультетом
    getStudentsByFaculty(faculty) {
        return this.students.filter((s) => s.faculty === faculty);
    }
    // Отримання всіх оцінок студента
    getStudentGrades(studentId) {
        return this.grades.filter((g) => g.studentId === studentId && g.grade !== Grade.None);
    }
    // Доступні курси для факультету та семестру
    getAvailableCourses(faculty, semester) {
        return this.courses.filter((c) => c.faculty === faculty && c.semester === semester);
    }
    // Середній бал студента
    calculateAverageGrade(studentId) {
        const grades = this.getStudentGrades(studentId);
        if (grades.length === 0)
            return 0;
        const sum = grades.reduce((acc, g) => acc + g.grade, 0);
        return sum / grades.length;
    }
    // Список відмінників факультету
    getExcellentStudents(faculty) {
        return this.students.filter((student) => {
            if (student.faculty !== faculty)
                return false;
            const grades = this.getStudentGrades(student.id);
            if (grades.length === 0)
                return false;
            return grades.every((g) => g.grade === Grade.Excellent);
        });
    }
}
// Демонстрація роботи системи
function main() {
    const system = new UniversityManagementSystem();
    // --- Додаємо курси
    system.addCourse({
        name: "Algorithms",
        type: CourseType.Mandatory,
        credits: 5,
        semester: Semester.First,
        faculty: Faculty.Computer_Science,
        maxStudents: 2,
    });
    system.addCourse({
        name: "Economics Basics",
        type: CourseType.Optional,
        credits: 4,
        semester: Semester.First,
        faculty: Faculty.Economics,
        maxStudents: 3,
    });
    // --- Додаємо студентів
    const st1 = system.enrollStudent({
        fullName: "Іван Петренко",
        faculty: Faculty.Computer_Science,
        year: 1,
        status: StudentStatus.Active,
        enrollmentDate: new Date(),
        groupNumber: "CS-11",
    });
    const st2 = system.enrollStudent({
        fullName: "Олег Сидоренко",
        faculty: Faculty.Computer_Science,
        year: 1,
        status: StudentStatus.Active,
        enrollmentDate: new Date(),
        groupNumber: "CS-11",
    });
    // --- Реєструємо студентів на курс
    system.registerForCourse(st1.id, 1);
    system.registerForCourse(st2.id, 1);
    // --- Виставлюємо оцінки
    system.setGrade(st1.id, 1, Grade.Excellent);
    system.setGrade(st2.id, 1, Grade.Good);
    // --- Отримати оцінки студента
    console.log("Оцінки студента 1:", system.getStudentGrades(st1.id));
    // --- Середній бал студента
    console.log("Середній бал ст.1:", system.calculateAverageGrade(st1.id));
    // --- Відмінники факультету
    console.log("Відмінники CS:", system.getExcellentStudents(Faculty.Computer_Science));
}
main();
//# sourceMappingURL=main.js.map