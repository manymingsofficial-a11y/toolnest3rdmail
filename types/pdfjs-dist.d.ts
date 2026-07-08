declare module 'pdfjs-dist/build/pdf.mjs' {
  export const GlobalWorkerOptions: { workerSrc: string };
  export type PDFDocumentProxy = {
    numPages: number;
    getPage(page: number): Promise<PDFPageProxy>;
  };
  export type PDFPageProxy = {
    getViewport(params: { scale: number }): {
      width: number;
      height: number;
    };
    render(params: {
      canvasContext: CanvasRenderingContext2D;
      viewport: { width: number; height: number };
    }): { promise: Promise<void> };
  };
  export function getDocument(params: {
    data: ArrayBuffer | Uint8Array;
  }): { promise: Promise<PDFDocumentProxy> };
}

declare module 'pdfjs-dist/build/pdf.worker.mjs?url' {
  const src: string;
  export default src;
}
