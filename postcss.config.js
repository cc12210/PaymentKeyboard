export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16, // 基准大小，可以根据设计稿的宽度调整，例如设计稿宽度为750px，则1rem = 75px，则rootValue为75/16=4.6875。具体数值取决于你的设计需求。
      propList: ["*"], // 可以选择需要转换的属性，'*'表示全部属性都会被转换。也可以设置为['font', 'font-size', 'width', 'height']等。
      selectorBlackList: [], // 需要忽略转换的CSS选择器，如['html']等。例如，如果你的设计稿是基于16px的，那么你可以选择忽略html元素的转换。
    },
  },
};
