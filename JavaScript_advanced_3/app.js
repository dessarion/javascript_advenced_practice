const x = 1;
const y = '1';

if (x == y) { // Using == not a best practice use === as a default
    console.log('Equals');
} else {
    console.log('Different');
};

//Неявное использование == !!

const zero = 0;

if(zero){ // zero == true ( неявное использование == )
    console.log('Variable exists');    
}else{
    console.log(`variable ${zero} does not exists)`);
};

const bestPracticeZero = 0;

if(bestPracticeZero !== undefined){ //явная бест практис проверка
    console.log('Variable exists'); 
} else {
    console.log(`variable ${zero} does not exists)`);
};

//Hoisting 

//Functions

declaraton();

expression(); //ReferenceError: Cannot access 'expression' before initialization

const expression = function(){
    console.log('Expression');
}

function declaraton(){
    console.log('Declaration');
    
}

/**
 * using JSdoc is aslo bestpractice
 * чтоб показать что делает тот или иной 
 * метод и чтоб просто не запутатся в большом коде
 */