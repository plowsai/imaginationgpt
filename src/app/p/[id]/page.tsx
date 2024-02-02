import { imaginationCard } from "@/app/_components/imagination-card"
import { PageContent } from "@/app/_components/page-content"
import { formatPrompt } from "@/lib/utils"
import { getimagination } from "@/server/get-imagination"
import { imaginationContextProps } from "@/server/utils"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export async function generateMetadata({ params }: imaginationContextProps): Promise<Metadata | undefined> {
  const data = await getimagination(params.id)
  if (!data) return

  const title = `${formatPrompt(data.prompt)} | AI imagination Generator`
  const description = `An imagination generated from the prompt: ${data.prompt}`

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

export default async function imagination({ params }: imaginationContextProps) {
  const data = await getimagination(params.id)
  if (!data) redirect("/")

  return (
    <PageContent prompt={data.prompt}>
      <imaginationCard id={params.id} alwaysShowDownloadBtn />
    </PageContent>
  )
}
