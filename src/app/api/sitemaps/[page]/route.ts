import { Prisma } from "@prisma/client";
import { PROD_URL, SITEMAP_PAGE_SIZE } from "@/lib/constants";
import { getimaginations } from "@/server/get-imaginations";
import { z } from "zod";

const sitemapContextSchema = z.object({
 params: z.object({
    page: z.number(),
 }),
});

type SitemapContextProps = z.infer<typeof sitemapContextSchema>;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request, { params }: SitemapContextProps) {
 const page = params.page;
 const imaginations = await getimaginations({
    take: SITEMAP_PAGE_SIZE,
    skip: page * SITEMAP_PAGE_SIZE,
    orderBy: { createdAt: 'asc' },
 });

 const xml = `<?xml version="1.0" encoding="UTF-8"?>
 <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${imaginations
      .map(
        (imagination: any) => `
      <url>
        <loc>${PROD_URL}/p/${imagination.id}</loc>
        <lastmod>${imagination.updatedAt.toISOString()}</lastmod>
      </url>
    `
      )
      .join("\n")}
 </urlset>`;

 return new Response(xml, {
    status: 200,
    headers: {
      // Cache for 1 day w/ swr
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
 });
}
