"use server";

export async function registerAction(formData: FormData) {
  //  FormData 
  const payload = new FormData();
  payload.append("name", String(formData.get("name") || ""));
  payload.append("email", String(formData.get("email") || ""));
  payload.append("password", String(formData.get("password") || ""));
  payload.append("role", String(formData.get("role") || "CUSTOMER"));
  const photo = formData.get("photo");

  // Empty file  FormData  remove 
  if (photo instanceof File && photo.size === 0) {
    formData.delete("photo");
  }

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
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
