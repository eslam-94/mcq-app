import Link from "next/link";
import { auth } from "@/auth";
import { logOut } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const session = await auth()

    return (
    
        <>
            { !!session?.user &&
    
                <div className="mt-2 px-2 w-full flex items-baseline gap-x-2">

                    <Link href="/">
                        <Button>Home</Button>
                    </Link>
                    
                    <div className="ms-auto text-lg font-semibold">
                        {session.user.name}
                    </div>
                    
                    <form action={logOut}>
                        <Button>Sign Out</Button>
                    </form>

                </div>                    
            }
        </>
    ) 
}