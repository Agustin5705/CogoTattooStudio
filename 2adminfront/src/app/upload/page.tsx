import React from "react";
import UploadForm from "./uploadForm";

export default function UploadPage() {
  return (
    <div className="w-screen min-h-screen bg-gray-950">
      {/* Contenido principal se carga desde UploadForm */}
      <UploadForm />
    </div>
  );
}
