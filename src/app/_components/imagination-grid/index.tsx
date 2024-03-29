import { getImaginations } from "@/server/get-Imaginations"
import { ImaginationCard } from "../imagination-card"

interface ImaginationGridProps {
  prompt?: string
}

export async function ImaginationGrid({ prompt }: ImaginationGridProps) {
  const Imaginations = await getImaginations({
    take: 100,
    orderBy: prompt
      ? {
          _relevance: {
            fields: ["prompt"],
            sort: "desc",
            search: prompt,
          },
        }
      : undefined,
    cacheStrategy: prompt
      ? {
          swr: 86_400, // 1 day
          ttl: 7_200, // 2 hours
        }
      : undefined,
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
      <h2 className="font-semibold text-md text-left w-full mb-3">{!!prompt ? "Related Imaginations" : "Recent Imaginations"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-stretch w-full">
        {Imaginations.map((Imagination: any) => (
          <ImaginationCard key={Imagination.id} id={Imagination.id} />
        ))}
        {/* {Imaginations.map((Imagination: ImaginationType) => (
          <ImaginationCard key={Imagination.id} id={Imagination.id} />
        ))} */}
      </div>
    </div>
  )
}
