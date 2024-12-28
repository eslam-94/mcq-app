import { Button } from '@/components/ui/button';
import { verifyJwt } from '@/lib/actions';
import Link from 'next/link';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
    searchParams: SearchParams
}) {

    const searchParams = await props.searchParams
    
    const token = searchParams.token as string

    const isVerified = await verifyJwt(token)

    return (
        <div className='flex flex-col grow gap-5 items-center justify-center'>
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
                {isVerified}
            </h1>
            <Link href="/login">
                <Button className='w-36'>Log In</Button>
            </Link>
        </div>
    )
}