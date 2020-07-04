class Task {
    constructor(data){
        this.taskName = data.taskName
        this.userName = data.userName
        this.isCompleted = false
    }

    complete(){
        console.log(`completing task ${this.taskName}`);
        this.isCompleted = true
    }

    save(){
        console.log(`saving task ${this.taskName}`);
    }
};

class ServiceList {
    constructor(){
        this.observers = []
    }

    addToList(service){
        this.observers.push(service)
    }

    removeFromList(service){
        this.observers = this.observers.filter(srvc => srvc !== service)
    }

    trigger(task){
        this.observers.forEach( srvc => {
            srvc.update(task)
        })
    }
}

const UserNotificationService = (function(){

    const message = 'Notifying';

    function update(task){
        console.log(`${message} ${task.userName} for ${task.taskName}`);
    };

    return {
        update:update
    };

})();

const UserLoggingService = (function(){

    const message = 'Logging';

    function update(task){
        console.log(`${message} ${task.userName} for ${task.taskName}`);
    };

    return {
        update:update
    };

})();

const UserAuditingService = (function(){

    const message = 'Auditing';

    function update(task){
        console.log(`${message} ${task.userName} for ${task.taskName}`);
    };

    return {
        update:update
    };

})();

class TaskWithObservers extends Task{
    constructor(data){
        super(data);
        this.services = new ServiceList()
    }

    add(service){
        this.services.addToList(service)
    }

    remove(service){
        this.services.removeFromList(service)
    }

    fire(){
        this.services.trigger(this);
        super.save(this)
    }
}

const testTaskObj = {
    taskName: 'Test',
    userName: 'Dessarion'
};

const task = new Task(testTaskObj);

const stream = new ServiceList();

stream.addToList(UserNotificationService);
stream.addToList(UserLoggingService);
stream.addToList(UserAuditingService);

stream.trigger(task);

const testTaskObj2 = {
    taskName: 'Decorated task',
    userName: 'Boris'
}

const updatedStream = new TaskWithObservers(testTaskObj2);

updatedStream.add(UserNotificationService);
updatedStream.add(UserLoggingService);
updatedStream.add(UserAuditingService);

updatedStream.fire()