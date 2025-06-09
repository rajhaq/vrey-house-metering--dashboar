import { Meter } from '@/types/meter';

export interface Unit {
    id: number;
    house_id: number;
    name: string;
    floor_number: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    meters: Meter[];
}
