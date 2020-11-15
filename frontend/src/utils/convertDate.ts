export default function (date: string): string {
  const dados = date.split('-');
  const day = dados[2].substring(0, 1);
  const month = dados[1];
  const year = dados[0];
  let descMes = '';
  switch (Number(month)) {
    case 1:
      descMes = 'Janeiro';
      break;
    case 2:
      descMes = 'Fevereiro';
      break;
    case 3:
      descMes = 'Março';
      break;
    case 4:
      descMes = 'Abril';
      break;
    case 5:
      descMes = 'Maio';
      break;
    case 6:
      descMes = 'Junho';
      break;
    case 7:
      descMes = 'Julho';
      break;
    case 8:
      descMes = 'Agosto';
      break;
    case 9:
      descMes = 'Setembro';
      break;
    case 10:
      descMes = 'Outubro';
      break;
    case 11:
      descMes = 'Novembro';
      break;
    case 12:
      descMes = 'Dezembro';
      break;
    default:
      descMes = '';
      break;
  }
  const descData = `${day} de ${descMes}, ${year}`;
  return descData;
}
