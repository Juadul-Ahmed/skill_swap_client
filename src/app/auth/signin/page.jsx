import { Suspense } from "react";
import SigninClient from "./SigninClient";


export default function SigninPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0F]" />}>
      <SigninClient />
    </Suspense>
  );
}