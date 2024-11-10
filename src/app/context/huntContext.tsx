"use client";
import React, { createContext, useState, useContext } from 'react';

const HuntContext = createContext({
  participationData: null,
  setParticipationData: () => {},
});

export function HuntProvider({ children }) {
  const [participationData, setParticipationData] = useState(null);

  return (
    <HuntContext.Provider value={{ participationData, setParticipationData }}>
      {children}
    </HuntContext.Provider>
  );
}

export function useHunt() {
  const context = useContext(HuntContext);

  if (!context) {
    throw new Error("useHunt must be used within a HuntProvider");
  }

  return context;
}
