import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/s-projects", destination: "/projects", permanent: true },
      { source: "/team-4", destination: "/team", permanent: true },
    ];
  },
};

export default nextConfig;
