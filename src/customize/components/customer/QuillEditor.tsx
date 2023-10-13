import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";

interface QuillEditorProps {
  id: string;
  value: string;
  onChange: (content: string) => void;
}

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

interface QuillType {
  on: (
    eventName: "text-change" | "selection-change" | "editor-change",
    handler: (...args: any[]) => void
  ) => void;
  off: (
    eventName: "text-change" | "selection-change" | "editor-change",
    handler: (...args: any[]) => void
  ) => void;
  clipboard: {
    dangerouslyPasteHTML: (
      index: number,
      content: string,
      source: string
    ) => void;
  };
  root: HTMLDivElement;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ id, value, onChange }) => {
  const quillRef = useRef<QuillType | null>(null);
  const [editorContent, setEditorContent] = useState<string | null>(value);

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  useEffect(() => {
    let isMounted = true;

    const importQuill = async () => {
      if (isMounted && !quillRef.current) {
        try {
          const { Quill } = await import("quill");

          if (Quill) {
            const newQuill = new Quill(`#${id}`, {
              theme: "snow",
              modules: {
                // ... (your modules)
              },
            }) as unknown as QuillType;

            quillRef.current = newQuill;

            const textChangeHandler = () => {
              const currentQuill = quillRef.current;

              if (currentQuill) {
                const content = currentQuill.root.innerHTML;
                setEditorContent(content);
              }
            };

            newQuill.on("text-change", textChangeHandler);

            if (value && value !== editorContent) {
              newQuill.clipboard.dangerouslyPasteHTML(0, value, "silent");
            }

            return () => {
              if (quillRef.current) {
                quillRef.current.off("text-change", textChangeHandler);
                quillRef.current = null;
              }
            };
          }
        } catch (error) {
          console.error("Error importing Quill:", error);
        }
      }
    };

    importQuill();

    return () => {
      isMounted = false;
    };
  }, [editorContent, id, onChange, value]);

  const handleQuillChange = (content: string) => {
    setEditorContent(content);
    onChange(content);
  };

  return (
    <Box id={id}>
      <QuillNoSSRWrapper
        value={editorContent || ""}
        onChange={handleQuillChange}
      />
    </Box>
  );
};

export default QuillEditor;
