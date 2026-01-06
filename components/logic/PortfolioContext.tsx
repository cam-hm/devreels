"use client";

import React, { createContext, useContext, useState } from "react";

type FocusItem = {
    type: "project" | "skill" | "general" | "build";
    id?: string;
    data?: any; // The raw project/skill object
};

interface PortfolioContextType {
    focusedItem: FocusItem;
    setFocusedItem: (item: FocusItem) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
    const [focusedItem, setFocusedItem] = useState<FocusItem>({ type: "general" });

    return (
        <PortfolioContext.Provider value={{ focusedItem, setFocusedItem }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error("usePortfolio must be used within a PortfolioProvider");
    }
    return context;
}
