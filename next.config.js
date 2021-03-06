module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
    MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,
    FRONT_URL: process.env.FRONT_URL,
  },
  /* config options here */
  webpack(config, { isServer, dev: isDevelopmentMode }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [
        {
          loader: "@svgr/webpack",
          // https://react-svgr.com/docs/options/
        },
      ],
    });

    config.module.rules.push({
      test: /\.po$/,
      use: [
        {
          loader: "ignore-loader",
        },
      ],
    });

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
        child_process: "empty",
        net: "empty",
        dns: "empty",
        tls: "empty",
      };
    }

    // Attempt to ignore storybook files when doing a production build,
    // see also: https://github.com/vercel/next.js/issues/1914
    if (!isDevelopmentMode) {
      config.module.rules.push({
        test: /\.stories.(js|tsx?)/,
        loader: "ignore-loader",
      });
    }

    return config;
  },
  poweredByHeader: false,
  images: {
    domains: ["unsplash.com"],
  },
};
