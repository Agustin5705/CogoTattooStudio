"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFormData } from "../types/form";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (data: ContactFormData) => {
    // 1. ACTIVA LA CARGA AL INICIO
    setIsLoading(true);

    const file = data.referenceImage ? data.referenceImage[0] : null;
    let imageUrl = data.link;

    if (!file && !data.link) {
      alert("Debe proporcionar una URL o subir una imagen de referencia.");
      // 2. DESACTIVA LA CARGA SI FALLA LA VALIDACIÓN INICIAL
      setIsLoading(false);
      return;
    } // --- 1. SUBIDA DE IMAGEN A CLOUDINARY (Llamada 1) ---

    if (file) {
      try {
        // Creamos el FormData nativo para enviar el archivo binario
        const uploadData = new FormData();
        uploadData.append("file", file);

        const uploadResponse = await fetch(`${apiUrl}/upload`, {
          method: "POST",
          body: uploadData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Error al subir la imagen a Cloudinary.");
        }
        const result = await uploadResponse.json();
        imageUrl = result.secure_url;
      } catch (error) {
        console.error("Error en la subida de imagen:", error);
        alert(
          "Hubo un error al subir la imagen de referencia. Por favor, inténtalo de nuevo."
        );
        // 3. DESACTIVA LA CARGA SI FALLA LA SUBIDA
        setIsLoading(false);
        return;
      }
    } // --- 2. ENVÍO DEL FORMULARIO FINAL (Llamada 2) ---

    const formPayload = {
      fullName: data.fullName,
      wpp: data.wpp,
      presupuesto: data.presupuesto,
      fecha: data.fecha,
      link: imageUrl,
    };

    try {
      const response = await fetch(`${apiUrl}/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        alert("¡Mensaje y archivo enviados con éxito!");
        reset();
      } else {
        alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario final:", error);
      alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
    } finally {
      // 4. DESACTIVA LA CARGA AL FINAL, INDEPENDIENTEMENTE DEL RESULTADO
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-6 md:p-10 bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 mt-2"
    >
      <p className="block text-sm text-gray-300 mt-4 font-bold">
        Nombre completo:
      </p>
      <input
        type="text"
        placeholder="Tu nombre completo"
        {...register("fullName", { required: true })}
        className="w-full px-4 py-3 mt-1 bg-gray-900 border border-gray-700 text-white rounded-lg shadow-inner"
      />
      {errors.fullName && <p>Por favor ingrese su nombre completo.</p>}
      <p className="block text-sm text-gray-300 mt-4 font-bold">
        Fecha disponible:
      </p>
      <input
        type="date"
        {...register("fecha")}
        className="w-full px-4 py-3 mt-1 bg-gray-900 border border-gray-700 text-white rounded-lg shadow-inner"
      />
      {errors.fecha && <p>{errors.fecha.message}</p>}
      <p className="block text-sm text-gray-300 mt-4 font-bold">
        Imagen de referencia:
      </p>
      <input
        type="file"
        accept="image/png, image/jpeg" // Restringir a formatos de imagen
        {...register("referenceImage")}
        className="w-full px-4 py-3 mt-1 bg-gray-900 border border-gray-700 text-white rounded-lg shadow-inner"
      />
      {errors.referenceImage && <p>{errors.referenceImage.message}</p>}
      <p className="block text-sm text-gray-300 mt-4 font-bold">
        Dirección de la imagen de referencia:
      </p>
      <input
        type="url"
        placeholder="Link de la imagen de modelo"
        {...register("link", {
          pattern: {
            value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
            message: "Por favor, ingresa una URL válida.",
          },
        })}
        className="w-full px-4 py-3 mt-1 bg-gray-900 border border-gray-700 text-white rounded-lg shadow-inner"
      />
      {errors.link && <p>{errors.link.message}</p>}
      <p className="block text-sm text-gray-300 mt-4 font-bold">
        Presupuesto disponible:
      </p>
      <input
        type="number"
        placeholder="Presupuesto disponible"
        {...register("presupuesto", { valueAsNumber: true })}
        className="w-full px-4 py-3 mt-1 bg-gray-900 border border-gray-700 text-white rounded-lg shadow-inner"
      />
      {errors.presupuesto && <p>{errors.presupuesto.message}</p>}
      <p className="block text-sm text-gray-300 mt-4 font-bold">
        Teléfono de contacto:
      </p>
      <input
        type="tel"
        placeholder="Número de WhatsApp"
        {...register("wpp", {
          required: "El número de WhatsApp es obligatorio.",
          pattern: {
            value: /^[0-9]+$/,
            message: "Por favor, ingresa solo números.",
          },
          minLength: {
            value: 9,
            message: "El número de teléfono debe tener 9 dígitos.",
          },
          maxLength: {
            value: 9,
            message: "El número de teléfono debe tener 9 dígitos.",
          },
        })}
        className="w-full px-4 py-3 mt-1 bg-gray-900 border border-gray-700 text-white rounded-lg shadow-inner"
      />
      {errors.wpp && <p>{errors.wpp.message}</p>}
      <input
        type="submit"
        value={isLoading ? "Enviando, espere..." : "Enviar Solicitud"}
        disabled={isLoading}
        className="mt-2 rounded-lg bg-gray-400 p-2 font-bold hover:animate-pulse"
      />
      {/* DISCLAIMER VISIBLE SOLO DURANTE LA CARGA */}
      {isLoading && (
        <p style={{ color: "blue", fontWeight: "bold" }}>
          Estamos subiendo tu imagen y enviando el formulario, por favor, no
          cierres esta página.
        </p>
      )}
    </form>
  );
}
