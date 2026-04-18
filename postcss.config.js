module.exports = {
    plugins: {
        "postcss-pxtorem": {
            rootValue: 16, //default fontsize
            propList: ["*"], //wich values to transform (* - all)
            selectorBlackList: [], // selectors to ignore 
            replace: true, // transform px to rem
            mediaQuery: true, // is media values transforms too
            minPixelValue: 0,
        },
    },
};