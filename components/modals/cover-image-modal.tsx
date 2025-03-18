"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { SingleImageDropzone } from "../single-image-dropzone"
import { useCoverImage } from "@/hooks/use-cover-image"
import { useState } from "react"
import { useEdgeStore } from "@/lib/edgestore"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

export const CoverImageModal = () => {
    const params = useParams()
    const update = useMutation(api.documents.update)
    const coverImage = useCoverImage()

    const [file, setFile] = useState<File>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { edgestore } = useEdgeStore()

    const onClose = () => {
        setFile(undefined)
        setIsSubmitting(false)
        coverImage.onClose()
    }

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true)
            setFile(file)

            const response = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
                }
            })


            await update({
                id: params.documentId as Id<'documents'>,
                coverImage: response.url
            })

            onClose()
        }
    }
    
    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <p className="text-center text-lg font-semibold">
                        Cover Image
                    </p>
                </DialogTitle>
            </DialogHeader>
            <SingleImageDropzone
                className="w-full out-none"
                disabled={isSubmitting}
                value={file}
                onChange={onChange}
                />
        </DialogContent>
    </Dialog>
)
}