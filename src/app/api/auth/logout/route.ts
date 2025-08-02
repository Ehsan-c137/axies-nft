import { cookies } from "next/headers";
import { COOKIE_KEY } from "@/services/config";

export async function POST() {
  const cookieStore = await cookies();
  try {
    cookieStore.delete(COOKIE_KEY);
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
