enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled",
}

enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special",
}

enum Semester {
  First = "First",
  Second = "Second",
}

enum Grade {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
  None = 0,
}

enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering",
}

interface IStudent {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface ICourse {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface IGrade {
  studentId: number;
  courseId: number;
  grade: Grade;
  date: Date;
  semester: Semester;
}

class UniversityManagementSystem {
  private students: IStudent[] = [];
  private courses: ICourse[] = [];
  private grades: IGrade[] = [];

  // Додавання курсу
  addCourse(_course: Omit<ICourse, "id">): void {
    const course = this.courses.find(
      (c) =>
        c.name === _course.name &&
        c.semester === _course.semester &&
        c.faculty === _course.faculty
    );
    if (course) {
      throw new Error(
        "Курс з таким ім'ям вже існує для цього факультету та семестру"
      );
    }

    const newCourse: ICourse = {
      id: this.courses.length + 1,
      ..._course,
    };
    this.courses.push(newCourse);
  }

  // Додавання студента
  enrollStudent(student: Omit<IStudent, "id">): IStudent {
    const newStudent: IStudent = {
      id: this.students.length + 1,
      ...student,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  // Реєстрація студента на курс
  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) throw new Error("Студента не знайдено");

    const course = this.courses.find((c) => c.id === courseId);
    if (!course) throw new Error("Курс не знайдено");

    if (course.faculty !== student.faculty) {
      throw new Error(
        "Студент не може реєструватися на курс іншого факультету"
      );
    }

    const enrolledCount = this.grades.filter(
      (g) => g.courseId === courseId
    ).length;
    if (enrolledCount >= course.maxStudents) {
      throw new Error("Курс вже заповнений");
    }

    const alreadyRegistered = this.grades.some(
      (g) => g.studentId === studentId && g.courseId === courseId
    );
    if (alreadyRegistered) {
      throw new Error("Студент вже зареєстрований на цей курс");
    }

    const newGrade: IGrade = {
      studentId,
      courseId,
      grade: Grade.None,
      date: new Date(),
      semester: course.semester,
    };
    this.grades.push(newGrade);
  }

  // Встановлення оцінки студенту за курс
  setGrade(studentId: number, courseId: number, grade: Grade): void {
    const gradeRecord = this.grades.find(
      (g) => g.studentId === studentId && g.courseId === courseId
    );
    if (!gradeRecord) throw new Error("Реєстрація на курс не знайдена");
    gradeRecord.grade = grade;
    gradeRecord.date = new Date();
  }

  // Зміна статусу студента
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) throw new Error("Студента не знайдено");

    if (student.status === StudentStatus.Expelled) {
      throw new Error("Неможливо змінити статус відрахованому студенту");
    }

    student.status = newStatus;
  }

  // Пошук студентів за факультетом
  getStudentsByFaculty(faculty: Faculty): IStudent[] {
    return this.students.filter((s) => s.faculty === faculty);
  }

  // Отримання всіх оцінок студента
  getStudentGrades(studentId: number): IGrade[] {
    return this.grades.filter(
      (g) => g.studentId === studentId && g.grade !== Grade.None
    );
  }

  // Доступні курси для факультету та семестру
  getAvailableCourses(faculty: Faculty, semester: Semester): ICourse[] {
    return this.courses.filter(
      (c) => c.faculty === faculty && c.semester === semester
    );
  }

  // Середній бал студента
  calculateAverageGrade(studentId: number): number {
    const grades = this.getStudentGrades(studentId);

    if (grades.length === 0) return 0;

    const sum = grades.reduce((acc, g) => acc + g.grade, 0);
    return sum / grades.length;
  }

  // Список відмінників факультету
  getExcellentStudents(faculty: Faculty): IStudent[] {
    return this.students.filter((student) => {
      if (student.faculty !== faculty) return false;

      const grades = this.getStudentGrades(student.id);
      if (grades.length === 0) return false;

      return grades.every((g) => g.grade === Grade.Excellent);
    });
  }
}

// Демонстрація роботи системи

function main(): void {
  const system = new UniversityManagementSystem();
  // --- Додаємо курси
  system.addCourse({
    name: "Algorithms",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 2,
  } as ICourse);
  system.addCourse({
    name: "Economics Basics",
    type: CourseType.Optional,
    credits: 4,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 3,
  } as ICourse);

  // --- Додаємо студентів
  const st1 = system.enrollStudent({
    fullName: "Іван Петренко",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-11",
  } as IStudent);

  const st2 = system.enrollStudent({
    fullName: "Олег Сидоренко",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-11",
  } as IStudent);

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
  console.log(
    "Відмінники CS:",
    system.getExcellentStudents(Faculty.Computer_Science)
  );
}

main();
