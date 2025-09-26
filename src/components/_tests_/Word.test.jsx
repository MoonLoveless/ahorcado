import { render, screen } from "@testing-library/react";
import Word from "../components/Word";

test("Muestra guiones cuando no hay letras correctas", () => {
    render(<Word selectedWord="react" correctLetters={[]} />);
    const letters = screen.getAllByText("", { selector: "span.letter" });
    expect(letters.length).toBe(5);
});

test("Muestra letras correctas adivinadas", () => {
    render(<Word selectedWord="react" correctLetters={["r", "a"]} />);
    expect(screen.getByText("r")).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
});
