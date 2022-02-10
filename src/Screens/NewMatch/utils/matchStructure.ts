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

export const matchTeam1 = selectedPlayers =>
  [
    !selectedPlayers?.['1']
      ? null
      : selectedPlayers?.['1']?.id !== -1
      ? selectedPlayers?.['1']
      : null,
    !selectedPlayers?.['2']
      ? null
      : selectedPlayers?.['2']?.id !== -1
      ? selectedPlayers?.['2']
      : null,
  ].filter(p => p !== null);

export const matchTeam2 = selectedPlayers =>
  [
    !selectedPlayers?.['3']
      ? null
      : selectedPlayers?.['3']?.id !== -1
      ? selectedPlayers?.['3']
      : null,
    !selectedPlayers?.['4']
      ? null
      : selectedPlayers?.['4']?.id !== -1
      ? selectedPlayers?.['4']
      : null,
  ].filter(p => p !== null);
