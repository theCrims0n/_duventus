import { auth } from "@/auth.config";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";
import { redirect } from "next/navigation";
export default async function ShopLayout({ children }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login");
    }

    return (
        <main className="min-h-screen">
            <TopMenu />
            <div className="px-0 sm:px-10">
                {children}
            </div>
        </main>
    );
}