import {saveAs} from 'file-saver';
import {generateWord} from 'quill-to-word'

export const exportDOCX = async (delta: any) => {
    const doc: Blob = await generateWord(delta, {exportAs: 'blob'}) as Blob
    saveAs(doc, "session-doc.docx")
}

export const exportPDF = (documentHTML: string) => {
    console.log(documentHTML)
}