import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.livemint.com" },
      { protocol: "https", hostname: "economictimes.indiatimes.com" },
      { protocol: "https", hostname: "www.business-standard.com" },
      { protocol: "https", hostname: "www.financialexpress.com" },
      { protocol: "https", hostname: "www.reutersagency.com" },
      { protocol: "https", hostname: "www.cnbc.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.indiatimes.com" },
      { protocol: "https", hostname: "*.livemint.com" },
      { protocol: "https", hostname: "*.etimg.com" },
      { protocol: "https", hostname: "img.etimg.com" },
      { protocol: "https", hostname: "*.reuters.com" },
      { protocol: "https", hostname: "*.cnbc.com" },
      { protocol: "https", hostname: "*.reutersagency.com" },
      { protocol: "https", hostname: "huggingface.co" },
      { protocol: "https", hostname: "*.technologyreview.com" },
      { protocol: "https", hostname: "*.wired.com" },
      { protocol: "https", hostname: "*.techbuzz.ai" },
      { protocol: "https", hostname: "hnrss.org" },
      { protocol: "https", hostname: "*.strapiapp.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "huggingface.co" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "*.newsbytesapp.com" },
    ],
  },
};

export default nextConfig;
