# Typescript Note

## 基础

### array类型

方式一:

```
let arr = Array<boolean> = [true, false, false]
```

方式二：

```
let arr: number[] = [1, 2, 3]
```

### 元祖 tuple

跟数组差不多，但是里面的元素可以是多个类型，编译出来的Javascript也是数组元素的个数是固定的，顺序不能变

```
let tuple: [string, number] = ['test', 111]
```


### 函数

#### 参数类型

指定参数a和b为number类型，返回值的类型也为number类型
```
function add(a: number, b: number): number {
  return a + b;
}
```

箭头函数写法
```
const add = (a: number, b: number): number => {
  return a + b;
}
```

#### 返回值

使用void，函数没有返回值
```
const add = (a: number, b: number): void => {
  // 函数体中没有return
}
```


#### 默认参数

函数参数使用默认值
```
// 参数b的默认值为10
const add = (a: number, b: number = 10): number => {
  return a + b;
}
add(10); // 返回20
```

默认参数可以不指定类型，会自动判断和计算
```
//指定参数b的默认值为10，则b的类型为number类型
const add = (a: number, b= 10): number => {
  return a + b;
}
add(10, 'a string'); // 报错
```

#### 可选参数

在参数后面加上一个`?`，表示该参数是可选参数
```
const add = (a:number, b?: number): number => {
  return a + b;
}
```

#### 不确定参数 Rest Parameters

```
const add = (a: number, ...nums: number[]): number => {
  const b = nums.reduce(function(total, value) {
    return total + value;
  }, 0)
  return a + b;
}
add(1, 1, 2, 3, 4);  // 11 
```

### 任意类型 any

慎用any类型，可能会自己判断类型
```
let a:any:
```


### null、undefined

```
let u: undefined = undefined;
let n: null = null;
```

### 联合类型 union type

```
function isNumber(value: any): value is number {
  return typeof value === 'number'
}

function isString(value: any): value is string {
  return typeof value === 'string'
}

// value的类型为联合类型
const log = (value: string | number) => {
  if (isNumber(value)) {
    return `your number is ${value}`
  }

  if (isString(value)) {
    return `your name is ${value}`
  }

  throw new Error(`Expected string or number, got ${value}.`)
}

log(1); // your number is 1
log('egg') // you name is egg
```




## 类

### 继承与多态

```
class Persion {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greet() {
    console.log('hi, ' + this.firstName + this.lastName );
  }
}

// 子类继承了父类的数据和行为，就是属性和方法
class Programmer extends Persion {
  coding() {

  }
}

let programmer: Programmer = new Programmer()
programmer.greet();
``` 


### 抽象类、抽象方法

**抽象类**: `abstract` 修饰， 里面可以没有抽象方法。但有抽象方法(abstract method)的类必须声明为抽象类(abstract class)

抽象类不能实例化

> 抽象属性用的很少

```
abstract class Person{
  public name: string;
  constructor(name: string){
      this.name = name;
  }

  //抽象方法 ，没有方法体，继承的子类中必须实现此方法
  abstract greet(name: string):any;

  // 非抽象方法，无需要求子类实现、重写
  display(){
  }
}

class Emplayee extends Person {
  empCode: number;

  constructor(name: string, empCode: number){
    super(name); // 必须调用 super
    this.empCode = empCode;
  }

  greet(name: string): any {
    console.log('hello, ' + name);
  }
}
```

### public, private, protected

`public` 公有属性和公有方法都可以当前类和通过当前类实例化后的对象中调用，默认就是public。在继承的类和通过继承类实例化后的对象中都可以使用。  ··
`private` 私有属性和私有方法，只能在当前类中使用。  
`protected` 受保护的属性和受保护的方法  

