import axiosClient from './axiosClient';
import { House } from '@/types/house';

const HouseClient = {
    getAll: async (): Promise<House[]> => {
        const response = await axiosClient.get<House[]>('/houses');
        return response.data;
    },
};

export default HouseClient;
