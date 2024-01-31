import { OpenGraphImage } from "@/app/_components/opengraph-image"
import { DEFAULT_OG_IMAGE } from "@/lib/constants"
import { getImagination } from "@/server/get-Imagination"
import { ImaginationContextProps } from "@/server/utils"

export { contentType, size } from "@/app/_components/favicon"

export default async function Image({ params }: ImaginationContextProps) {
  const data = await getImagination(params.id)
  if (!data) return

  const image = data.noBackgroundUrl || data.originalUrl || DEFAULT_OG_IMAGE
  return OpenGraphImage({ url: image })
}
