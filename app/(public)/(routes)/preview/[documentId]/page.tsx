'use client'

import { use } from "react"

import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"
import { useMemo } from "react"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import Toolbar from "@/components/toolbar"
import { Cover } from "@/components/cover"
import { Skeleton } from "@/components/ui/skeleton"

interface DocumentIdPageProps {
    params: Promise<{ documentId: Id<"documents"> }>
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
    const resolvedParams = use(params)

    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), [])

    const document = useQuery(api.documents.getById, {
        documentId: resolvedParams.documentId
    })

    const update = useMutation(api.documents.update)

    const onChange = (content: string) => {
        update({
            id: resolvedParams.documentId,
            content
        })
    }

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-14 w-[80%]" />
                        <Skeleton className="h-14 w-[40%]" />
                        <Skeleton className="h-14 w-[60%]" />
                    </div>
                </div>
            </div>
        )
    }

    if (document === null) {
        return <div>Not Found</div>
    }

    return (
        <div className="pb-40">
            <Cover preview url={document.coverImage} />
            <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
                <Toolbar preview initialData={document} />
                <Editor editable={false} onChange={onChange} initialContent={document.content} />
            </div>
        </div>
    )
}