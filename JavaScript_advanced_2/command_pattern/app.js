const repo = {
    tasks: {},
    commands: [],
    getTask(id){
        console.log(`Getting task ${id}`);
        return repo.tasks[id]
    },
    save(task){
        repo.tasks[task.id] = task;
        console.log(`Saving ${task.name} to the db.`);
    },
    execute(name){
        const args = Array.prototype.splice.call(arguments,1);
        repo.commands.push({
            name:name,
            obj: args[0],

        });
        if(repo[name]){
            return repo[name].apply(repo,args)
        }
        return false
    },
    executeNoLog(name){
        const args = Array.prototype.splice.call(arguments,1);
        
        if(repo[name]){
            return repo[name].apply(repo,args)
        }
        return false
    },
    replay(){
        for(let i = 0; i < repo.commands.length; i++){
            const comand = repo.commands[i];

            repo.executeNoLog(comand.name, comand.obj)
        }
    }
};

for(let i = 0; i < 5; i++){
    repo.execute('save',{
        id: i,
        name: `Task ${i}`,
    })
}

console.log(repo.tasks);
repo.tasks = {}
console.log(repo.tasks);
console.log(repo.commands);
repo.replay()
console.log(repo.tasks);


