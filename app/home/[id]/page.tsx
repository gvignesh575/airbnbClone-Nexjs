import prisma from "@/app/lib/db";
import Image from "next/image";

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await getData(params.id);

  return (
    <div className="w-[75%] mx-auto mt-10">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative">
        <Image alt="Image of Home" />
      </div>
    </div>
  );
}
