import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { TextField } from "@mui/material";

interface TinyMCEEditorProps {
  id: string;
  label: string;
  initialValue: string;
  onChange: (content: any) => void;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
  id,
  label,
  initialValue,
  onChange,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tinymce = require("tinymce/tinymce");

      tinymce.init({
        selector: `#${id}`,
        height: 500,
        plugins:
          "mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        setup: (editor: {
          on: (arg0: string, arg1: () => void) => void;
          getContent: () => any;
        }) => {
          editor.on("change", () => {
            const content = editor.getContent();
            onChange(content);
          });
        },
      });

      if (initialValue) {
        tinymce.activeEditor?.setContent(initialValue);
      }
    }
  }, [id, initialValue, onChange]);

  return (
    <>
      <Editor
        id={id}
        initialValue={initialValue}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 500,
          plugins:
            "mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
      />
    </>
  );
};

export default TinyMCEEditor;
