import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the temporary Cloudflare tunnel origin to request dev-only assets/HMR.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
