import React, {ReactNode} from 'react';

type TableProps<T> = {
    columns: { Header: ReactNode; accessor: keyof T }[];
    data: T[];
};

const Table = <T extends object>({ columns, data }: TableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase">
                <tr>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className="py-3 px-6 font-semibold text-gray-700 border-b"
                        >
                            {column.Header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className="py-3 px-6 text-sm text-gray-800 border-b">
                                {row[column.accessor] as React.ReactNode}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
