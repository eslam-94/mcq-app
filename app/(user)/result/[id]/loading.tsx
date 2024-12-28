import { Loader2 } from "lucide-react";

export default function Page() {
    return (
        <>
            <Loader2 color="#94a3b8" className="w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] animate-spin" />
            <p className="my-2 text-center text-xl">Loading Results....</p>  
        </>
    ) 
}