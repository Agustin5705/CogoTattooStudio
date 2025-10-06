import React from "react";
import UploadForm from "./uploadForm";

export default function UploadPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      {/* Contenido principal se carga desde UploadForm */}
      <UploadForm />
    </div>
  );
}
