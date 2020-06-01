console.group('Factory pattern');
//*                 -----*-----
class Person {
    constructor(person){
        this.name = person.name,
        this.isComplete = false
    };

    complete(){
        console.log(`Person ${this.name} is verified`);
        this.isComplete = true
    }
};
//*                 -----*-----
const creationDepartament =(function(){
    const dataBase = [];

    function get(id){
        if(id && dataBase.length) {
            console.log(`Getting ID number ${id} from database`);
            return dataBase[id]
        }else if (id === 0) {
            console.log(`Getting first task "${dataBase[id].name}" from database`);
            return dataBase[id]
        }
    };

    function create(person){
        if(person){
            const personInfo = new Person(person)
            console.log(`"${person.name}" is successfuly added to database`)
            dataBase.push(person)
            return personInfo
        }
    }
    
    return {
        get: get,
        create: create
    }
})();
//*
const employerDepertament = (function(){
    const dataBase = [
        {
            name: 'Elon Musk'
        }
    ];

    function get(index){
        return dataBase[index]
    };

    return {
        getEmployer: get
    }
})();
//*                 -----*-----
const dataDepertament = (function(){
    const dataBase = [
        {
            name: 'Jimmy Hendrix'
        }
    ];

    function get(index){
        return dataBase[index]
    };

    return {
        get: get
    }
})();
//*                 -----*-----
const factoryPattern = (function(){ //Создаем фабрику
    let departaments = [];

    const departamentsList = [
        {
            name: 'creationDepartament',
            source: creationDepartament
        },
        {
            name: 'employerDepertament',
            source: employerDepertament
        },
        {
            name: 'dataDepertament',
            source: dataDepertament
        }
    ];

    departaments = departamentsList.map( (departament) => { //Создаем карту ссылок на наши модули
        return {
            [departament.name]:departament.source
        }
    });

    return departaments
})();

const personOne = factoryPattern[0].creationDepartament.create({name: 'Dessarion'});
personOne.employerDepertament = factoryPattern[1].employerDepertament.getEmployer(0);
personOne.dataDepertament = factoryPattern[2].dataDepertament.get(0)

console.log(personOne)

console.groupEnd()