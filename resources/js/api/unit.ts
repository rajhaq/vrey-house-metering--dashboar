import axiosClient from './axiosClient';
import { Unit } from '@/types/unit';

const UnitClient = {
    getAll: async (): Promise<Unit[]> => {
        const response = await axiosClient.get<Unit[]>('/units');
        return response.data;
    },
};

export default UnitClient;
