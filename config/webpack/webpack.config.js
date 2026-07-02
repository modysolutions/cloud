// eslint-disable-next-line no-restricted-syntax
const path = require('path');

// eslint-disable-next-line no-restricted-syntax
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

// eslint-disable-next-line no-restricted-syntax
const defaults = require('@wordpress/scripts/config/webpack.config.js');

// Patch inherited rules to use the modern Dart Sass API, suppressing the
// legacy JS API deprecation warning introduced in sass-loader@12 / Dart Sass 1.x.
const patchedRules = defaults.module.rules.map((rule) => {
    if (!Array.isArray(rule.use)) {
        return rule;
    }
    return {
        ...rule,
        use: rule.use.map((use) => {
            if (use.loader && use.loader.includes('sass-loader')) {
                return {
                    ...use,
                    options: {
                        ...(use.options || {}),
                        api: 'modern',
                    },
                };
            }
            return use;
        }),
    };
});

module.exports = {
    ...defaults,
    output: {
        ...defaults.output,
        path: path.resolve(process.cwd(), 'app', 'dist'),
        filename: '[name].js',
    },
    plugins: [
        ...(defaults.plugins || []),
        new StylelintWebpackPlugin({
            extensions: ['scss'],
            files: 'src/**/*.scss',
            fix: false,
            lintDirtyModulesOnly: true, // only lint files that changed
        }),
    ],
    entry: {
        theme:          path.resolve(process.cwd(), 'src', 'theme.js'),
        plugins:        path.resolve(process.cwd(), 'src', 'plugins.js'),
        mody:           path.resolve(process.cwd(), 'src', 'plugins', 'mody', 'index.js'),
        'mody-frontend': path.resolve(process.cwd(), 'src', 'plugins', 'mody', 'frontend.js'),
    },
    module: {
        ...defaults.module,
        rules: [
            ...patchedRules,
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
        ],
    },
};
