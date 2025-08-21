import React, { useEffect } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useColorScheme } from "@mantine/hooks"; // ✅ for detecting light/dark mode
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface DescriptionEditorProps {
  className?: string;
  value?: string;
  onChange?: (content: string) => void;
  initialContent?: string;
}

const STORAGE_KEY = "descriptionEditorContent";

export default function DescriptionEditor({
  className,
  onChange,
  initialContent = "",
}: DescriptionEditorProps) {
  const editor = useCreateBlockNote();
  const colorScheme = useColorScheme(); // ✅ 'light' or 'dark'

  useEffect(() => {
    const savedContent = initialContent || sessionStorage.getItem(STORAGE_KEY);
    if (savedContent && editor) {
      try {
        const parsed = JSON.parse(savedContent);
        editor.replaceBlocks(parsed, null);
      } catch {
        // silent fail
      }
    }
  }, [initialContent, editor]);

  const handleChange = () => {
    if (!editor) return;
    const blocks = editor.topLevelBlocks;
    const serialized = JSON.stringify(blocks);
    try {
      sessionStorage.setItem(STORAGE_KEY, serialized);
    } catch {}
    onChange?.(serialized);
  };

  if (!editor) return null;

  return (
    <div
      className={`
        border rounded-md 
        border-gray-300 dark:border-zinc-600 
        bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-300
        ${className ?? ""}
      `}
      style={{
        maxHeight: "fit-content",
        maxWidth: "100%",
        padding: "0.5rem",
      }}
    >
      <div
        className="overflow-y-auto"
        style={{
          maxHeight: "20rem",
        }}
      >
        <BlockNoteView
          editor={editor}
          editable
          onChange={handleChange}
          className="min-h-[6rem] w-full"
          data-testid="blocknote-editor"
          theme={colorScheme} // ✅ THIS IS THE KEY!
        />
      </div>
    </div>
  );
}
