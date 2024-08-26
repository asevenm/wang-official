import React from 'react';
import Pagination from '../Pagination';

export interface TableColumn<T> {
  title: string; 
  dataIndex: string;
  key: string;
  render?: (row: T) => React.ReactElement;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rowKey: string;
  dataSource: T[];
  pagination: { totalPages: number }
}

export default function Table<T extends any>({ pagination, columns, rowKey, dataSource }: TableProps<T>) {
  return (
    <>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  {columns.map((item) => (
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6" key={item.key}>
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {dataSource?.map((item) => (
                  <tr
                    key={item[rowKey]}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    {columns.map((column) => (
                      <td className="whitespace-nowrap py-3 pl-6 pr-3" key={column.key}>
                        {column.render ? column.render(item) : item[column.dataIndex]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={pagination.totalPages} />
      </div>
    </>
  );
}