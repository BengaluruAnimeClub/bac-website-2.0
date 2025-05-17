"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <UIContext.Provider value={{ isLoginModalOpen, openLoginModal, closeLoginModal }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
