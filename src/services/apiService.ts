import axios, { AxiosResponse } from 'axios';
import API_URL from './apiUrl';

const apiService = {
  uploadTeachers: async (parsedData:any): Promise<any> => {
    try {
      console.log('Sending data to server:', parsedData);
      const response: AxiosResponse<any> = await axios.post(
        `${API_URL}/api/admin/upload/teachers`,
        {
          data: parsedData
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error in uploadTeachers:', error);
      throw error;
    }
  },
  uploadStudents: async (parsedData:any, semester: string): Promise<any> => {
    try {
      console.log('Sending data to server:', parsedData);
      const response: AxiosResponse<any> = await axios.post(
        `${API_URL}/api/admin/upload/students`,
        {
          semester,
          data: parsedData
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error in uploadStudents:', error);
      throw error;
    }
  },
  enroll: async (parsedData:any, course: string): Promise<any> => {
    try {
      console.log('Sending data to server:', parsedData);
      const response: AxiosResponse<any> = await axios.post(
        `${API_URL}/api/admin/upload/enrollment`,
        {
          course,
          data: parsedData
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error in uploadTeachers:', error);
      throw error;
    }
  },
};

export default apiService;