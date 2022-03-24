export const playersId = selectedPlayers =>
  [
    !selectedPlayers?.['1']
      ? null
      : selectedPlayers?.['1']?.id !== -1
      ? selectedPlayers?.['1']?.id
      : null,
    !selectedPlayers?.['2']
      ? null
      : selectedPlayers?.['2']?.id !== -1
      ? selectedPlayers?.['2']?.id
      : null,
    !selectedPlayers?.['3']
      ? null
      : selectedPlayers?.['3']?.id !== -1
      ? selectedPlayers?.['3']?.id
      : null,
    !selectedPlayers?.['4']
      ? null
      : selectedPlayers?.['4']?.id !== -1
      ? selectedPlayers?.['4']?.id
      : null,
  ].filter(pId => pId !== null);

export const playersEmails = selectedPlayers =>
  [
    !selectedPlayers?.['1']
      ? null
      : selectedPlayers?.['1']?.email
      ? selectedPlayers?.['1']?.email
      : null,
    !selectedPlayers?.['2']
      ? null
      : selectedPlayers?.['2']?.email
      ? selectedPlayers?.['2']?.email
      : null,
    !selectedPlayers?.['3']
      ? null
      : selectedPlayers?.['3']?.email
      ? selectedPlayers?.['3']?.email
      : null,
    !selectedPlayers?.['4']
      ? null
      : selectedPlayers?.['4']?.email
      ? selectedPlayers?.['4']?.email
      : null,
  ].filter(pId => pId !== null);

export const matchTeam1 = selectedPlayers =>
  [selectedPlayers?.['1'], selectedPlayers?.['2']].filter(p => p !== null);

export const matchTeam2 = selectedPlayers =>
  [selectedPlayers?.['3'], selectedPlayers?.['4']].filter(p => p !== null);
