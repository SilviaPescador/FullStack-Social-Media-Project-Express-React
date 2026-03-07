const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

const now = dayjs();
const utcNow = dayjs.utc();
const localTime = now.format("DD-MM-YY HH:mm:ss Z");
const utcTime = utcNow.format("DD-MM-YY HH:mm:ss Z");

const diferenciaHoraria = dayjs().utcOffset() / 60;

console.log("Hora local:" + localTime);
console.log("Hora UTC: " + utcTime);
console.log(`Diferencia horaria con UTC: ${diferenciaHoraria} horas`);

const fecha1 = "1980-06-06";
const fecha2 = "1910-01-01";

if (dayjs(fecha1).isBefore(fecha2)) {
	console.log(
		"La fecha1: " + fecha1 + " es anterior  la fecha2: " + fecha2
	);
} else {
	console.log(
		"La fecha1: " + fecha1 + " es posterior a la fecha2: " + fecha2
	);
}
