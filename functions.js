import { createInterface } from "readline";
import chalk from "chalk";
import { redeploy } from "./index.js";

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const passengers = [];
const cities = [];
const countries = [];

export const addPassanger = () => {
  rl.question(chalk.bold("\n Ingresa tu cedula: "), (cedula) => {
    if (!parseInt(cedula)) {
      console.log(
        chalk.black.bgYellow.bold("\nLa cedula ingresada no es válida\n")
      );
      redeploy();
    } else {
      const passengerExist = passengers.find(
        (passenger) => passenger.cedula === cedula
      );

      if (passengerExist) {
        console.log(
          chalk.black.bgYellow.bold(
            "\nEl pasajero ya existe registrado con ese numero de cédula\n"
          )
        );
        redeploy();
      } else {
        rl.question(chalk.bold("\n Ingresa tu nombre: "), (nombre) => {
          rl.question(
            chalk.bold("\n Ingresa la ciudad destino: "),
            (ciudad) => {
              const cityExist = cities.find(
                (city) =>
                  city.trim().toLowerCase() === ciudad.trim().toLowerCase()
              );

              if (!cityExist) {
                cities.push(ciudad);
              }

              rl.question(
                chalk.bold("\n Ingresa el pais destino: "),
                (pais) => {
                  const countryExist = countries.find(
                    (country) =>
                      country.trim().toLowerCase() === pais.trim().toLowerCase()
                  );

                  if (!countryExist) {
                    countries.push(pais);
                  }

                  passengers.push({ cedula, nombre, ciudad, pais });

                  console.log(
                    chalk.black.bgGreen.bold(
                      "\n\n\n Pasajero agregado con éxito \n\n\n"
                    )
                  );
                  redeploy();
                }
              );
            }
          );
        });
      }
    }
  });
};

export const getPassanger = () => {
  if (passengers.length === 0) {
    console.log(
      chalk.black.bgYellow.bold("\n\n\nNo hay pasajeros para buscar\n\n\n")
    );
    redeploy();
  } else {
    rl.question(
      chalk.green.underline.bold(
        "Ingresa la cedula del pasajero que desea buscar: "
      ),
      (cedula) => {
        const passenger = passengers.find(
          (passenger) => passenger.cedula === cedula
        );

        if (passenger) {
          console.log(
            chalk.white("\n\n\n El pasajero "),
            chalk.green.bold(`${passenger.nombre}`),
            chalk.white(" se dirije con destino hacia "),
            chalk.green.bold(`${passenger.ciudad}\n\n\n`)
          );

          rl.question("Presiona enter para regresar al menú", () => {
            redeploy(0);
          });
        } else {
          console.log(
            chalk.black.bgYellow.bold("\n\n\nPasajero no encontrado\n\n\n")
          );
          redeploy();
        }
      }
    );
  }
};

export const getAllPassengers = () => {
  if (passengers.length === 0) {
    console.log(
      chalk.black.bgYellow.bold("\n\n\nNo hay registros de pasajeros\n\n\n")
    );
    redeploy();
  } else {
    passengers.forEach((passenger) => {
      console.log(
        chalk.black.bgGreen.bold("\n\n\nCC:"),
        `${passenger.cedula} `,
        chalk.black.bgGreen.bold("Pasajero:"),
        `${passenger.nombre} `,
        chalk.black.bgGreen.bold("Destino:"),
        `${passenger.ciudad}, ${passenger.pais}\n\n\n`
      );
    });

    rl.question("Presiona enter para regresar al menú", () => {
      redeploy(0);
    });
  }
};

export const passengersPerCity = () => {
  console.log(
    chalk.green.bold(
      chalk.black.bgCyan.bold("\nLista de ciudades con pasajeros\n")
    )
  );

  if (cities.length === 0) {
    console.log(
      chalk.black.bgYellow.bold("\n\n\n No hay ciudades que mostrar \n\n\n")
    );
    redeploy();
  } else {
    cities.forEach((city, index) =>
      console.log(chalk.bold(`  ${index + 1}  -  ${city}`))
    );

    rl.question(
      chalk.green.bold.underline("\nSelecciona el numero de la ciudad: "),
      (cityNumber) => {
        if (
          parseInt(cityNumber) >= 1 &&
          parseInt(cityNumber) <= cities.length
        ) {
          const getCityPassengers = passengers.filter(
            (passenger) => passenger.ciudad === cities[cityNumber - 1]
          );

          console.log(
            chalk.white("\n\n\n Pasajeros con destino a "),
            chalk.green.bold(`${cities[cityNumber - 1]}\n`)
          );
          getCityPassengers.forEach((passenger) =>
            console.log(
              chalk.black.bgGreen.bold(" Pasajero:"),
              ` ${passenger.nombre} - `,
              chalk.black.bgGreen.bold("CC:"),
              ` ${passenger.cedula}`
            )
          );
          console.log(
            chalk.blue.bold(
              `\n Total pasajeros: ${getCityPassengers.length} \n\n\n`
            )
          );
          rl.question("Presiona enter para regresar al menú", () => {
            redeploy(0);
          });
        } else {
          console.log(
            chalk.bgRed.white.bold(
              "\n\n\nHas elegido una opción incorrecta, por favor elige una de la lista \n\n\n"
            )
          );
          redeploy();
        }
      }
    );
  }
};

export const passengersPerCountry = () => {
  console.log(
    chalk.green.bold(
      chalk.black.bgCyan.bold("\nLista de paises con pasajeros\n")
    )
  );

  if (countries.length === 0) {
    console.log(
      chalk.black.bgYellow.bold("\n\n\n No hay paises que mostrar \n\n\n")
    );
    redeploy();
  } else {
    countries.forEach((country, index) =>
      console.log(chalk.bold(`  ${index + 1}  -  ${country}`))
    );

    rl.question(
      chalk.green.bold.underline("\nSelecciona el numero del pais: "),
      (countryNumber) => {
        if (
          parseInt(countryNumber) >= 1 &&
          parseInt(countryNumber) <= countries.length
        ) {
          const getCountryPassengers = passengers.filter(
            (passenger) => passenger.pais === countries[countryNumber - 1]
          );

          console.log(
            chalk.white("\n\n\n Pasajeros con destino a "),
            chalk.green.bold(`${countries[countryNumber - 1]}\n`)
          );
          getCountryPassengers.forEach((passenger) =>
            console.log(
              chalk.black.bgGreen.bold(" Pasajero:"),
              ` ${passenger.nombre} - `,
              chalk.black.bgGreen.bold("CC:"),
              ` ${passenger.cedula}`
            )
          );
          console.log(
            chalk.blue.bold(
              `\n Total pasajeros: ${getCountryPassengers.length} \n\n\n`
            )
          );
          rl.question("Presiona enter para regresar al menú", () => {
            redeploy(0);
          });
        } else {
          console.log(
            chalk.bgRed.white.bold(
              "\n\n\nHas elegido una opción incorrecta, por favor elige una de la lista \n\n\n"
            )
          );
          redeploy();
        }
      }
    );
  }
};
