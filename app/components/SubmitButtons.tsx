"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function CreationSubmit() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size={"lg"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size={"lg"}>
          Save
        </Button>
      )}
    </>
  );
}

export function AddToFavouriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div></div>
      ) : (
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-white"
          type="submit"
        >
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}
