import supabase from "../../utils/supabase";
import AuthComponent from "./auth0comp";

export default function Authenticate() {

  return (
    <main className="flex flex-col justify-center items-center h-full w-full p-3">
      <h2 className="my-5 text-3xl font-semibold text-center">Attendeez</h2>
      <AuthComponent 
        supabase={supabase} 
        redirectUrl="https://attendeez-tutor.vercel.app/"
      />
    </main>
  )
}
