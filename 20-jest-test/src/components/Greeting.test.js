import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";
describe("Greeting component", () => {
  test("renders `Hello World` as a text", () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText("Hello World!");
    expect(helloWorldElement).toBeInTheDocument();
  });
  test("renders `Its good to see you!` as a text", () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText("It's good to see you!");
    expect(helloWorldElement).toBeInTheDocument();
  });
  test("renders `Changed` as a text", () => {
    render(<Greeting />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const pElement = screen.getByText("Changed!");
    expect(pElement).toBeInTheDocument();
  });
  test("renders `Changed` as a text", () => {
    render(<Greeting />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const pElement = screen.getByText("Changed!");
    expect(pElement).toBeInTheDocument();
    const pnotElement = screen.queryByText("It's good to see you!");
    expect(pnotElement).toBeNull;
  });
});
