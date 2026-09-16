import { redirect } from "next/navigation";
import { getAdminSession } from "./_lib/session";

export default async function AdminIndex() {
  redirect((await getAdminSession()) ? "/admin/dashboard" : "/admin/login");
}
