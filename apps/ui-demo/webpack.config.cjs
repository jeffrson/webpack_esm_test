const path = require('path')

const copyStatic = require('copy-webpack-plugin')

const publicFolder = path.join(__dirname, 'public')

const { DefinePlugin } = require('webpack')

module.exports = (env) => ({
    devtool: 'source-map',
    entry: { index: path.join(__dirname, './src/index.tsx') },
    ignoreWarnings: [/Failed to parse source map/],
    mode: env.production ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: require.resolve('ts-loader'),
                    },
                ],
            },
        ],
    },
    optimization: { minimize: false },
    output: { filename: '[name].js', path: path.join(__dirname, 'build'), clean: true },
    performance: { maxAssetSize: 4000000, maxEntrypointSize: 4000000 },
    plugins: [
        new copyStatic({ patterns: [{ from: publicFolder }] }),
        new DefinePlugin({ NEUROOMNET_APP_VERSION: `"${require('./package.json').version}"` }),
    ].filter(Boolean),

    /** Aktuell unterstützte Quelldateiarten. */
    resolve: {
        extensions: ['.ts', '.tsx', '.scss', '.js', '.css', '.svg'],
        extensionAlias: {
            '.js': ['.ts', '.tsx', '.js']
        }
    },
})
