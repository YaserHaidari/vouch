import { Metadata, MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
      const baseUrl = "https://vouch.net.au";
    return {
        rules: [
        {
            url: baseUrl,
            priority: 1,
            changeFrequency: "daily"
        },
        {
            url:   `${baseUrl}/deals`,
            priority: 0.9,
            changeFrequency: "always"
        },
        {
            url: `${baseUrl}/contact`,
            priority: 0.5,
            changeFrequency: "monthly"
        },
        {
            url: `${baseUrl}/community_deals`,
            priority: 0.7,
            changeFrequency: "daily"
        },
        {
            url: `${baseUrl}/privacy_policy`,
            priority: 0.3,
            changeFrequency: "monthly"
        }
    ],
         sitemap: `${baseUrl}/sitemap.xml`
    }
}