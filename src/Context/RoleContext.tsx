import React, {createContext, useState} from 'react';

interface RoleContextInterface {
  role: string;
  setRole: React.Dispatch<string>;
}

export const RoleContext = createContext<RoleContextInterface | null>(null);

export const RoleProvider = ({children}) => {
  const [role, setRole] = useState();

  const value = {
    role,
    setRole,
  };
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
