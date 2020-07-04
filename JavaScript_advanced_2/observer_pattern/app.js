class Task {
    constructor(object){
        this.name = object.name,
        this.user = object.user,
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

class ObserverList {
    constructor(){
        this.observerList = [] //Массив из наблюдателей
    }

    add(obj) {
        return this.observerList.push(obj) //Добавляем наблюдателя в массив
    }

    get(index){
        if(index > -1 && this.observerList.length){ //Находим наблюдателя по индексу
            return this.observerList[index]
        }
    }

    removeAt(index){
        this.observerList.splice(index, 1) //Удаляем наблдателя по индексу
    }

    findIndex(obj,startIndex){ // Поиск индекса по наблюдателю
        let i = startIndex;
        while(i < this.observerList.length) {
            if(this.observerList[i] === obj) {
                return i
            }
            i++;
        }
        return -1
    }

    getCount(){ //Количество наблюдателей
        return this.observerList.length
    }
}

class ObservableTask extends Task {
    constructor(object){
        super(object)
        this.observers = new ObserverList() //Передаем интерфейс управления наблюдателями
    }

    addObserver(observer){
        this.observers.add(observer) //Добавляем наблюдателя
    }

    removeObserver(observer){ //Удаляем наблюдаетеля на основе переданного интерфейса с класса ObserverList
        this.observers.removeAt(this.observers.findIndex(observer, 0))
    }

    notify(context){ //Триггер всех наблюдателей по цыклу
        let observersCount = this.observers.getCount();
        for(let i = 0; i < observersCount; i++){
            this.observers.get(i)(context); //Передача контекста в наблюдателя в момент итерации 
        }
    }
    save(){
        this.notify(this); //Контекст есть переданный объект в наблюдателя (notify это цыкл триггеров(барабан в пистолете))
        super.save(); //Метод из Task так как (ObservableTask extends Task)
    }
}
const NotificationService = (function(){
    const message = 'Notifying';

    function update(data){
        console.log(`${message} ${data.user} for task ${data.name}`)
    };
    return {
        update:update //Так как мы возвращаем функцию которая принимает объект то (notify(this))
        //из описанного выше и есть имеет ввиду что контекст есть в данном случае data
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

const task = new ObservableTask ({name: 'Dessarions task', user: 'Dessarion'});

task.addObserver(NotificationService.update);
task.addObserver(LoggingService.update);
task.addObserver(AuditingService.update);

task.save()