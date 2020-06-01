const repo1 = TaskRepo.getInstance(); 
const repo2 = TaskRepo.getInstance();

if(repo1 === repo2){
    console.log('Match') //Если создан то только однажды(т.е объект уникальный)
}


const repo = (function(){

    let count = 0;

    function save(task){
        count++;
        console.log(`Saving ${task}, was called ${count} times`)
    };

    return {
        save: save
    };
})();

const taskHandler = (function(){
    return {
        save: function() {
            repo.save('from task handler') //По сути это и есть наслоедование
        }
    }
})();

repo.save('From main');
repo.save('From main');
repo.save('From main');
taskHandler.save();
taskHandler.save()
taskHandler.save()
taskHandler.save()

console.groupEnd()
