// import { uglify } from "rollup-plugin-uglify";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import styleInject from "style-inject";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import replace from '@rollup/plugin-replace';
//允许 项目文件 从 JSON 文件中导入数据
import json from "@rollup/plugin-json";
//打包时删除之前的dist多余文件
import clear from "rollup-plugin-clear";
//启动静态资源服务
import serve from "rollup-plugin-serve";
//热更新,自动刷新浏览器
import livereload from 'rollup-plugin-livereload';
import packageInfo from '../package.json';
import {
    terser
} from "rollup-plugin-terser";
import alias from '@rollup/plugin-alias';
// const Global = `var process = {
//   env: {
//     NODE_ENV: 'production'
//   }
// };`

const production = process.env.NODE_ENV === 'production';
const development = process.env.NODE_ENV === 'development';
// console.log(process.env.NODE_ENV)
const {
    version
} = packageInfo;
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const plugins = [
    terser(),
    json(),
    production &&
    clear({
        targets: ["dist"]
    }),
    // production && uglify(),
    development && livereload('example/dist/'),
    resolve({
        mainFields: ['module', 'main', 'jsnext:main', 'browser'],
        extensions,
    }),
    replace({
        preventAssignment: true,
        values: {
            'process.env.NODE_ENV': JSON.stringify('development'),
        }
    }),
    commonjs(
        /*  {
             namedExports: {
                 'node_modules/react/index.js': ['createElement'],
                 'node_modules/react-dom/index.js': ['render']
             }
         } */
    ),
    alias({
        entries: [{
                find: 'react',
                replacement: 'preact/compat'
            },
            {
                find: 'react-dom',
                replacement: 'preact/compat'
            }
        ]
    }),
    babel({
        babelrc: false,
        extensions,
        babelHelpers: 'bundled',
        exclude: './node_modules/**',
        presets: [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "usage",
                    "corejs": {
                        "version": 3,
                        "proposals": false
                    }
                }
            ],
            "@babel/preset-react",
            "@babel/preset-typescript"
        ]
    }),
    postcss({
        extensions: ["css", "scss"],
        plugins: [
            autoprefixer()
        ],
        minimize: true,
        extract: false,
        inject: function (cssVar, filePath) {
            return `styleInject(${ cssVar }, {id: "${ ['reaction', version].join("-") }"});`
        },
        use: ["sass"]
    }),
    development && serve({
        open: true,
        contentBase: "example",
        host: "127.0.0.1",
        hot: true,
        port: 8888,
        historyApiFallback: true
    }),

]
export default [
    //PC列表页面
    {
        // external: ['react', 'react-dom'],
        input: './src/views/listPage.tsx',
        output: {
            dir: production ? 'dist' : 'example/dist',
            format: 'iife',
            entryFileNames: 'listPage.js',
            intro: styleInject.toString(),
            globals: {
                "@future/art-dialog": "artDialog",
                'react': 'React',
                'react-dom': 'ReactDOM',
            },
            // banner: Global
        },
        plugins
    },
    //弹窗组件
    {
        // external: ['react', 'react-dom'],
        input: './src/views/reactionDialog.tsx',
        output: {
            dir: production ? 'dist' : 'example/dist',
            format: 'umd',
            name: 'reactionDialog',
            entryFileNames: 'reactionDialog.js',
            intro: styleInject.toString(),
            globals: {
                "@future/art-dialog": "artDialog",
                'react': 'React',
                'react-dom': 'ReactDOM',
            },
            // banner: Global
        },
        plugins
    }
];