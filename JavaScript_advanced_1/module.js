console.group('Module pattern')
const module =(function(){
    const dataBase = [];

    function get(id){ //Обьявление приватных методов
        if(id && dataBase.length) {
            console.log(`Getting ID number ${id} from database`);
            return dataBase[id]
        }else if (id === 0) {
            console.log(`Getting first task "${dataBase[id].name}" from database`);
            return dataBase[id]
        }
    };

    function save(task){
        if(task){ //Проверка передено ли значение
            console.log(`"${task.name}" is successfuly added to database`)
            dataBase.push(task)
        }
    }
    //Все данные внутри этой функции(модуля) имеют собственную область видимости
    //и достучатся из вне к ним не представляется возможным
    //для этого необходимо что то вернуть
    return { //Обявление публичных методов
        get: get, //Тут необходимо передават ссылку а не вызивать функцию
        save: save //раньше времени
    }
})();

class Task {
    constructor(values){
        this.name = values.name,
        this.isComplete = false
    };

    complete(){
        console.log(`Task ${this.task} is complete`);
        this.isComplete = true
    }
};

const firstTask = new Task({
    name: 'JavaScript core'
});

module.save(firstTask);
module.get(0);
console.groupEnd()