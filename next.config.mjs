import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  serverExternalPackages: [
    '@aws-sdk/client-s3', 
    '@aws-sdk/s3-request-presigner', 
    'libsql',
    'react-server-dom-webpack/client',
    'react-server-dom-webpack/server',
    'react-server-dom-webpack/server.node',
    'react-server-dom-webpack/static',
    'react-server-dom-turbopack/client',
    'react-server-dom-turbopack/server',
    'react-server-dom-turbopack/static',
    'critters',
    '@opentelemetry/api',
  ],
  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Handle AWS SDK and other problematic packages
    if (isServer) {
      webpackConfig.externals.push({
        '@aws-sdk/client-s3': 'commonjs @aws-sdk/client-s3',
        '@aws-sdk/s3-request-presigner': 'commonjs @aws-sdk/s3-request-presigner',
        '@smithy/middleware-retry': 'commonjs @smithy/middleware-retry',
        '@smithy/smithy-client': 'commonjs @smithy/smithy-client',
        '@smithy/types': 'commonjs @smithy/types',
        'libsql': 'commonjs libsql',
        'react-server-dom-webpack/client': 'commonjs react-server-dom-webpack/client',
        'react-server-dom-webpack/server': 'commonjs react-server-dom-webpack/server',
        'react-server-dom-webpack/server.node': 'commonjs react-server-dom-webpack/server.node',
        'react-server-dom-webpack/static': 'commonjs react-server-dom-webpack/static',
        'react-server-dom-turbopack/client': 'commonjs react-server-dom-turbopack/client',
        'react-server-dom-turbopack/server': 'commonjs react-server-dom-turbopack/server',
        'react-server-dom-turbopack/static': 'commonjs react-server-dom-turbopack/static',
        'critters': 'commonjs critters',
        '@opentelemetry/api': 'commonjs @opentelemetry/api',
      })
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
