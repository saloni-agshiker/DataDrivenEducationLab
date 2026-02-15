import { createContext, useContext, useState, type ReactNode } from "react";

interface ClassContextType {
  selectedClass: string;
  setSelectedClass: (className: string) => void;
  availableClasses: string[];
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

// Placeholder classes - update these when real data is available
const AVAILABLE_CLASSES = ["CS1301", "ISYE"];

export function ClassProvider({ children }: { children: ReactNode }) {
  const [selectedClass, setSelectedClass] = useState<string>("all");

  return (
    <ClassContext.Provider 
      value={{ 
        selectedClass, 
        setSelectedClass, 
        availableClasses: AVAILABLE_CLASSES 
      }}
    >
      {children}
    </ClassContext.Provider>
  );
}

export function useClassContext() {
  const context = useContext(ClassContext);
  if (context === undefined) {
    throw new Error("useClassContext must be used within a ClassProvider");
  }
  return context;
}