import React from 'react';

type Column = {
  label: string;
  accessor: string;
};

type TableProps = {
  columns: Column[];
  data: any[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Table({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="card">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((col) => (
                  <th key={col.accessor}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((col) => (
                      <td key={col.accessor}>{row[col.accessor]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  number === currentPage ? 'active' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(number)}
                >
                  {number}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
