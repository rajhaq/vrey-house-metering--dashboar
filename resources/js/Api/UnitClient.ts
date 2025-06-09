import AxiosClient from './AxiosClient';
import { Unit } from '@/types/unit';

const UnitClient = {
    getAll: async (): Promise<Unit[]> => {
        const response = await AxiosClient.get<Unit[]>('/units');
        return response.data;
    },
};

export default UnitClient;
