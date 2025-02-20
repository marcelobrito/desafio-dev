import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import FileUpload from "../src/components/FileUpload";

describe("FileUpload Component", () => {
  test("renders correctly", () => {
    render(<FileUpload getCnabs={jest.fn()} />);
    expect(
      screen.getByText(/Pegue e solte um arquivo ou clique/i)
    ).toBeInTheDocument();
  });

  test("allows file selection", () => {
    render(<FileUpload getCnabs={jest.fn()} />);
    
    const file = new File(["content"], "test.txt", { type: "text/plain" });
    const input = screen.getByLabelText("Selecione um arquivo txt");

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("Arquivo selecionado: test.txt")).toBeInTheDocument();
  });

  test("displays error when trying to upload without file", async () => {
    render(<FileUpload getCnabs={jest.fn()} />);
    fireEvent.click(screen.getByText("Upload"));

    await waitFor(() =>
      expect(
        screen.getByText("Por favor selecione um arquivo para fazer o upload.")
      ).toBeInTheDocument()
    );
  });
});