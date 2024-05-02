import { EditorConfig } from "@ckeditor/ckeditor5-core";

export const ckEditorConfig: EditorConfig = {
    toolbar: {
        items: [
            'fontFamily', 'fontSize', ' ',
            'bold', 'italic', 'underline', 'strikethrough',
            'fontColor', 'fontBackgroundColor',
            'subscript', 'superscript',
            'heading',
            'numberedList', 'bulletedList', 'outdent', 'indent', 'alignment', 'imageUpload', 'removeFormat',
            'insertTable',
            'undo', 'redo'
        ]
    },
    image: {
        upload: {
            types: ['apng', 'ico', 'cur', 'jpg', 'jpeg', 'pjpeg', 'jfif', 'pjg', 'png']
        }
    },
};