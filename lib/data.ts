import { auth } from "@clerk/nextjs/server";

export const getUserRole = async()=>{
  const { sessionClaims } = await auth();

  console.log("Session Claims:", sessionClaims);

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return role;
}