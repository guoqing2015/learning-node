# Typescript介绍、安装及开发工具

## Typescript安装、编译

安装：  
`npm install -g typescript`

编译：  
`tsc helloworld.ts`


利用`tsconfig.json`进行编译：



```
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": false,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "lib": ["es2017"],
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es6",
    "sourceMap": true,
    "allowJs": true,
    "outDir": "./dist"
  },
    "include": [
    "src/**/*"
  ],
    "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```