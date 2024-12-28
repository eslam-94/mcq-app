"use client"

import { usePathname } from "next/navigation"

export default function PathName() {
    const path = usePathname()
    const names = path.split("/")
    

    return <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {names.pop()?.toUpperCase()}
           </h1>
}