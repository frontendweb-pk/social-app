import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Form from "next/form";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/login");
  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(session)}
      <Form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
