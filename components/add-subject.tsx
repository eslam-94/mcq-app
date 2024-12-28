"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NotepadText } from "lucide-react"
import { useState } from "react"
import { Input } from "./ui/input"

export default function CreateSubject() {
    
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
            <Button variant="success">Create Subject<NotepadText/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-full md:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create Subject</DialogTitle>
                <DialogDescription/>
            </DialogHeader>
                <Input name="subject" placeholder="enter subject name" />
            <DialogFooter>
            <DialogClose asChild>
                <Button type="submit">Save</Button>
            </DialogClose>
            </DialogFooter>
            </DialogContent>
        </Dialog>
  )
}