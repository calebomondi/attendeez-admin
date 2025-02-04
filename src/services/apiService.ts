import axios, { AxiosResponse } from 'axios';
import { SessionStarted ,InAttendance ,UploadSingle ,MyClassesToday, ClassEndTime, AttendedStats, AttendedSummary, TeacherInfo, ConfirmClass, StartClassSession, EndClassSession, ClassIsActive } from '../types';
import API_URL from './apiUrl';

const apiService = {
  getMyClassesToday: async (teacher_id: string): Promise<MyClassesToday[]> => {
    try {
      const response: AxiosResponse<MyClassesToday[]> = await axios.get(`${API_URL}/api/tutor/myclasses-today?teacher_id=${teacher_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  geAttendanceStats: async (unit_id: string): Promise<AttendedStats[]> => {
    try {
      const response: AxiosResponse<AttendedStats[]> = await axios.get(`${API_URL}/api/tutor/attendance-stats?unit_id=${unit_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getAttendanceSummary: async (unit_id: string): Promise<AttendedSummary[]> => {
    try {
      const response: AxiosResponse<AttendedSummary[]> = await axios.get(`${API_URL}/api/tutor/attendance-summary?unit_id=${unit_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getTeacherInfo: async (email: string): Promise<TeacherInfo> => {
    try {
      const response: AxiosResponse<TeacherInfo> = await axios.get(`${API_URL}/api/tutor/teacher-info?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getConfirmClass: async (unit_id:string): Promise<ConfirmClass[]> => {
    try {
      const response: AxiosResponse<ConfirmClass[]> = await axios.get(`${API_URL}/api/tutor/confirmed-today?unit_id=${unit_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  postStartClassSession: async (unit_id:string): Promise<StartClassSession> => {
    try {
      const response: AxiosResponse<StartClassSession> = await axios.post(`${API_URL}/api/tutor/start-classsession?unitId=${unit_id}`);
      console.log('postStartClassSession:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  putEndClassSession: async (unit_id:string): Promise<EndClassSession> => {
    try {
      const response: AxiosResponse<EndClassSession> = await axios.put(`${API_URL}/api/tutor/finish-classsession?unitId=${unit_id}`);
      console.log('putEndClassSession:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  isClassActive: async (unit_id:string): Promise<ClassIsActive> => {
    try {
      const response: AxiosResponse<ClassIsActive> = await axios.get(`${API_URL}/api/class/active-session?unitId=${unit_id}`);
      console.log('isClassActive:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  endBeforeTime: async (unit_id:string): Promise<ClassIsActive> => {
    try {
      const response: AxiosResponse<ClassIsActive> = await axios.get(`${API_URL}/api/class/end-before-time?unitId=${unit_id}`);
      console.log('endBeforeTime:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  checkSessionEnd: async (unit_id:string): Promise<ClassEndTime> => {
    try {
      const response: AxiosResponse<ClassEndTime> = await axios.get(`${API_URL}/api/class/check-session-end?unitId=${unit_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  sessionStarted: async (unit_id:string): Promise<SessionStarted> => {
    try {
      const response: AxiosResponse<SessionStarted> = await axios.get(`${API_URL}/api/class/session-started?unitId=${unit_id}`);
      console.error('sessionStarted-->', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  checkInAttendance: async (unit_id:string,student_id:string): Promise<InAttendance> => {
    try {
      const response: AxiosResponse<InAttendance> = await axios.get(`${API_URL}/api/student/in-attendance?unitId=${unit_id}&studentId=${student_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  uploadSingleStudent: async (unit_id:string,student_id:string): Promise<UploadSingle> => {
    try {
      const response: AxiosResponse<UploadSingle> = await axios.post(`${API_URL}/api/student/upload-single?unitId=${unit_id}&studentId=${student_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
};

export default apiService;