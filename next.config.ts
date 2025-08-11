import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";
import { withSentryConfig } from "@sentry/nextjs";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: RuleSetRule) => {
      if (rule && typeof rule === "object" && rule.test) {
        if (rule.test instanceof RegExp) {
          return rule.test.test(".svg");
        }
      }
    });

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,

        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  org: "emc-je",
  project: "axies-nextjs",
  silent: !process.env.CI,
  disableLogger: true,
});
