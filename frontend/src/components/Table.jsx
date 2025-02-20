// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types';

const Table = ({columns, data}) => {
    return <>
        <table className="data-table" cellSpacing={0}>
          <thead>
            <tr>
                {columns.map((column) => <th key={column.name}>{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => <td key={item[column.id]+item[column.name]}>{column.formatter ? column.formatter(item) : item[column.name]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>        
    </>
  }


Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.object,
}

export default Table;