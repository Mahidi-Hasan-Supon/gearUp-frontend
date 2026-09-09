
"use server";

export async function registerAction(formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: result.message || "Registration successful",
    };
  } catch (error) {
    console.error("Registration Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

