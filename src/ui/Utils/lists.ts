export const cateogries = isAdmin => {
  return [
    ...(isAdmin ? [{label: 'Live', value: -1}] : []),
    {label: 'WPT', value: 6},
    {label: '1ª', value: 1},
    {label: '2ª', value: 2},
    {label: '3ª', value: 3},
    {label: '4ª', value: 4},
    {label: '5ª', value: 5},
  ];
};

export const playerCategories = [
  {label: 'World Padel Tour', value: 'wpt'},
  {label: '1ª', value: 1},
  {label: '2ª', value: 2},
  {label: '3ª', value: 3},
  {label: '4ª', value: 4},
  {label: '5ª', value: 5},
];

export const sex = [
  {label: 'Masculino', value: 'male'},
  {label: 'Femenino', value: 'female'},
  {label: 'Mixtos', value: 'mix'},
];

export const gender = [
  {label: 'Masculino', value: 'male'},
  {label: 'Femenino', value: 'female'},
];

export const rounds = [
  {label: 'Dieciseisavos', value: 16},
  {label: 'Octavos', value: 8},
  {label: 'Cuartos', value: 4},
  {label: 'Semis', value: 2},
  {label: 'Final', value: 1},
];

export const lateralidad = [
  {label: 'Diestro', value: 'right'},
  {label: 'Zurdo', value: 'left'},
];

export const searchOptions = [
  {label: 'Nombre de jugadores', value: 'name'},
  {label: 'Nombre del club', value: 'club'},
];
