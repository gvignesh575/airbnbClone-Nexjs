import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavouriteButton } from "./SubmitButtons";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavouriteList: boolean;
  favouriteId: string;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favouriteId,
  isInFavouriteList,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://ebpjnvddtoofdlnfoivb.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of house"
          fill
          className="rounded-lg h-full object-cover"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavouriteList ? (
              <form action="">
                <AddToFavouriteButton />
              </form>
            ) : (
              <form action="">
                <AddToFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={"/"} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.label} {" / "} {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 ">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
}
