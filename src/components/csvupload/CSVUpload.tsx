import React, { useState, ChangeEvent, FormEvent } from 'react';
import apiService from '../../services/apiService';

interface FormData {
  dataType: string;
  semester: string;
  courseName: string;
  file: File | null;
}

interface ParsedCSVData {
  [key: string]: string;
}

const CSVUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    dataType: '',
    semester: '',
    courseName: '',
    file: null
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  /* Initialize Supabase client
  const supabase = createClient(
    'YOUR_SUPABASE_URL',
    'YOUR_SUPABASE_ANON_KEY'
  );
  */
  const dataTypes = ['teachers', 'students', 'timetable'];
  const semesters = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2'];

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type !== 'text/csv') {
      setError('Please upload a CSV file');
      return;
    }
    setFormData(prev => ({
      ...prev,
      file: selectedFile || null
    }));
    setError('');
  };

  const parseCSV = async (file: File): Promise<ParsedCSVData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const data = rows.slice(1)
          .filter(row => row.some(cell => cell.trim())) // Filter out empty rows
          .map(row => {
            const obj: ParsedCSVData = {};
            headers.forEach((header, index) => {
              obj[header.trim()] = row[index]?.trim() || '';
            });
            return obj;
          });
        resolve(data);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { dataType, semester, courseName, file } = formData;

      if (!file || !dataType || !semester || !courseName) {
        throw new Error('Please fill in all fields');
      }

      const parsedData = await parseCSV(file);

      // Preview the parsed data
        console.log('Data Type:', dataType);
        console.log('Semester:', semester);
        console.log('Course Name:', courseName);
        console.log('Number of rows:', parsedData.length);
        
        // Loop through each row and log it
        parsedData.forEach((row, index) => {
        console.log(`Row ${index + 1}:`, row);
        });
        
        // You can add a confirmation step here if you want
        const shouldProceed = window.confirm('Would you like to proceed with the upload?');
            if (!shouldProceed) {
                setLoading(false);
            return;
        }

        if (dataType.match("teachers")) {
            const res = await apiService.uploadTeachers(parsedData);
            console.log('Response:', res);
            setSuccess('Teachers data uploaded successfully!');
        }

        if (dataType.match("students")) {
          const res = await apiService.uploadStudents(parsedData,semester);
          const resp = await apiService.enroll(parsedData, courseName);
          console.log('Students:', res, 'enrollment:', resp);
          setSuccess('Students data uploaded successfully!');
      }
    
      setSuccess('Data uploaded successfully!');
      // Reset form
      setFormData({
        dataType: '',
        semester: '',
        courseName: '',
        file: null
      });
      // Reset file input
      (e.target as HTMLFormElement).reset();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload CSV Data</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="dataType">
            Data Type
          </label>
          <select
            id="dataType"
            name="dataType"
            value={formData.dataType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" className='dark:bg-slate-600'>Select data type</option>
            {dataTypes.map(type => (
              <option key={type} value={type} className='dark:bg-slate-600'>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="semester">
            Semester
          </label>
          <select
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" className='dark:bg-slate-600'>Select semester</option>
            {semesters.map(sem => (
              <option key={sem} value={sem} className='dark:bg-slate-600'>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="courseName">
            Course Name
          </label>
          <input
            id="courseName"
            name="courseName"
            type="text"
            value={formData.courseName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="csvFile">
            CSV File
          </label>
          <input
            id="csvFile"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload Data'}
        </button>
      </form>
    </div>
  );
};

export default CSVUploadForm;