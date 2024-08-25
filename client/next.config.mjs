/** @type {import('next').NextConfig} */
export default {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
    ],
    unoptimized: true,
  },
};
