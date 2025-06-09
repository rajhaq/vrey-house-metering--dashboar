import React, { HTMLAttributes } from 'react';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
    headers: Record<string, string>;
    data: Record<string, any>[];
    formatters?: Partial<
        Record<
            string,
            (value: any, row: Record<string, any>) => React.ReactNode
        >
    >;
    highlight?: string[];
}

const getNestedValue = (obj: Record<string, any>, path: string): any =>
    path.split('.').reduce((acc, key) => acc?.[key], obj);

export default function Table({
    headers,
    data,
    formatters = {},
    highlight = [],
    className = '',
    ...props
}: TableProps) {
    const columnLabels = Object.keys(headers);
    const accessors = Object.values(headers);

    return (
        <div className="table-responsive">
            <table {...props} className={`table table-bordered ${className}`}>
                <thead className="table-light">
                    <tr>
                        {columnLabels.map((label) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {accessors.map((key, colIndex) => {
                                    const raw = getNestedValue(row, key);
                                    const value = formatters[key]
                                        ? formatters[key]!(raw, row)
                                        : raw;
                                    const cellClass = highlight.includes(key)
                                        ? 'fw-semibold text-success'
                                        : '';
                                    return (
                                        <td
                                            key={colIndex}
                                            className={cellClass}
                                        >
                                            {value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columnLabels.length}
                                className="text-center text-muted py-3"
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
