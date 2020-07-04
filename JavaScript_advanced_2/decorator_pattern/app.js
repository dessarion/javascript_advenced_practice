class Task {
    constructor(object) {
        this.name = object.name,
            this.isCompleted = false
    }

    complete() {
        console.log(`complete task : ${this.name}`);
        this.isCompleted = true
    }

    save() {
        console.log(`saving Task : ${this.name}`)
    }
}

//Базовый пример декоратора

const firstTask = {
    name: 'some task'
}
const task = new Task(firstTask);
task.complete();
task.save();

// const urgentTask = new Task({
//     name: 'Important task'
// });
// urgentTask.priority = 2;
// urgentTask.notify = () => {
//     console.log('Notifying important people')
// };
// urgentTask.complete();
// urgentTask.save = function() {
//     this.notify();
//     Task.prototype.save.call(this)
// };
// urgentTask.save()

//Боллее универсальный сложный метод декоратора

class Urgent extends Task {
    constructor(object) {
        super(object)
        this.priority = object.priority
    };

    notify() {
        console.log('Notifying important people')
    };

    save() {
        super.save() //Вызов метода прототипа
        setTimeout(() => {
            this.notify();           
            console.log(`Special stuff from => ${this.name}, with ${this.priority} priority index! Saved...`)
        }, 1000);
    }
};

const urgentTask = new Urgent({
    name: 'Urgent task',
    priority: 2,
});

urgentTask.complete();
urgentTask.save()

//Вывод - декораторы это не более чем прототипное наследование через классы