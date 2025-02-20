import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Table from "../src/components/Table";

const mockData = [
    {
      id: 1,
      type: "Venda",
      nature: "Entrada",
      amount: "100.00",
      date: "2024-02-18T15:30:00",
      cpf: "123.456.789-00",
      card: "1234****5678",
      store_owner: "Carlos",
      store_name: "Supermercado XPTO",
    }
];

const mockColumns = [
  { name: "type", label: "Tipo" },
  { name: "nature", label: "Natureza" },
  {
    name: "amount",
    label: "Valor",
    formatter: (obj) =>
      `R$ ${obj.amount}`,
  },
];

describe("Table Component", () => {
  test("renders table with correct data", () => {
    render(<Table columns={mockColumns} data={mockData} setCurrentPage={jest.fn()} />);

    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Natureza")).toBeInTheDocument();
    expect(screen.getByText("Valor")).toBeInTheDocument();

    expect(screen.getByText("Venda")).toBeInTheDocument();
    expect(screen.getByText("Entrada")).toBeInTheDocument();
    expect(screen.getByText("R$ 100.00")).toBeInTheDocument();
  });
});
