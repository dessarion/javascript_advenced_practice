class Task {
    constructor(data) {
        this.name = data.name,
        this.flyweight = FlyweightFactory.get(data.priority, data.project, data.user, data.isCompleted) //Заменяем наши данные данными из фабрики
        // this.priority = data.priority,
        // this.project = data.project,
        // this.user = data.user,
        // this.isCompleted = data.isCompleted
    }
}

//Для оптимизации и экономии памяти и приходит на помощ паттерн Flyweight

// **Flyweight**

class Flyweight {
    constructor(priority, project, user, isCompleted) {
        //в конструктор паттерна передаем НЕ уникальные данные !!
        //логику приема передачи которых необхоимо немного изменить относительно 
        //класса выше
        this.priority = priority,
            this.project = project,
            this.user = user,
            this.isCompleted = isCompleted
    }
};

const FlyweightFactory = (function () {
    const flyweights = {};

    return {
        get:get,
        getCount:getCount
    }

    function get(priority, project, user, isCompleted) {
        if (!flyweights[priority + project + user + isCompleted]) {
            flyweights[priority + project + user + isCompleted] = new Flyweight(priority, project, user, isCompleted)
        }
        return flyweights[priority + project + user + isCompleted]
    };

    function getCount() {
        let count = 0;
        for (let f in flyweights) count++; //упускаем фигурные скобки так как тело один рядок
        return count;
    }
})();

const TaskColectionService = (function () {
    let tasks = {};
    let count = 0;

    return {
        add: add,
        getTask: getTask,
        getCount: getCount
    }

    //Создаем метод конструктор который принимает объект для класса Task
    //и создает поле в объекте tasks с ключем по имени tasks[data.name]
    //и значением самого объекта
    function add(data) {
        tasks[data.name] = new Task(data);
        count++
    };

    //принимает имя Task и Возвращает объект из переменной tasks по ключу tasks[name]
    function getTask(name) {
        return tasks[name];
    };

    function getCount() {
        return count
    };


})();

let projects = ['Alfa', 'Beta', 'Gamma', 'Delta', 'Lambda'];
let priorityes = [1, 2, 3, 4, 5];
let users = ['Dessarion', 'Jana', 'Musk', 'Rogan Joe'];
let completed = [true, false]

//метот для nodeJS анализирует используемую память
let initialMemory = process.memoryUsage().heapUsed

//создадим генератор заданий для наглядности
for (let i = 0; i < 1000000; i++) {
    TaskColectionService.add({
        name: `Task ${i}`,
        priority: priorityes[Math.floor(Math.random() * 5)],
        project: projects[Math.floor(Math.random() * 5)],
        user: users[Math.floor(Math.random() * 4)],
        isCompleted: completed[Math.floor(Math.random() * 2)],
    })
}

//метот для nodeJS анализирует используемую память после создания большого количества объектов
let afterMemory = process.memoryUsage().heapUsed

//выводим на консоль разницу по памяти до и помсле

console.log(`Memory Used : ${(afterMemory - initialMemory) / 1000000}`);
console.log(`Tasks ${TaskColectionService.getCount()}`)


//Ниже сравнение по памяти
//Первый случай классика
//Второй flyweight
// PS E:\Projects\ws\logos\javascript_advanced\practice\lesson_2\flyweight_pattern> node app
// Memory Used : 196.38532
// Tasks 1000000
// PS E:\Projects\ws\logos\javascript_advanced\practice\lesson_2\flyweight_pattern> node app
// Memory Used : 176.819224
// Tasks 1000000
