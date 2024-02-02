import { OpenGraphImage } from "@/app/_components/opengraph-image"
import { DEFAULT_OG_IMAGE } from "@/lib/constants"
import { getimagination } from "@/server/get-imagination"
import { imaginationContextProps } from "@/server/utils"

export { contentType, size } from "@/app/_components/favicon"

export default async function Image({ params }: imaginationContextProps) {
  const data = await getimagination(params.id)
  if (!data) return

  const image = data.noBackgroundUrl || data.originalUrl || DEFAULT_OG_IMAGE
  return OpenGraphImage({ url: image })
}
