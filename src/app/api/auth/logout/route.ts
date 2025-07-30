import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  try {
    cookieStore.delete("session");
    return new Response(JSON.stringify({ message: "Logout successful" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(
      JSON.stringify({ message: "An internal server error occurred." }),
      { status: 500 },
    );
  }
}
