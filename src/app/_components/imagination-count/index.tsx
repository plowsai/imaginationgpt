import { getImaginationsCount } from "@/server/get-Imaginations-count"
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

async function AsyncImaginationCount() {
  const count = await getImaginationsCount()

  return <CountDisplay count={count} />
}

export function ImaginationCount() {
  return (
    <Suspense fallback={<CountDisplay />}>
      <AsyncImaginationCount />
    </Suspense>
  )
}
