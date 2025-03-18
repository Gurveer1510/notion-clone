"use client"

import { IconPicker } from "./icon-picker"
import { Button } from "./ui/button"
import { Image, Smile, X } from "lucide-react"
import React, { ComponentRef, useRef, useState } from "react"
import TextareaAutoSize from "react-textarea-autosize"

import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useCoverImage } from "@/hooks/use-cover-image"

interface ToolbarProps {
    initialData: Doc<"documents">
    preview?: boolean
}

const Toolbar = ({
    initialData,
    preview
}: ToolbarProps) => {

    const inputRef = useRef<ComponentRef<"textarea">>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialData.title)

    const update = useMutation(api.documents.update)
    const removeIcon = useMutation(api.documents.removeIcon)

    const coverImage = useCoverImage()

    const enableInput = () => {
        if(preview) return

        setIsEditing(true)
        setTimeout(() => {
            setValue(initialData.title)
            inputRef.current?.focus()
            // inputRef.current?.setSelectionRange(0, inputRef.current?.value.length)
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false)
    }

    const onInput = (value: string) => {
        setValue(value)
        update({
            id: initialData._id,
            title: value
        })
    }

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if(event.key === "Enter"){
            event.preventDefault()
            disableInput()
        }
    }

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon
        })
    }

    const onRemoveIcon = () => {
        removeIcon({id: initialData._id})
    }

    return (
        <div className="pl-[54px] mx-auto group relative">
            {
                !!initialData.icon && !preview && (
                    <div className="flex items-center gap-x-2 group/icon pt-6">
                        <IconPicker onChange={onIconSelect}>
                            <p className="text-6xl hover:opacity-75 transition">
                                {initialData.icon}
                            </p>
                        </IconPicker>
                        <Button
                            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                            variant={"outline"}
                            size={"icon"}
                            onClick={onRemoveIcon}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )
            }
            {
                !!initialData.icon && preview && (
                    <p className="text-6xl pt-6">
                        {initialData.icon}
                    </p>
                )
            }
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect}>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="text-muted-foreground text-xs"
                        >
                            <Smile className="h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {
                    !initialData.coverImage && !preview && (
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={coverImage.onOpen}
                            className="text-muted-foreground text-xs"
                        >
                            <Image className="h-4 w-4 mr-2" />
                            Add cover
                        </Button>
                    )
                }
            </div>
            {isEditing && !preview ? (
                <TextareaAutoSize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => onInput(event.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] overflow-x-clip "
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                >
                    {initialData.title}
                </div>
            )}
        </div>
    )
}

export default Toolbar