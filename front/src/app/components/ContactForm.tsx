"use client";

import { useForm } from "react-hook-form";
import { FormData } from "../types/form";

export function ContactForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Envía una solicitud POST al endpoint de tu backend
      const response = await fetch("http://localhost:3001/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("¡El mensaje se ha enviado con éxito!");
        reset(); // Limpia el formulario solo si el envío fue exitoso
      } else {
        alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Nombre completo:</p>
      <input
        type="text"
        placeholder="Tu nombre completo"
        {...register("fullName", { required: true })}
      />
      {errors.fullName && <p>Por favor ingrese su nombre completo.</p>}
      <p>Fecha disponible:</p>
      <input type="date" {...register("fecha")} />
      {errors.fecha && <p>{errors.fecha.message}</p>}

      {/* imagen */}
      {/* pendiente: implementar tecnologia para subir imagenes */}
      <p>Dirección de la imagen de referencia:</p>
      <input
        type="url"
        placeholder="Link de la imagen de modelo"
        {...register("link", {
          pattern: {
            value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
            message: "Por favor, ingresa una URL válida.",
          },
        })}
      />
      {errors.link && <p>{errors.link.message}</p>}
      <p>Presupuesto disponible:</p>
      <input
        type="number"
        placeholder="Presupuesto disponible"
        {...register("presupuesto", { valueAsNumber: true })}
      />
      {errors.presupuesto && <p>{errors.presupuesto.message}</p>}
      <p>Teléfono de contacto:</p>

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
      />
      {errors.wpp && <p>{errors.wpp.message}</p>}
      <input type="submit" />
    </form>
  );
}
