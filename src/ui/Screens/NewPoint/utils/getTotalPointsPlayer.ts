export const getTotalPlayerStatistics = (statistics, team, playerId) => {
  const playerStats = statistics?.total?.[team]?.players?.[playerId];
  const total =
    (playerStats?.w?.count || 0) +
    (playerStats?.ef?.count || 0) +
    (playerStats?.nf?.count || 0);

  return [
    {
      color: '#4caf50',
      percentage: (playerStats?.w?.count / total) * 100 || 0,
    },
    {
      color: '#2196f3',
      percentage: (playerStats?.ef?.count / total) * 100 || 0,
    },
    {
      color: '#f44336',
      percentage: (playerStats?.nf?.count / total) * 100 || 0,
    },
  ];
};
