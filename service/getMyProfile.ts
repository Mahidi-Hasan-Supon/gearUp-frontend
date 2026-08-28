"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getMyProfile = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    redirect("/login");
  }

  return result.data;
};

export const redirectToMyProfile = async () => {
  const profile = await getMyProfile();

  if (profile.role === "ADMIN") {
    redirect("/admin-dashboard/profile");
  }

  if (profile.role === "PROVIDER") {
    redirect("/provider-dashboard/profile");
  }

  if (profile.role === "CUSTOMER") {
    redirect("/dashboard/customer/profile");
  }

  redirect("/");
};


// current user
export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return null;
  }

  const result = await res.json();

  if (!result.success) {
    return null;
  }

  return result.data;
};