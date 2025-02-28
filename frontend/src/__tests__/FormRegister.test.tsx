import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "@/app/register/page";
import { useRegister } from "@/hooks/register/useRegister";

jest.mock("@/hooks/register/useRegister", () => ({
  useRegister: jest.fn(),
}));

describe("FormRegister", () => {
  it("Vereficando el renderizado de los campos", () => {
    (useRegister as jest.Mock).mockReturnValue({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      setName: jest.fn(),
      setEmail: jest.fn(),
      handlePasswordChange: jest.fn(),
      handleConfirmPasswordChange: jest.fn(),
      handleSubmit: jest.fn(),
      showPassword: false,
      toggleShowPassword: jest.fn(),
      error: null,
      loading: false,
      goToLogin: jest.fn(),
    });

    render(<RegisterPage />);

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
  });

  it("Asignando los valores a los campos", () => {
    const mockSetName = jest.fn();
    const mockSetEmail = jest.fn();
    const mockHandlePasswordChange = jest.fn();
    const mockHandleConfirmPasswordChange = jest.fn();

    (useRegister as jest.Mock).mockReturnValue({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      setName: mockSetName,
      setEmail: mockSetEmail,
      handlePasswordChange: mockHandlePasswordChange,
      handleConfirmPasswordChange: mockHandleConfirmPasswordChange,
      handleSubmit: jest.fn(),
      showPassword: false,
      toggleShowPassword: jest.fn(),
      error: null,
      loading: false,
      goToLogin: jest.fn(),
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByLabelText(/Correo/i), {
      target: { value: "juan@hotmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), {
      target: { value: "password123" },
    });

    expect(mockSetName).toHaveBeenCalledWith("Juan Pérez");
    expect(mockSetEmail).toHaveBeenCalledWith("juan@hotmail.com");
    expect(mockHandlePasswordChange).toHaveBeenCalled();
    expect(mockHandleConfirmPasswordChange).toHaveBeenCalled();
  });

  it("Vereficando el funcionamiento de registrar", () => {
    const mockHandleSubmit = jest.fn();

    (useRegister as jest.Mock).mockReturnValue({
      name: "Juan Pérez",
      email: "juan@hotmail.com",
      password: "password123",
      confirmPassword: "password123",
      setName: jest.fn(),
      setEmail: jest.fn(),
      handlePasswordChange: jest.fn(),
      handleConfirmPasswordChange: jest.fn(),
      handleSubmit: mockHandleSubmit,
      showPassword: false,
      toggleShowPassword: jest.fn(),
      error: null,
      loading: false,
      goToLogin: jest.fn(),
    });

    render(<RegisterPage />);

    fireEvent.submit(screen.getByRole("button", { name: /Registrarse/i }));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("Vereficando que el loading desaparece", () => {
    (useRegister as jest.Mock).mockReturnValue({
      name: "Juan Pérez",
      email: "juan@hotmail.com",
      password: "password123",
      confirmPassword: "password123",
      setName: jest.fn(),
      setEmail: jest.fn(),
      handlePasswordChange: jest.fn(),
      handleConfirmPasswordChange: jest.fn(),
      handleSubmit: jest.fn(),
      showPassword: false,
      toggleShowPassword: jest.fn(),
      error: null,
      loading: true, 
      goToLogin: jest.fn(),
    });

    render(<RegisterPage />);

    expect(screen.getByRole("button", { name: /Registrando/i })).toBeDisabled();

  });
});
