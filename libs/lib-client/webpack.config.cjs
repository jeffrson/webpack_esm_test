const path = require('path')

/** Das muss im mono-rep und ausserhalb passen. */
const nodeRoot = path.dirname(path.dirname(require.resolve('webpack-node-externals')))
const roots = { react: 'React', 'react-dom': 'ReactDOM' }

module.exports = (env) => {
    const config = {
        devtool: 'source-map',
        entry: { index: path.join(__dirname, './src/index.ts') },
        externals: [
            require('webpack-node-externals')({
                additionalModuleDirs: [nodeRoot],
                importType(request) {
                    const root = roots[request]
                    return root ? { amd: request, commonjs: request, commonjs2: request, root } : request
                },
            }),
        ],
        mode: env.production ? 'production' : 'development',
        module: {
            rules: [
                { test: /\.(ts|tsx)$/, use: 'ts-loader' },
            ],
        },
        optimization: { moduleIds: 'natural' },
        output: {
            filename: '[name].js',
            library: '@internal/lib-client',
            libraryTarget: 'umd',
            path: path.join(__dirname, 'dist'),
            clean: true,
        },
        performance: { maxAssetSize: 4000000, maxEntrypointSize: 4000000 },
        resolve: {
            extensions: ['.ts', '.tsx', '.scss', '.js', '.css'],
            extensionAlias: {
                '.js': ['.ts', '.tsx', '.js']
            }
        },
    }
    return config
}
