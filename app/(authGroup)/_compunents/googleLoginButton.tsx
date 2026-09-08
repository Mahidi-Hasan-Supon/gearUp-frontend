"use client";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type GoogleLoginButtonProps = {
  role?: "CUSTOMER" | "PROVIDER";
};

export default function GoogleLoginButton({ role }: GoogleLoginButtonProps) {
  const router = useRouter();

  const handleGoogleLogin = async (credential: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            credential,
            ...(role && { role }),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Google login failed");
        return;
      }

      toast.success(result.message || "Google login successful");

      const userRole = result.data.user.role;

      if (userRole === "PROVIDER") {
        router.push("/provider-dashboard");
      } else if (userRole === "CUSTOMER") {
        router.push("/dashboard/customer");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Google authentication failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (!credentialResponse.credential) {
          toast.error("Google credential not found");
          return;
        }

        handleGoogleLogin(credentialResponse.credential);
      }}
      onError={() => {
        toast.error("Google login failed");
      }}
    />
  );
}
