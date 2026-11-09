"use client";

import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import { redirectTarget } from "@/lib/utils";

export default function SocialLogin() {
  const google = async () => {
    const { error } = await signIn.social({ provider: "google", callbackURL: redirectTarget() });
    if (error) toast.error(error.message || "Google sign-in isn't available right now.");
  };
  return (
    <>
      <div className="divider my-6 text-xs text-base-content/50">or continue with</div>
      <button type="button" onClick={google} className="btn btn-outline btn-block">
        <FcGoogle size={20} /> Google
      </button>
    </>
  );
}
