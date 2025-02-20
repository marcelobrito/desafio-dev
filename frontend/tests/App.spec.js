import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import App from "../src/App";

const data = [
  {
    "store_name": "LOJA DO Ó - FILIAL",
    "total": 152.32,
    "transactions": [
        {
            "id": 21,
            "type": "Crédito",
            "date": "2019-03-01T13:00:00.000Z",
            "amount": 152.32,
            "cpf": "55641815063",
            "card": "1234****6678",
            "store_owner": "MARIA JOSEFINA",
            "store_name": "LOJA DO Ó - FILIAL",
            "nature": "Entrada"
        }
    ]
}
];
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve(data)
  })
);

describe("App Component", () => {
  test("renders FileUpload component", async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(/Pegue e solte um arquivo/i)).toBeInTheDocument();
  });

  test("fetches and displays CNAB data", async () => {
    await act(async () => {
      render(<App />);
    });
    const formattedDate = (d) => {
      let [date, time] = d.split('T');  
      date = date.split('-').reverse().map(e => e.padStart(2,'0')).join('/');
      time = time.slice(0,8);
      return `${date} ${time}`;
  
    }
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.getAllByText(/LOJA DO Ó - FILIAL/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/\R\$ 152,32/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Crédito/i)).toBeInTheDocument();
    expect(screen.getByText(formattedDate(data[0].transactions[0].date))).toBeInTheDocument();
    expect(screen.getAllByText(/\R\$ 152,32/i)[1]).toBeInTheDocument();
    expect(screen.getByText(/55641815063/i)).toBeInTheDocument();
    expect(screen.getByText(/1234\*\*\*\*6678/i)).toBeInTheDocument();
    expect(screen.getByText(/MARIA JOSEFINA/i)).toBeInTheDocument();
    expect(screen.getAllByText(/LOJA DO Ó - FILIAL/i)[1]).toBeInTheDocument();
    expect(screen.getByText(/Entrada/i)).toBeInTheDocument();
  });
});