class Task {
    constructor(object){
        this.name = object.name,
        this.user = object.user,
        this.priority = object.priority,
        this.project = object.project,
        this.isCompleted = false
    }

    complete(){
        console.log(`Task ${this.name}, is completed.`);
        this.isCompleted = true
    }

    save(){
        console.log(`Task ${this.name}, is saved.`)
    }
};

const NotificationService = (function(){
    const message = 'Notifying';

    function update(task){
        console.log(`${message} ${task.user} for task ${task.name}`)
    };
    return {
        update:update
    }
})();

const LoggingService = (function(){
    const message = 'Logging';

    function update(task){
        console.log(`${message} ${task.user} for task ${task.name}`)
    };
    return {
        update:update
    }
})();

const AuditingService = (function(){
    const message = 'Auditing';

    function update(task){
        console.log(`${message} ${task.user} for task ${task.name}`)
    };
    return {
        update:update
    }
})();

const mediator = (function(){

    return {
        chanels: {},
        subscribe:subscribe,
        publish:publish
    }

    function subscribe(channel,context,fun){
        if(!mediator.chanels[channel]){
            mediator.chanels[channel] = []
        }
        mediator.chanels[channel].push({
            context:context,
            fun:fun
        })
    };

    function publish(channel){
        if(!this.chanels[channel]){
            return false
        }
        
        const args = Array.prototype.slice.call(arguments,1)
        debugger
        for(let i = 0; i < mediator.chanels[channel].length; i++){
            const sub = mediator.chanels[channel][i];
            sub.fun.apply(sub.context,args)
        }
    }
})()

const myTask = new Task ({
    name: 'Some new task',
    user: 'Joel',
    priority: 1,
    project: 'My app',
    isCompleted: false
})

mediator.subscribe('complete',NotificationService,NotificationService.update);
mediator.subscribe('complete',LoggingService,LoggingService.update);
mediator.subscribe('complete',AuditingService,AuditingService.update);
myTask.complete = function(){
    mediator.publish('complete',this)
    Task.prototype.complete.call(this)
}
myTask.complete()