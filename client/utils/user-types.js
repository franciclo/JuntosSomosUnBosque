export default (utype) => {
  switch (utype) {
    case 'per':
      return 'Persona'
    case 'viv':
      return 'Vivero'
    case 'org':
      return 'Organización civil'
    case 'esc':
      return 'Escuela'
    case 'cul':
      return 'Centro cultural'
    default:
      return 'Tipo desconocido'
  }
}
