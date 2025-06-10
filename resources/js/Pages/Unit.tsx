import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UnitClient from '@/api/unit';
import Table from '@/Components/Table';
import { Unit } from '@/types/unit';

const sortOptions = [
    { label: 'Name A → Z', value: 'asc' },
    { label: 'Name Z → A', value: 'desc' },
];

const headers = {
    'Unit Name': 'name',
    'Floor Number': 'floor_number',
    'Market Location ID': 'market_meter',
    'Metering Location ID': 'metering_meter',
};

export default function Units() {
    const [units, setUnits] = useState<Unit[]>([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        UnitClient.getAll()
            .then(setUnits)
            .catch((err) => {
                console.error('Failed to fetch units:', err);
            })
            .finally(() => setLoading(false));
    }, []);

    const formatUnitsForTable = () => {
        const formatted = units.map((unit) => {
            const market = unit.meters.find(
                (m) => m.type === 'market_location',
            );
            const metering = unit.meters.find(
                (m) => m.type === 'metering_location',
            );

            return {
                ...unit,
                market_meter: market?.location_id || '-',
                metering_meter: metering?.location_id || '-',
            };
        });

        return formatted.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return sortOrder === 'asc'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-primary">
                    Units
                </h2>
            }
        >
            <Head title="Units" />

            <div className="card mb-4">
                <div className="card-body">
                    {/* Sort Dropdown */}
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
                        <Table headers={headers} data={formatUnitsForTable()} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
