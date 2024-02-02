import { ImaginationCard } from "@/app/_components/Imagination-card"
import { PageContent } from "@/app/_components/page-content"
import { formatPrompt } from "@/lib/utils"
import { getImagination } from "@/server/get-Imagination"
import { ImaginationContextProps } from "@/server/utils"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export async function generateMetadata({ params }: ImaginationContextProps): Promise<Metadata | undefined> {
  const data = await getImagination(params.id)
  if (!data) return

  const title = `${formatPrompt(data.prompt)} | AI Imagination Generator`
  const description = `An Imagination generated from the prompt: ${data.prompt}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@pondorasti",
    },
  }
}

export default async function Imagination({ params }: ImaginationContextProps) {
  const data = await getImagination(params.id)
  if (!data) redirect("/")

  return (
    <PageContent prompt={data.prompt}>
      <ImaginationCard id={params.id} alwaysShowDownloadBtn />
    </PageContent>
  )
}
