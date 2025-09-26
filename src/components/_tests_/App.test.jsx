import { render, screen } from "@testing-library/react";
import App from "../App";

test("Renderiza el título principal del juego", () => {
    render(<App />);
    expect(screen.getByText(/El Ahorcado/i)).toBeInTheDocument();
});
