import { auth } from "@/auth";
import Footer from "@/components/footer";
import TypeWriter from "@/components/type-writer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth()
  
  return (
      <section className="mx-auto container grid auto-rows-auto justify-items-center min-h-screen sm:p-1 font-[family-name:var(--font-geist-sans)]">

        <div className="my-auto flex flex-col w-full lg:w-3/6">
          
          <TypeWriter/>
                  
          <div className="mx-auto space-x-3">
            {
              !!session?.user ?
              
              session.user.role === 'admin' ?

              <Link href="/dashboard">
                <Button variant="success">Dashboard</Button>
              </Link>
              :
              <Link href="/create">
                <Button variant="success">Take Quiz</Button>
              </Link>
              :
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
              
            }
          </div>
          
        </div>
        
        <Footer/>
      
      </section>    
  );
}
