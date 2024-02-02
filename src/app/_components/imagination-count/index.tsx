import { getimaginationsCount } from "@/server/get-imaginations-count"
import { Suspense } from "react"

interface CountDisplayProps {
  count?: number
}

function CountDisplay({ count }: CountDisplayProps) {
  return (
    <p className="text-gray-500 mb-12 text-base animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
      {count || "–––"} web apps created and counting!
    </p>
  )
}

async function AsyncimaginationCount() {
  const count = await getimaginationsCount()

  return <CountDisplay count={count} />
}

export function imaginationCount() {
  return (
    <Suspense fallback={<CountDisplay />}>
      <AsyncimaginationCount />
    </Suspense>
  )
}
