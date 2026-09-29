import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name ?? "Learner",
    email: session.user.email,
    image: session.user.image ?? undefined,
  };
}
