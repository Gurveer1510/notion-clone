"use client"

import { Doc } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useEdgeStore } from '@/lib/edgestore'

interface BannerProps {
    document: Doc<"documents">
}

const Banner = ({
    document
}: BannerProps) => {

    const router = useRouter()
    const { edgestore } = useEdgeStore()
    const remove = useMutation(api.documents.remove)
    const restore = useMutation(api.documents.restore)

    const onRemove = async () => {
        const promise = remove({ id: document._id })
        await edgestore.publicFiles.delete({
            url: document.coverImage!
        })
        toast.promise(promise, {
            loading: "Deleting note",
            success: "Note deleted",
            error: "Failed to delete note"
        })

        router.push("/documents")
    }
    const onRestore = () => {
        const promise = restore({ id: document._id })

        toast.promise(promise, {
            loading: "Restoring note",
            success: "Note restored",
            error: "Failed to restore note"
        })
    }


    return (
        <div className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
            <p>
                This page is in the trash
            </p>
            <Button
                size={"sm"}
                onClick={onRestore}
                variant={"outline"}
                className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
            >
                Restore Page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default Banner