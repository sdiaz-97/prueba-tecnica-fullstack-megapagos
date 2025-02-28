export interface ProjectModalProps {
    handleCloseModal: () => void;
    formData: {
        id: number | null;
        name: string;
        description: string;
        assignedUsers: number[];
    };
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setFormData: any
    userOptions: { id: number; name: string }[];
    selectedUsers: number[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<number[]>>;
}
