class Task {
    constructor(data) {
        this.name = data.name,
            this.priority = data.priority,
            this.project = data.project,
            this.user = data.user,
            this.isCompleted = data.isCompleted
    }
}

const TaskService = (function () {
    return {
        complete: complete,
        setCompletedDate: setCompletedDate,
        notify: notify,
        save: save
    };

    function complete(task) {
        task.isCompleted = true;
        console.log(`completing task ${task.name}`)
    };

    function setCompletedDate(task) {
        task.completedDate = new Date();
        console.log(`Task : ${task.name} completed on ${task.completedDate}`)
    };

    function notify(task, user) {
        console.log(`${user} completing task ${task.name}`)
    };

    function save(task) {
        console.log(`Saving task ${task.name}...`);
        setTimeout(() => {
            console.log(`${task.name} succesfully saved`)
        }, 1000);
    }
})();

const myTask = new Task({
    name: 'My Task',
    priority: 1,
    project: 'My App',
    user: 'Dessaion',
    isCompleted: false
});

// TaskService.complete(myTask);

// if(myTask.isCompleted){
//     TaskService.setCompletedDate(myTask);
//     TaskService.notify(myTask, myTask.user);
//     TaskService.save(myTask)
// };

//Фассад это объеденение операции из цепочки метододов в одну функцию(module) или метод
//Например

const MyTaskServiceWrapper = (function () {

    return {completeAndNotify:completeAndNotify}

    function completeAndNotify() {
        TaskService.complete(myTask);

        if (myTask.isCompleted) {
            TaskService.setCompletedDate(myTask);
            TaskService.notify(myTask, myTask.user);
            TaskService.save(myTask)
        };
    }
})()

console.log(myTask);

MyTaskServiceWrapper.completeAndNotify()