"use server";

import { auth } from "@/auth";
import { db } from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData) {
  const session = await auth();
  const googleId = (session as any)?.google_id;

  if (!googleId) {
    throw new Error("Not authenticated");
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  if (!firstName?.trim() || !lastName?.trim()) {
    throw new Error("First name and last name are required");
  }

  await db
    .update(users)
    .set({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      isOnboarded: true,
      updatedAt: new Date(),
    })
    .where(eq(users.googleId, googleId));

  redirect("/classroom");
}
