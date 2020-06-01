console.group('Warming and object patterns')
// Warming =)

const warming = {
    name: 'Dessarion',
    position: 'Front-end developer'
};

Object.defineProperty (warming , 'sayHello' , { //Назначение новыйх методов иди свойств
    //метот Object.defineProperty принимает (объект , "название строкой",  {описание в проперти дискриптор формате})
    value: function(){
        return `${this.name} is working on ${this.position} position`
    },
    writable: false,
    enumerable: false,
    configurable: true
});

//Inheritance (Наследование)

const inheritanceWarming = Object.create(warming);

Object.defineProperty(inheritanceWarming, 'sayHello' , {
    value: () => {
        return `this${this.title}`
    }
 });


 //Constructors patterns

 const Constructor = function (name){ //стандартный конструктор es5
     this.name = name;
     this.isComplete = false //флаг для новичков, которым удобно отслеживать состояние и работу кода
 };

 Constructor.prototype.complete = function(){ //Добавляем прототипу метод
     console.log(`completing constructing ${this.name}`);
     this.isComplete = true //меняем флаг для наглядности
 };

 Constructor.prototype.save = function(){
     console.log(`Constructor ${this.name} is saved!`)
 };

 const demonstrationOne = new Constructor ('demonstration One');
 const demonstrationTwo = new Constructor ('demo Two');
 const finalDemonstration = new Constructor ('Will it be final demo?');

 demonstrationOne.complete();
 demonstrationTwo.save();
 finalDemonstration.save();

 //Constructors patterns es6

 class RoboticConstructor {
     constructor(values){
        this.name = values.name,
        this.isComplete = false
     };
     complete(){
        console.log(`completing constructing ${this.name}`); 
        this.isComplete = true;
     };
     save(){
        console.log(`Constructor ${this.name} is saved!`)
     }
 };

 const demoOne = new RoboticConstructor({
     name: 'Demo Robotic'
 });

 demoOne.complete();
 demoOne.save();

 console.groupEnd()