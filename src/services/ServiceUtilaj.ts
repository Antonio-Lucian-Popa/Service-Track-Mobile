import AsyncStorage from "@react-native-async-storage/async-storage";

//const API_URL = 'https://uti.umbgrup.ro';
const API_URL = 'https://test.uti.umbgrup.ro';

export interface ServiceUtilaj {
    data: string;
    data_executie: string;
    executat: boolean;
    id: number;
    mecanic: number; // mecanic id
    observatii: string;
    pdf: string;
    titlu: string;
    user: number; // user id
    utilaj: number; // utilaj id
}

const serviceUtilaj = {
    findAllServicesOnUtilajId: async (utilajId: string, navigation: any): Promise<ServiceUtilaj[] | null> => {
        const token = await AsyncStorage.getItem('accessToken');
        console.log('Token:', token);
        try {
            const response = await fetch(`${API_URL}/service_utilaj/${utilajId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if(response.status === 401 || response.status === 403) {
                console.error('Unauthorized:', data);
                AsyncStorage.removeItem('accessToken');
                AsyncStorage.removeItem('refreshToken');
                // go to login page
                navigation.navigate('Login'); // Navighează spre Login
                return null;
            }
            if (response.ok) {
                return data;
            } else {
                console.error('Login failed:', response);
                return null;
            }
        } catch (error) {
            console.error('Error during login:', error);
            return null;
        }
    },
}

export default serviceUtilaj;