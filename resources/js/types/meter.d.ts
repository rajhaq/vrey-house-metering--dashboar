export interface Meter {
    id: number;
    unit_id: number;
    type: 'market_location' | 'metering_location';
    location_id: string;
    obis: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
