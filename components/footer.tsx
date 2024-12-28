import { Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="flex gap-3 flex-wrap items-end justify-center">
          <p>
            created by <span className="font-bold">Eslam Ismail</span>
          </p>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="mailto:kapitan.developer.94@gmail.com">
                  <Mail/>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>kapitan.developer.94@gmail.com</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Link href="https://www.upwork.com/freelancers/~01e668920155febefb?mp_source=share" target="_blank">
            <Image width={24} height={24} src="/upwork logo.png" alt={""}/>
          </Link>
        </footer>
    )
}