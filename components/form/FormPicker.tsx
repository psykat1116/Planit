"use client";
import React, { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImages } from "@/constant/images";
import Link from "next/link";
import FormError from "./FormError";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        console.log(result);
        if (result && result.response) {
          setImages(result.response as Array<Record<string, any>>);
        } else {
          console.log("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((img) => (
          <div
            key={img.id}
            className={cn(
              "cursor-pointer aspect-video relative group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImage(img.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImage === img.id}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
            />
            <Image
              src={img.urls.thumb}
              alt="Unsplsh Image"
              fill
              className="object-cover rounded-sm"
            />
            {selectedImage === img.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/60 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={img.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[5px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {img.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormError errors={errors} id="image" />
    </div>
  );
};

export default FormPicker;
