import axiosClient from './axiosClient';

const DashboardClient = {
    getSummary: (houseId: number, date: string, sortBy: string) =>
        axiosClient.get('/dashboard', {
            params: {
                house_id: houseId,
                date,
                sortBy,
            },
        }),
};

export default DashboardClient;
