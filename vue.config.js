module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
                @import "@/css/utils/mixins.scss";
                @import "@/css/utils/root.scss";
                `
            },
        }
    },
    devServer: {
        proxy: 'https://www.code-is-fun.ch'
    }
}