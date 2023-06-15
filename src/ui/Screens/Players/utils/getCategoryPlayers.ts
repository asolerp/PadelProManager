export const getCategoryPlayers = players => {
  const categories = players?.reduce((currentSpecs, player) => {
    if (!currentSpecs[player.category]) {
      return {...currentSpecs, [player?.category]: [player]};
    }
    return {
      ...currentSpecs,
      [player?.category]: [...currentSpecs[player?.category], player],
    };
  }, {});

  return Object.keys(categories).map(category => ({
    title: category,
    data: categories[category],
  }));
};
