import type { ReactNode } from "react";
import { getServerAuthUser } from "@/lib/services/auth.server.service";
import { AuthProvider } from "@/lib/auth/Context";
import type { AuthUser } from "@/lib/types/auth.type";
import { CheckoutFooter } from "./_components/CheckoutFooter";

export const metadata = {
  title: "Secure Checkout | TunedEssays",
  description: "Complete your payment securely.",
};

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default async function CheckoutLayout({ children }: CheckoutLayoutProps) {
  const authResult = await getServerAuthUser();

  // if (!authResult.ok) {
  //   redirect("/auth/login?callbackUrl=/order/checkout");
  // }

  const initialUser: AuthUser | null = authResult.ok ? authResult.user: null;

  return (
    <AuthProvider initialUser={initialUser} skipInitialFetch={initialUser !== null}>
      <div className="flex min-h-screen flex-col">
        {children}
        <CheckoutFooter />
      </div>
    </AuthProvider>
  );
}
