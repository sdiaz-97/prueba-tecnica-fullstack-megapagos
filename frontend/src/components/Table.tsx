
interface Column {
    key: string;
    label: string;
}

interface TableProps {
    columns: Column[];
    data: any[];
    showActions?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
}

const Table: React.FC<TableProps> = ({
    columns,
    data,
    showActions = false,
    showEdit = true,
    showDelete = true,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-2 text-gray-700 text-sm font-semibold uppercase text-center"
                            >
                                {col.label}
                            </th>
                        ))}
                        {showActions && (
                            <th className="px-4 py-2 text-gray-700 text-sm font-semibold uppercase text-center">
                                Acciones
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index} className="border-t">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-2 text-sm text-gray-800 text-center">
                                        {col.key === "assignedUsers" ? (
                                            <div className="flex flex-wrap justify-center gap-1">
                                                {row[col.key].split(", ").map((user: string, idx: number) => (
                                                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                                                        {user}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            row[col.key]
                                        )}
                                    </td>
                                ))}
                                {showActions && (
                                    <td className="px-4 py-2 flex justify-center items-center gap-2">
                                        {showEdit && onEdit && (
                                            <button
                                                onClick={() => onEdit(row)}
                                                className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                                            >
                                                ✏️
                                            </button>
                                        )}
                                        {showDelete && onDelete && (
                                            <button
                                                onClick={() => onDelete(row)}
                                                className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (showActions ? 1 : 0)} className="text-center py-4 text-gray-500">
                                No hay datos disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
