class Person {
  name: string;
  age: number;
  isStudent: boolean;
  grade?: { subject: string; score: number }[];

  sayHello(): void {
    console.log(
      `Користувач: ${this.name}, Вік: ${this.age}, Студент: ${this.isStudent}`
    );

    if (this.grade && this.isStudent) {
      this.grade.forEach((g) =>
        console.log(`Предмет: ${g.subject}, Оцінка: ${g.score}`)
      );
    }

    console.log("-------------------");
  }

  constructor(
    name: string,
    age: number,
    isStudent: boolean,
    grade?: { subject: string; score: number }[]
  ) {
    this.name = name;
    this.age = age;
    this.isStudent = isStudent;
    this.grade = grade;
  }
}

const person1 = new Person("Den", 20, true, [
  { subject: "Math", score: 95 },
  { subject: "Physics", score: 90 },
]);
person1.sayHello();

const person2 = new Person("NoDen", 25, false, [
  { subject: "Math", score: 95 },
]);
person2.sayHello();
