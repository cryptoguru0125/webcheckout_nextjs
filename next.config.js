module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // redirects: async function() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/bloom',
  //       permanent: true,
  //     },
  //   ]
  // },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'babel-loader',
        {
          loader: 'react-svg-loader',
          options: {
            svgo: {
              plugins: [{ removeTitle: false }],
              floatPrecision: 2,
            },
          },
        },
      ],
    })

    return config
  },
}
