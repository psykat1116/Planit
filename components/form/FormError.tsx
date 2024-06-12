"use client";
import React from "react";
import { XCircleIcon } from "lucide-react";

interface FormErrorProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormError: React.FC<FormErrorProps> = ({ id, errors }) => {
  if (!errors) {
    return null;
  }
  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
        >
          <XCircleIcon className="w-4 h-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};

export default FormError;
