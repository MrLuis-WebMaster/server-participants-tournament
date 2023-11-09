import { DateTime } from 'luxon';

const timeZoneMapping: Record<string, string> = {
  'America/Mexico_City': 'Mexico City, Mexico',
  'America/Sao_Paulo': 'Sao Paulo, Brazil',
  'America/Buenos_Aires': 'Buenos Aires, Argentina',
  'America/Costa_Rica': 'San Jose, Costa Rica',
  'America/Panama': 'Panama City, Panama',
  'America/Guatemala': 'Guatemala City, Guatemala',
  'America/Tegucigalpa': 'Tegucigalpa, Honduras',
  'America/Managua': 'Managua, Nicaragua',
  'America/El_Salvador': 'San Salvador, El Salvador',
  'America/Lima': 'Lima, Peru',
  'America/Caracas': 'Caracas, Venezuela',
  'America/Asuncion': 'Asuncion, Paraguay',
  'America/Santiago': 'Santiago, Chile',
  'America/La_Paz': 'La Paz, Bolivia',
  'America/Montevideo': 'Montevideo, Uruguay',
  'America/Guayaquil': 'Quito, Ecuador',
  'America/Bogota': 'Bogota, Colombia',
};

export function getDatesAndTimesByTimeZone(dateString: Date) {
  const timeZones = Object.keys(timeZoneMapping);
  const originalDate = DateTime.fromJSDate(new Date(dateString)); // Convertir a Date

  if (!originalDate.isValid) {
    console.error('Fecha no válida:', dateString);
    return [];
  }

  const datesAndTimes = {};

  timeZones.forEach((timeZone) => {
    try {
      const dateInTimeZone = originalDate.setZone(timeZone);

      if (!dateInTimeZone.isValid) {
        console.error(`Error: ${timeZoneMapping[timeZone]}`);
        return;
      }

      const formattedDateAndTime =
        dateInTimeZone.toFormat('yyyy-MM-dd HH:mm a');

      if (!datesAndTimes[formattedDateAndTime]) {
        datesAndTimes[formattedDateAndTime] = {
          countries: [timeZoneMapping[timeZone]],
          datetime: formattedDateAndTime,
        };
      } else {
        datesAndTimes[formattedDateAndTime].countries.push(
          timeZoneMapping[timeZone],
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  return Object.values(datesAndTimes);
}
