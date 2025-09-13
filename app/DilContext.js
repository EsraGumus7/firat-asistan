import React, { createContext, useContext, useState } from 'react';

const DilContext = createContext();

export const DilProvider = ({ children }) => {
  const [dil, setDil] = useState('tr');
  return (
    <DilContext.Provider value={{ dil, setDil }}>
      {children}
    </DilContext.Provider>
  );
};

export const useDil = () => useContext(DilContext);

export default DilProvider; 