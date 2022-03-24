export const useCheckPermissions = () => {
  const handleCheckCreateNewPlayer = callback => {
    callback();
  };

  return {
    handleCheckCreateNewPlayer,
  };
};
