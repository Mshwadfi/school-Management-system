import React from 'react';

const Table = ({
  columns,
  customTableRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTableRow: (item: any) => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}) => {
  return (
    <div className="overflow-x-auto rounded-lg mt-4 shadow-md">
      <table className="min-w-full text-sm leading-normal text-gray-900 bg-white">
        <thead className="bg-Yellow text-gray-600 uppercase text-xs font-semibold tracking-wider">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className={`${col.className || ''} px-5 py-3 text-left`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            customTableRow(item)
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
