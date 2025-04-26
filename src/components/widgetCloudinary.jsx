"use client";

import React, { useEffect } from "react";

const WidgetCloudinary = ({ onSuccess }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dovt9safa",
          uploadPreset: "camarero",
          sources: ["local", "url", "camera"],
          multiple: false,
          cropping: false,
          maxFileSize: 1500000,
          clientAllowedFormats: ["jpg", "jpeg", "png"],
          styles: {
            palette: {
              window: "#ffffff",
              sourceBg: "#f4f4f4",
              windowBorder: "#90a0b3",
              tabIcon: "#000000",
              link: "#0078ff",
              action: "#0078ff",
              complete: "#20B832",
              error: "#c43737",
              textDark: "#000000",
              textLight: "#ffffff",
            },
          },
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            onSuccess(result);
          }
        }
      );

      document
        .getElementById("upload_widget")
        .addEventListener("click", () => myWidget.open());
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onSuccess]);

  return (
    <button
      id="upload_widget"
      className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition flex space-between gap-2"
    >
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
          clipRule="evenodd"
        />
      </svg>
      Subir Imagen
    </button>
  );
};

export default WidgetCloudinary;
