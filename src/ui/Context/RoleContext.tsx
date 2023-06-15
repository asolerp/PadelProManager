import React, {createContext, useMemo, useState} from 'react';

interface RoleContextInterface {
  role: string;
  setRole: React.Dispatch<string>;
}

export const RoleContext = createContext<RoleContextInterface | null>(null);

export const RoleProvider = ({children}) => {
  const [role, setRole] = useState();

  const contextValue = useMemo(() => {
    return {role, setRole};
  });

  return (
    <RoleContext.Provider value={contextValue}>{children}</RoleContext.Provider>
  );
};
