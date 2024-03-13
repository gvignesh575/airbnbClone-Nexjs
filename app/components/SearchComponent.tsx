"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";
import { redirect, usePathname } from "next/navigation";

import { useRef } from "react";

export function SearchModalComponent() {
  const [step, setStep] = useState(1);

  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  const pathname = usePathname();

  const ref = useRef<HTMLFormElement | null>(null);

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Access form values using the form reference
    const formData = new FormData(ref?.current as any);
    const country = formData.get("country");
    const guests = formData.get("guest");
    const rooms = formData.get("room");
    const bathroom = formData.get("bathroom");

    window.location.href = `/?country=${country}&guests=${guests}&rooms=${rooms}&bathroom=${bathroom}`;
  };

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Next
        </Button>
      );
    } else if (step === 2) {
      if (pathname.includes("/home")) {
        return <Button onClick={handleRedirect}>Search</Button>;
      } else {
        return <CreationSubmit />;
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">AnyWhere</p>
            <p className="px-4">Any week</p>
            <p className="px-4">Add Guests</p>
          </div>
          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col" ref={ref}>
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, so that what you want
                </DialogDescription>
              </DialogHeader>
              <Select
                required
                onValueChange={(value) => setLocationValue(value)}
                value={locationValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getAllCountries().map((item: any) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.flag} {item.label} / {item.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, so that what you want
                </DialogDescription>
              </DialogHeader>
              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h2 className="underline font-medium">Guests</h2>
                      <p className="text-muted-foreground text-sm">
                        How many guests do you want?
                      </p>
                    </div>
                    <Counter name="guest" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h2 className="underline font-medium">Rooms</h2>
                      <p className="text-muted-foreground text-sm">
                        How many guests do you want?
                      </p>
                    </div>
                    <Counter name="room" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h2 className="underline font-medium">Bathrooms</h2>
                      <p className="text-muted-foreground text-sm">
                        How many Bathrooms do you have?
                      </p>
                    </div>
                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
