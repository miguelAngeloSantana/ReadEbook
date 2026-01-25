import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import ButtonLogout from "./ButtonLogout";
import ButtonLogin from "./ButtonLogin";

export default async function ButtonMenu() {
   const session = await auth.api.getSession({
    headers: await headers()
   });

   return (
        <div 
            className="bg-blue-200 rounded-3xl text text-[#121212] font-bold cursor-pointer"
            style={{padding: "0.8rem"}}
        >
           {session? <ButtonLogout />: <ButtonLogin />}
        </div>
   )
}