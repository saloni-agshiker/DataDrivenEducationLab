import { createContext, useContext, useState, type ReactNode } from "react";

export interface ClassInfo {
  label: string;       // Display name e.g. "CS1301 2017"
  courseId: string;    // Full course ID from student_data.json
}

interface ClassContextType {
  selectedClass: string;           // courseId or "all"
  setSelectedClass: (courseId: string) => void;
  availableClasses: ClassInfo[];
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const AVAILABLE_CLASSES: ClassInfo[] = [
  { label: "CS1301 2017", courseId: "course-v1:GTx+CS1301x+1T2017" },
  { label: "CS1301 2018", courseId: "course-v1:GTx+CS1301xI+1T2018" },
];

export function ClassProvider({ children }: { children: ReactNode }) {
  const [selectedClass, setSelectedClass] = useState<string>("all");

  return (
    <ClassContext.Provider
      value={{
        selectedClass,
        setSelectedClass,
        availableClasses: AVAILABLE_CLASSES,
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