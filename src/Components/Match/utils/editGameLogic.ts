export const getSetOfMatch = match => {
  if (match?.s2t1 > 0 || match?.s2t2 > 0) {
    if (match?.s3t1 > 0 || match?.s3t2 > 0) {
      return 3;
    }
    return 2;
  }
  return 1;
};

export const getWhoWonSet = (match, set) => {
  if (match?.[`s${set}t1`] >= 6 || match?.[`s${set}t2`] >= 6) {
    if (match?.[`s${set}t1`] > match?.[`s${set}t2`]) {
      return 'team1';
    }
    return 'team2';
  }
};

export const getNumberOfSetsWonByTeam = match => {
  let team1Sets = 0;
  let team2Sets = 0;

  if (match?.s1t1 > 0 || match?.s1t2 > 0) {
    if (getWhoWonSet(match, 1) === 'team1') {
      team1Sets++;
    } else {
      team2Sets++;
    }
  }

  if (match?.s2t1 > 0 || match?.s2t2 > 0) {
    if (getWhoWonSet(match, 2) === 'team1') {
      team1Sets++;
    } else {
      team2Sets++;
    }
  }

  if (match?.s3t1 > 0 || match?.s3t2 > 0) {
    if (getWhoWonSet(match, 3) === 'team1') {
      team1Sets++;
    } else {
      team2Sets++;
    }
  }

  return {
    winsSetTeam1: team1Sets,
    winsSetTeam2: team2Sets,
  };
};

export const getStatusMatch = match => {
  if (match?.winsSetTeam1 === 2 || match?.winsSetTeam2 === 2) {
    return true;
  }
  return false;
};

export const getWhoWonMatch = match => {
  if (match?.winsSetTeam1 === 2) {
    return 'team1';
  }
  return 'team2';
};
