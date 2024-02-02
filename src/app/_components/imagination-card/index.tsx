import { formatPrompt } from "@/lib/utils"
import { getimagination } from "@/server/get-imagination"
import { ButtonCard } from "./button-card"

interface imaginationCardProps {
  id: string
  alwaysShowDownloadBtn?: boolean
}

export async function imaginationCard({ id, alwaysShowDownloadBtn }: imaginationCardProps) {
  const data = await getimagination(id)
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
