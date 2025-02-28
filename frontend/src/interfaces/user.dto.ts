export interface UserModalProps {
    editingUser: any; 
    formData: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        roleId: string;
    };
    setFormData: (formData: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        roleId: string;
    }) => void;
    handleCloseModal: () => void;
    showPassword: boolean;
    setShowPassword: (value: boolean) => void;
    confirmPasswordError: string;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validateForm: (e: React.FormEvent<HTMLFormElement>) => void;
    handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    passwordError: string;
}