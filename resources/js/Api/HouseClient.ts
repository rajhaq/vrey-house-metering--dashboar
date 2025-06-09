import AxiosClient from './AxiosClient';
import { House } from '@/types/house';

const HouseClient = {
    getAll: async (): Promise<House[]> => {
        const response = await AxiosClient.get<House[]>('/houses');
        return response.data;
    },
};

export default HouseClient;
