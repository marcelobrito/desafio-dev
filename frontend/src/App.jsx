import React from "react";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import FileUpload from "./components/FileUpload";

const columns = [
  {name: 'type', label: 'Tipo'},
  {name: 'nature', label: 'Natureza'},
  {name: 'amount', label: 'Valor', formatter: (obj) => `R$ ${obj.amount.toFixed(2).replace('.',',')}`},
  {name: 'date', label: 'Data hora', formatter: (obj) => {
    let [date, time] = obj.date.split('T');  
    date = date.split('-').reverse().map(e => e.padStart(2,'0')).join('/');
    time = time.slice(0,8);
    return `${date} ${time}`;

  }},
  {name: 'cpf', label: 'CPF'},
  {name: 'card', label: 'Cartão'},
  {name: 'store_owner', label: 'Dono da loja'},
  {name: 'store_name', label: 'Nome da loja'}
]

const App = () => {
  const [data, setData] = useState([]);

  const getCnabs = async () => {
    const cnabs = await fetch(`http://localhost:3000/cnab`);
    const data = await cnabs.json();
    setData(data); 
  }
  
  useEffect(() => {
    getCnabs();
  },[])

  return (
    <>
      <FileUpload getCnabs={getCnabs} />
      {data.length >= 1 && data.map(report => <React.Fragment key={report.store_name+report.total}>
          <h3>{report.store_name} - R$ {report.total.toFixed(2).replace('.',',')}</h3>
          <Table columns={columns} data={report.transactions}/>
        </React.Fragment>
      )}
    </>
  );
};

export default App;
