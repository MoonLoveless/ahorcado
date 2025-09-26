import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("Renderiza el título y la instrucción", () => {
    render(<Header />);
    expect(screen.getByText(/El Ahorcado/i)).toBeInTheDocument();
    expect(
        screen.getByText(/Encuentra la palabra oculta/i)
    ).toBeInTheDocument();
});

