import { render, screen } from "@testing-library/react";
import Notification from "../components/Notification";

test("Muestra la notificación si showNotification es true", () => {
    render(<Notification showNotification={true} />);
    expect(
        screen.getByText(/Ya has ingresado esta letra/i)
    ).toBeInTheDocument();
});

test("No activa la clase 'show' si showNotification es false", () => {
    render(<Notification showNotification={false} />);
    const container = screen.getByText(/Ya has ingresado esta letra/i)
        .parentElement;
    expect(container.className).not.toContain("show");
});
