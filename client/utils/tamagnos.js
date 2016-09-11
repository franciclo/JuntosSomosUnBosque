export default (n) => {
  switch (n) {
    case '1':
      return 'Brote'
    case '2':
      return 'Plantin'
    case '3':
      return 'Mediano'
    case '4':
      return 'Maduro'
    case '5':
      return 'Grande'
    default:
      return 'Tamaño desconocido'
  }
}
