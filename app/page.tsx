import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";
import SkeletonCard from "./components/SkeletonCard";
import { NoItems } from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favourite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10 pb-14">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <>
          <NoItems
            description="Please check a other category or create your own listing!"
            title="Sorry no listings found for this category found..."
          />
        </>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {data.map((item) => (
              <ListingCard
                key={item.id}
                description={item.description as string}
                imagePath={item.photo as string}
                location={item.country as string}
                price={item.price as number}
                userId={user?.id}
                favouriteId={item.Favourite[0]?.id}
                isInFavouriteList={item.Favourite.length > 0 ? true : false}
                homeId={item.id}
                pathName="/"
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}










// KINDE_CLIENT_ID=6314d481970c4f69b5bb9865bc465741
// KINDE_CLIENT_SECRET=hBMc4I2XWuLhaLzvPhnXwO2XxyRY8pHLxrHaU3d1DW56iEUKMtSa
// KINDE_ISSUER_URL=https://airbnbprojectnextjs.kinde.com
// KINDE_SITE_URL=http://localhost:3000
// KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
// KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/creation


// airbnbclone123

// DATABASE_URL="postgres://postgres.ebpjnvddtoofdlnfoivb:gvigneshProject@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
// DIRECT_URL="postgres://postgres.ebpjnvddtoofdlnfoivb:gvigneshProject@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
// SUPABASE_URL=https://ebpjnvddtoofdlnfoivb.supabase.co


// SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVicGpudmRkdG9vZmRsbmZvaXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwOTQxODMsImV4cCI6MjAyNTY3MDE4M30.mB7F5U7EjkLKculCmCcinL2mJoUYqeQflAvMHEbV01s
