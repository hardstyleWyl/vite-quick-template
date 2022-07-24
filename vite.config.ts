import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import viteCompression from 'vite-plugin-compression'

//兼容IE和老版本谷歌
//npm i @vitejs/plugin-legacy -D
// import legacyPlugin from '@vitejs/plugin-legacy'
// //在plugins配置数组里添加legacy插件
// plugins: [legacyPlugin({
//     targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
//     additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
// })],


export default defineConfig({
    plugins: [ vue(),
        //配置按需引入组件开始
        AutoImport({//这里
            resolvers: [ ElementPlusResolver() ]
        }),
        Components({//这里
            resolvers: [ ElementPlusResolver() ]
        }),
        //配置按需引入组件结束
        //配置静态资源压缩开始
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        })
        //配置静态资源压缩结束
    ],
    build: {
        //配置静态文件打包开始
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                //配置超大静态文件拆分开始
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                }
                //配置超大静态文件拆分结束
            }
        },
        //配置静态文件打包结束
        chunkSizeWarningLimit: 1500, //静态资源警告门槛1500k
        //清除console和debugger开始
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
        //清除console和debugger结束
    },
    resolve: {
        //设置路径别名
        alias: {
            '@': `${ __dirname }/src`
        }
    }
})
