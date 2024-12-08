// Define the structure for a Test data object
export interface TestData {
    _id: string;
    testName: string;
    picture: string;
    price: number;
    description: string;
    createdAt: string;
  }
  
  // Define the props that the TestList component will receive
  export interface TestListProps {
    data: TestData[];
    onEdit: (id: string, updatedData: Partial<TestData>) => void;
    onDelete: (id: string) => void;
  }
  
  // Define the props that the TestEditModal component will receive
  export interface TestEditModalProps {
    test: TestData;
    open: boolean;
    onClose: () => void;
    onEdit: (id: string, updatedData: Partial<TestData>) => void;
  }
  