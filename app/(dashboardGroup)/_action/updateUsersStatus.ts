"use server";

import { cookies } from "next/headers";

type UpdateUserStatusResponse = {
  success: boolean;
  message: string;
};

export const updateUserStatus = async (
  userId: string,
  status: string,
): Promise<UpdateUserStatusResponse> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && {
            Authorization: `Bearer ${accessToken}`,
          }),
        },
        body: JSON.stringify({
          status,
        }),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update user status",
      };
    }

    return {
      success: true,
      message: result.message || "User status updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};