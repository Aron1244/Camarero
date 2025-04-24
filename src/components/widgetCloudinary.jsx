"use client";

import React, { useEffect } from "react";

const WidgetCloudinary = ({ onSuccess }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dovt9safa",
          uploadPreset: "camarero",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            onSuccess(result);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onSuccess]);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Subir Imagen
    </button>
  );
};

export default WidgetCloudinary;
