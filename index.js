import chalk from "chalk";
import figlet from "figlet";
import {
  addPassanger,
  getAllPassengers,
  getPassanger,
  passengersPerCity,
  passengersPerCountry,
} from "./functions.js";
import { rl } from "./functions.js";

export const redeploy = () => {
  setTimeout(() => {
    displayMenu();
    displayOptions();
  }, 2000);
};

const displayMenu = () => {
  console.log(chalk.green.bold.bgBlack(figlet.textSync("Airport Service")));
  console.log(chalk.bold("\nPor favor selecciona una opcion \n"));
  console.log(chalk.bold("1) ✈️  Agregar pasajero"));
  console.log(chalk.bold("2) 🧑🏽‍🤝‍🧑🏿  Ver todos los pasajeros"));
  console.log(chalk.bold("3) 🕵️  Ver a que ciudad viaja un pasajero"));
  console.log(
    chalk.bold("4) 🕵️  Ver la cantidad de pasajeros que viajan a una ciudad")
  );
  console.log(
    chalk.bold("5) 🌎 Ver la cantidad de pasajeros que viajan a un pais")
  );
  console.log(chalk.bold("0) ❌ Para salir \n"));
};

const displayOptions = () => {
  rl.question(
    chalk.underline.green.bold("Ingresa la opcion que deseas: "),
    (option) => {
      switch (option) {
        case "1":
          addPassanger();
          break;
        case "2":
          getAllPassengers();

          break;
        case "3":
          getPassanger();
          break;
        case "4":
          passengersPerCity();
          break;
        case "5":
          passengersPerCountry();
          break;
        case "0":
          console.log(chalk.bold("\n\n\n Adiós 🙋🏽 \n\n\n"));
          rl.close();

          break;
        default:
          console.log(
            chalk.white.bgRed.bold(
              "\n\n Opcion incorrecta, por favor intentalo de nuevo\n\n"
            )
          );
          redeploy();
      }
    }
  );
};

displayMenu();
displayOptions();
