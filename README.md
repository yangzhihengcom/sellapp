# sell

> sellapp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# sellapp 遇到的问题
```
本机环境：win10专业版 版本1709 64位
软件环境：vscode和vue全家桶
```

1.在同一个局域网的情况下，手机不能访问主机的ip地址，不能进行手机测试。
原因1：发现是因为win10防火墙有个公用网络安全给开启了，公用网络是指机场或者咖啡店之类的公共场所，因为笔者家里用的是wifi被win10认为是公用网络，所以默认开启。
解决办法：建议在开发的时候关闭防火墙，开发完后再开启

原因2：发现访问自己电脑的ip地址加端口号并不能直接访问到sellapp。
解决办法：把config文件夹下的index.js的host改成本机的ip地址或者0.0.0.0




