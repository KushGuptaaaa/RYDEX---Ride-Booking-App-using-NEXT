import { auth } from "@/auth";

import Nav from "@/components/Nav";

import PublicHome from "@/components/PublicHome";
import connectDb from "@/lib/db";
import User from "@/models/user.model";

export default async function Home() {
const session=await auth()
  await connectDb()
  const user=await User.findOne({email:session?.user?.email})
 const plainUser = JSON.parse(JSON.stringify(user))
  return (
   <div className="w-full min-h-screen bg-white">
      <Nav/>
      <PublicHome/>
   </div>
  );
}
