import { formatPrompt } from "@/lib/utils"
import { getImagination } from "@/server/get-Imagination"
import { ButtonCard } from "./button-card"

interface ImaginationCardProps {
  id: string
  alwaysShowDownloadBtn?: boolean
}

export async function ImaginationCard({ id, alwaysShowDownloadBtn }: ImaginationCardProps) {
  const data = await getImagination(id)
  if (!data) return null

  return (
    <ButtonCard
      id={id}
      name={formatPrompt(data.prompt)}
      src={data.noBackgroundUrl}
      createdAt={data.createdAt}
      alwaysShowDownloadBtn={alwaysShowDownloadBtn}
    />
  )
}
