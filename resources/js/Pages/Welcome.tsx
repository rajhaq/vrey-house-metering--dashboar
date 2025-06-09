import React, { useEffect, useState } from 'react';
import Guest from '@/Layouts/GuestLayout';
import DashboardClient from '@/api/dashboard';
import Table from '@/Components/Table';
import Modal from '@/Components/Modal';

interface DashboardUnit {
    unit: string;
    market_meter: {
        location_id: string;
        total_kwh: number;
    };
    metering_meter: {
        location_id: string;
        total_kwh: number;
    };
    solar_consumption_kwh: number;
}

interface DateGroupedData {
    date: string;
    units: DashboardUnit[];
}

const sortOptions = [
    { label: 'Newest First', value: 'desc' },
    { label: 'Oldest First', value: 'asc' },
];

export default function Home() {
    const [dataByDate, setDataByDate] = useState<DateGroupedData[]>([]);
    const [date, setDate] = useState('');
    const [sortBy, setSortBy] = useState('desc');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const houseId = 1;

    const headers = {
        Unit: 'unit',
        'Market Location ID': 'market_meter.location_id',
        'Market Meter (kWh)': 'market_meter.total_kwh',
        'Metering Location ID': 'metering_meter.location_id',
        'Metering Meter (kWh)': 'metering_meter.total_kwh',
        'Solar Consumption (kWh)': 'solar_consumption_kwh',
    };

    const fetchData = () => {
        setLoading(true);
        setError(null);
        setIsError(false);

        DashboardClient.getSummary(houseId, date, sortBy)
            .then((res) => setDataByDate(res.data.results))
            .catch(() => {
                setError('Failed to load dashboard data. Please try again.');
                setIsError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [date, sortBy]);

    return (
        <Guest>
            <div className="card mb-4">
                <div className="card-body">
                    {/* Filter Controls */}
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <label className="form-label">Select Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Sort By</label>
                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
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
                        dataByDate.map(({ date, units }) => (
                            <div key={date} className="mb-5">
                                <h5 className="mb-3">{date}</h5>
                                <Table
                                    headers={headers}
                                    data={units}
                                    formatters={{
                                        'market_meter.total_kwh': (val) =>
                                            val.toFixed(2),
                                        'metering_meter.total_kwh': (val) =>
                                            val.toFixed(2),
                                        solar_consumption_kwh: (val) =>
                                            val.toFixed(2),
                                    }}
                                    highlight={['solar_consumption_kwh']}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Error Modal */}
            <Modal
                show={isError}
                title="Error"
                message={error || ''}
                onClose={() => setIsError(false)}
            />
        </Guest>
    );
}
