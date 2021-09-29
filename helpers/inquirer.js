const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.red } Buscar Ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.yellow } Historial`
            },
            {
                value: 0,
                name: `${ '3.'.green } Salir`
            },
        ]
    }
];

const inquirerMenu = async() => {
    
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opcion   '.white);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    console.log('\n\n');
    // type: 'input'
    const continuar = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar...`
        }
    ];
    await inquirer.prompt(continuar);
}

const leerInput = async( message ) => {
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,

            // esta funcion valida la entrada del la pregunta
            // en este caso validamos si la entrada no esta en blanco
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async( lugares = [] ) => {

    const choices = lugares.map( (lugar, index) => {
        const i = `${ index + 1}.`.green;

        return {
            value: lugar.id,
            name: `${ i } ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un Lugar:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);

    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {
        const i = `${ index + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ i } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions);

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}