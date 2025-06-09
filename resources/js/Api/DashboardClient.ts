import AxiosClient from './AxiosClient';

const DashboardClient = {
    getSummary: (houseId: number, date: string, sortBy: string) =>
        AxiosClient.get('/dashboard', {
            params: {
                house_id: houseId,
                date,
                sortBy,
            },
        }),
};

export default DashboardClient;
