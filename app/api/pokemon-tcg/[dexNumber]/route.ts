import { NextResponse } from "next/server";
import type { PokemonTcgCardArt } from "@/app/domain/tcgCard";

const TCG_API = "https://api.pokemontcg.io/v2/cards";

type TcgApiCard = {
  id: string;
  name: string;
  images?: { large?: string; small?: string };
  set?: { name?: string };
};

export async function GET(
  _request: Request,
  { params }: { params: { dexNumber: string } }
) {
  const dex = Number(params.dexNumber);
  if (!Number.isFinite(dex) || dex < 1) {
    return NextResponse.json({ error: "Invalid Pokédex number" }, { status: 400 });
  }

  const apiKey = process.env.POKEMON_TCG_API_KEY;
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(apiKey ? { "X-Api-Key": apiKey } : {}),
  };

  const url = new URL(TCG_API);
  url.searchParams.set("q", `nationalPokedexNumbers:${dex}`);
  url.searchParams.set("pageSize", "24");

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 86_400 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to load TCG data" },
      { status: res.status === 429 ? 429 : 502 }
    );
  }

  const json: { data?: TcgApiCard[] } = await res.json();
  const raw = json.data ?? [];

  const seen = new Set<string>();
  const cards: PokemonTcgCardArt[] = [];

  for (const card of raw) {
    const imageUrl = card.images?.large ?? card.images?.small;
    if (!imageUrl || seen.has(imageUrl)) continue;
    seen.add(imageUrl);
    cards.push({
      id: card.id,
      name: card.name,
      imageUrl,
      setName: card.set?.name ?? "Unknown set",
    });
  }

  return NextResponse.json({ cards });
}
