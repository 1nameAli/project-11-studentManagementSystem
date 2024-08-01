import inquirer from "inquirer";
class Course {
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
class Student {
    name;
    age;
    grade;
    courses = [];
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
    updateDetails(newName, newAge, newGrade) {
        this.name = newName;
        this.age = newAge;
        this.grade = newGrade;
    }
    purchaseCourse(course) {
        this.courses.push(course);
        console.log(`Course purchased: ${course.name} for $${course.price}`);
    }
    viewCourses() {
        console.log(`Courses for ${this.name}:`);
        this.courses.forEach(course => {
            console.log(`- ${course.name}: $${course.price}`);
        });
    }
}
class StudentManagement {
    students = [];
    courses = [
        new Course('Math 101', 100),
        new Course('Science 101', 120),
        new Course('History 101', 80)
    ];
    addStudent(name, age, grade) {
        const student = new Student(name, age, grade);
        this.students.push(student);
        console.log(`Added student: ${name}`);
    }
    updateStudent(name, newName, newAge, newGrade) {
        const student = this.students.find(student => student.name === name);
        if (student) {
            student.updateDetails(newName, newAge, newGrade);
            console.log(`Updated student: ${name}`);
        }
        else {
            console.log(`Student not found: ${name}`);
        }
    }
    deleteStudent(name) {
        const index = this.students.findIndex(student => student.name === name);
        if (index !== -1) {
            this.students.splice(index, 1);
            console.log(`Deleted student: ${name}`);
        }
        else {
            console.log(`Student not found: ${name}`);
        }
    }
    viewStudents() {
        console.log('Student List:');
        this.students.forEach(student => {
            console.log(`Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
        });
    }
    findStudent(name) {
        return this.students.find(student => student.name === name);
    }
    getCourses() {
        return this.courses;
    }
}
const studentManagement = new StudentManagement();
const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add Student', 'Update Student', 'Delete Student', 'View Students', 'Purchase Course', 'View Student Courses', 'Exit']
        }
    ]);
    switch (answers.action) {
        case 'Add Student':
            await addStudent();
            break;
        case 'Update Student':
            await updateStudent();
            break;
        case 'Delete Student':
            await deleteStudent();
            break;
        case 'View Students':
            viewStudents();
            break;
        case 'Purchase Course':
            await purchaseCourse();
            break;
        case 'View Student Courses':
            await viewStudentCourses();
            break;
        case 'Exit':
            console.log('Goodbye!');
            return;
    }
    mainMenu();
};
const addStudent = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the student name:'
        },
        {
            type: 'number',
            name: 'age',
            message: 'Enter the student age:',
            validate: value => value > 0 || 'Age must be positive.'
        },
        {
            type: 'input',
            name: 'grade',
            message: 'Enter the student grade:'
        }
    ]);
    studentManagement.addStudent(answers.name, answers.age, answers.grade);
};
const updateStudent = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the student to update:'
        },
        {
            type: 'input',
            name: 'newName',
            message: 'Enter the new student name:'
        },
        {
            type: 'number',
            name: 'newAge',
            message: 'Enter the new student age:',
            validate: value => value > 0 || 'Age must be positive.'
        },
        {
            type: 'input',
            name: 'newGrade',
            message: 'Enter the new student grade:'
        }
    ]);
    studentManagement.updateStudent(answers.name, answers.newName, answers.newAge, answers.newGrade);
};
const deleteStudent = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the student to delete:'
        }
    ]);
    studentManagement.deleteStudent(answers.name);
};
const viewStudents = () => {
    studentManagement.viewStudents();
};
const purchaseCourse = async () => {
    const studentAnswer = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the student name:'
        }
    ]);
    const student = studentManagement.findStudent(studentAnswer.name);
    if (!student) {
        console.log('Student not found.');
        return;
    }
    const courseChoices = studentManagement.getCourses().map(course => ({
        name: `${course.name}: $${course.price}`,
        value: course
    }));
    const courseAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'course',
            message: 'Select a course to purchase:',
            choices: courseChoices
        }
    ]);
    student.purchaseCourse(courseAnswer.course);
};
const viewStudentCourses = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the student name:'
        }
    ]);
    const student = studentManagement.findStudent(answers.name);
    if (student) {
        student.viewCourses();
    }
    else {
        console.log('Student not found.');
    }
};
mainMenu();
