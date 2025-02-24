//import { getRestaurantBySlug } from "@/data/get-resturant-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import CosumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  //1-)
  const { slug } = await params;
  // const restaurant = await getRestaurantBySlug(slug);
  const restaurant = await db.restaurant.findUnique({ where: { slug } }); // Nome do restaurante
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo e titulo */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/* Bem Vindo */}
      <div className="pt24 space-y-2 text-center">
        <h3 className="text-2xl font-semibold">Seja Bem-Vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos oferecer
          praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <CosumptionMethodOption
          slug={slug}
          option="DINE_IN"
          buttonText="Para Comer aqui"
          imageAlt="Comer aqui"
          imageUrl="/dine_in.png"
        />
        <CosumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/takeaway.png"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;

//Por padrão todos os componentes criados no next são server components (executados no servidor).
//Server Components podem ser async e podem chamar recursos do back-end (banco de dados, APIs, etc).
//Não pode usar hooks ou usar interatividade (componentes com js).
