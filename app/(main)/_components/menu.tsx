"use client"

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { MoreHorizontal, Trash } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface MenuProps {
    documentId: Id<"documents">
}

const Menu = ({
    documentId
}: MenuProps) => {

    const router = useRouter()
    const { user } = useUser()

    const archive = useMutation(api.documents.archive)

    const onArchive = () => {
        const promise = archive({
            id: documentId
        })

        toast.promise(promise, {
            loading: "Moving to trash",
            success: "Note moved to trash",
            error: "Failed to archive note"
        })

        router.push("/documents")
    }

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className='w-60' 
                align='end' 
                alignOffset={8} 
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className='h-4 w-4 mr-2' />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className='text-xs text-muted-foreground p-2'>
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeletop() {
    return (
        <Skeleton className='h-10 w-10' />
    )
}

export default Menu