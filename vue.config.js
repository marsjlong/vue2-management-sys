module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/yqfk-ucenter':{
                target:'http://192.168.14.30',
                changeOrigin:true,
                /*pathRewrite:{
                    '/api':''
                }*/
            }
        }
    }
}