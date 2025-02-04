import NavBar from "../navbar/navbar"
import { useAuth } from "../auth/useAuth"
import apiService from "../../services/apiService";
import { TeacherInfo } from "../../types";
import { useState, useEffect } from "react";

import { useCookies } from "react-cookie";

export default function MyAccount() {
  const {user} = useAuth();
  const email: string = user?.email || 'nah@notworking.com';
  console.log(`user-email-> ${email}`)

  const [data, setData] = useState<TeacherInfo>({
    "teacher_id": "",
    "name": "",
    "email": "",
    "units": [
      {
        "unit_id": "",
        "semester": ""
      }
    ]
  });
  const [cookies, setCookie] = useCookies([`teacherInfo_${email}`])

  useEffect(() => {
    //Try to load data from cookie
    const cookieData = cookies[`teacherInfo_${email}`]
    if (cookieData) {
      console.log(`cookieData-Profile: ${cookieData}`)
      setData(cookieData)
    }

    const fetchData = async () => {
      try {
        const result = await apiService.getTeacherInfo(email)
        setData(result)

        // Store the new data in cookie
        setCookie(`teacherInfo_${email}`, result, {
          path: '/profile',
          maxAge: 3600, // Cookie expires in 1 hour
          secure: true,
          sameSite: 'strict'
        });
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    }
    fetchData()
  }, [email]);

  console.log(`teacher: ${data}`)
  
  return (
    <>
      <NavBar />
      <main className="w-full flex justify-center h-full p-5">
        <div className="card bg-base-100 w-96 shadow-xl m-5 border border-teal-500">
          <figure>
            <img
              src="https://pbs.twimg.com/profile_images/1846119592659496960/sXAZAvFd_400x400.jpg"
              alt="Profile Picture" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {data.teacher_id}
              <div className="badge badge-warning">{data.units[0].unit_id}</div>
              <div className="badge badge-success">{data.units[0].semester}</div>
            </h2>
            <h3 className="font-semibold">{data.name}</h3>
            <p>/{user?.email}/</p>
          </div>
        </div>
      </main>
    </>
  )
}
