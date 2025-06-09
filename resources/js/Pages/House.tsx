import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HouseClient from '@/api/house';
import Table from '@/Components/Table';
import { House } from '@/types/house';

const sortOptions = [
    { label: 'Name A → Z', value: 'asc' },
    { label: 'Name Z → A', value: 'desc' },
];

export default function Houses() {
    const [houses, setHouses] = useState<House[]>([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);

    const headers = {
        'House Name': 'name',
        'Postal Code': 'postal_code',
        'Units Count': 'units_count',
    };

    useEffect(() => {
        setLoading(true);
        HouseClient.getAll()
            .then((data) => {
                setHouses(data);
            })
            .catch((error) => {
                console.error('Failed to load houses:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    const sortedHouses = [...houses].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === 'asc'
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-primary">
                    Houses
                </h2>
            }
        >
            <Head title="Houses" />

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <label className="form-label">Sort By</label>
                            <select
                                className="form-select"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                {sortOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Loading Spinner */}
                    {loading ? (
                        <div className="text-center py-5">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            />
                        </div>
                    ) : (
                        <Table headers={headers} data={sortedHouses} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
