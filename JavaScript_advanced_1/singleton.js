console.group('Singletone pattern');

const TaskRepo = (function(){ //Шаблон синглтона
    let task;

    function createRepo(){
        task = new Object('tAsk');
        return task;
    };

    return {
        getInstance: function(){
            if(!task){
              task = createRepo();
            }  
            return task
        }
    }
})(); 

