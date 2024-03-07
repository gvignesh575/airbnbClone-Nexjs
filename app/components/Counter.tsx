import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";

export function Counter() {
  return (
    <div className="flex items-center gap-x-4">
      <Button variant={"outline"} size={"icon"} type="button">
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p>0</p>
      <Button variant={"outline"} size={"icon"} type="button">
        <Minus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
