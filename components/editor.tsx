"use client"

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes"

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    const { resolvedTheme } = useTheme()
    const { edgestore } = useEdgeStore()

    const handleUpload = async(file: File) => {
        const res = await edgestore.publicFiles.upload({
            file
        })

        return res.url
    }

    const onEditorContentChange = (editor: BlockNoteEditor) => {
        onChange(JSON.stringify(editor.document, null, 2))
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload
    })

    return (
        <div>
            <BlockNoteView
                editor={editor}
                onChange={() => onEditorContentChange(editor)}
                editable={editable}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    )
}

export default Editor