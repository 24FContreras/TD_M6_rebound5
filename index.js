//REBOUND EXERCISE: DESCRIBE AUTO
const fs = require("fs");

const argumentosTerminal = process.argv.slice(2);

//ARGS
const opcion = argumentosTerminal[0];
const vehiculo = argumentosTerminal[1];
const propiedad = argumentosTerminal[2];
const valor = argumentosTerminal[3];

const obtenerVehiculos = async () => {
  const opcion = argumentosTerminal[0];
  const vehiculo = argumentosTerminal[1];

  try {
    const autos = fs.readFileSync("./data/autos.json", "utf8");
    const autosJson = JSON.parse(autos);

    console.log(`
----------------------------------------
Obteniendo información...
----------------------------------------`);

    if (!Object.keys(autosJson).length) {
      return console.log("🚧 No existen vehículos en el archivo");
    }

    if (vehiculo) {
      if (!autosJson[vehiculo]) {
        return console.log("🚧 El vehículo seleccionado no existe");
      }

      return console.log(autosJson[vehiculo]);
    }

    return console.log(autosJson);
  } catch (error) {
    console.log("Ha habido un error");
  }
};

const modificarVehiculo = async () => {
  try {
    const autos = fs.readFileSync("./data/autos.json", "utf8");
    const autosJson = JSON.parse(autos);

    console.log(`
----------------------------------------
Iniciando modificación...
----------------------------------------`);

    if (!Object.keys(autosJson).length) {
      return console.log("🚧 No existen vehículos en el archivo");
    }

    if (!autosJson[vehiculo]) {
      return console.log("🚧 El vehículo seleccionado no existe");
    }

    const vehiculoActualizado = { ...autosJson[vehiculo], [propiedad]: valor };

    fs.writeFileSync(
      "./data/autos.json",
      JSON.stringify({ ...autosJson, [vehiculo]: { ...vehiculoActualizado } })
    );
    console.log("El vehículo se ha modificado exitosamente");
  } catch (error) {
    console.log("Ha habido un error");
  }
};

const verificarInput = () => {
  const opciones = ["leer", "modificar"];

  if (!argumentosTerminal.length || !opciones.includes(opcion)) {
    console.log(`Por favor, ejecute el programa con alguno de los siguientes comandos:
1) leer: Muestra todos los autos del archivo 
2) leer -auto: Muestra los datos del auto seleccionado 
1) modificar -auto -propiedad -valor: Ingresa o modifica una propiedad al auto seleccionado
    `);
    return process.exit();
  }
};

const validarEntrada = () => {
  switch (opcion) {
    case "leer":
      obtenerVehiculos();
      break;
    case "modificar":
      modificarVehiculo();
      break;
    default:
      verificarInput();
  }
};

validarEntrada();
