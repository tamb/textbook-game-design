import type { NextConfig } from "next";

const rawBasePath = process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = rawBasePath
  ? rawBasePath.startsWith("/")
    ? rawBasePath.replace(/\/+$/, "")
    : `/${rawBasePath.replace(/\/+$/, "")}`
  : undefined;

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || "",
  },
};

export default nextConfig;
