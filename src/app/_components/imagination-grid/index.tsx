import { getimaginations } from "@/server/get-imaginations"
import { imaginationCard } from "../imagination-card"

interface imaginationGridProps {
  prompt?: string
}

interface imaginationType {
  id: string;
}

export async function imaginationGrid({ prompt }: imaginationGridProps) {
  const imaginations = await getimaginations({
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
      <h2 className="font-semibold text-md text-left w-full mb-3">{!!prompt ? "Related imaginations" : "Recent imaginations"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-stretch w-full">
        {imaginations.map((imagination: any) => (
          <imaginationCard key={imagination.id} id={imagination.id} />
        ))}
        {/* {imaginations.map((imagination: imaginationType) => (
          <imaginationCard key={imagination.id} id={imagination.id} />
        ))} */}
      </div>
    </div>
  )
}
