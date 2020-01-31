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

### 枚举类型

```
// 它的值是数字序号，从0开始
enum DaysOfTheWeek {
  SUN, MON, TUE, WEN, THU, FRI, SAT
}
let day: DaysOfTheWeek = DaysOfTheWeek.MON
if (day ===  1) { //可读性差

}
if (day === DaysOfTheWeek.MON) { // 可读性好
  
}

enum HttpStatus {
  OK = 200,
  NOT_FOUNT = 404
}
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

  constructor(name: string, empCode: number) {
    // super调用父类的构造方法
    super(name); 
    this.empCode = empCode;
  }

  greet(name: string): any {
    console.log('hello, ' + name);
  }
}
```

### public, private, protected

`public` 公有属性和公有方法都可以当前类和通过当前类实例化后的对象中调用，默认就是public。在子类和通过子类实例化后的对象中都可以使用。  
`private` 私有属性和私有方法，只能在当前类中的内部使用，实例化后的对象不能访问，子类中也无法访问。子类可继承私有方法和属性 
`protected` 受保护的属性和受保护的方法，在当前类的内部可访问，在子类中也可以访问。


```
class Animal{
   public size:string = "small"  
   protected name:string
   private fierce:number
   protected constructor(animalName:string,fierce = 0){
        this.name = animalName
   }
   setSize(animalSize:string){
        this.size = animalSize
   }
   setName(animalName:string):void{
        this.name = animalName
   }
   getFierce():number{
        return this.fierce
   }
}


class Cat extends Animal{
    constructor(catName:string){
        super(catName)
    }
    getAnimalSize():string{
         return this.size
         // public 在子类里可以直接取到
    }
    getAnimalName():string{
        return this.name  
        // 这样可以取到name，因为name是protected，可以在子类里访问
    }


     //     getAnimalFierce():number{
     //          return this.fierce
     //     }


    // this.fierce这样取不到fierce，因为fierce是private私有的，只能在声明它的类里访问，只能在Animal类里访问
    // Property 'fierce' is private and only accessible within class 'Animal'
}


let cat = new Cat("Cat")

// let animal = new Animal("Dog")
// 构造函数前加protected，就不能实例化了
// Constructor of class 'Animal' is protected and only accessible within the class declaration.

// console.log("这个动物是： " + cat.name)
// animal.name 这样取不到name，因为name是protected，但是可以在子类里访问
//  Property 'name' is protected and only accessible within class 'Animal' and its subclasses.

console.log("这个动物是： " + cat.getAnimalName())
console.log("小猫的大小是： " +cat.size)   // 可以直接.size取，因为size是public
```

### 构造方法

如果申明为`protected`或`private`，当前类不能new  
当父类申明为`protected`，子类重写`constructor`方法后可以new， (子类可以new)  
当父类申明为`private`，子类不能new和extends

使用：  
1. 父类不想被实例化，而只让子类实例化，`constructor`可以申明为`protected`
2. 都不想让子类或父类实例化或继承，`constructor`可以申明为`private`  
3. 一般情况下， `constructor`可以申明为`public`或不写


### 静态属性和静态方法


```
// 静态
class StaticCls {
    // 静态属性
    static userName:string = 'static name';
    // 静态方法
    static work():void{
        console.log(`${StaticCls.userName}在工作`);
    }
}
```

### readonly 只读属性

```
class Person {
  readonly name:string = 'test';
}
```


## 接口

### 定义

```
interface Person {
  // 属性
  name: string; 
  age?: number; // age? 表示age为可选属性
  readonly height: number // readonly 表示只读属性

  // 方法
  greet(): void;
  fight?(): void; //fight?表示为可选方法 

}


// 传进来的person参数必须包含接口定义的属性和方法
function print(o: Person) {
  o.print()
}

const person = {
  name: '张三‘,
  greet: ()=>{
    console.log(this.name)
  }
}

print(person)
```

### 类型别名 - type alias

```
let myName:string = 'gq';
```

使用type关键字定义类型别名
```
type Name = string; // 后面就可以用 Name 来代替 string 类型
let myName:Name = 'gq';
```

```
type User1 = {
  name: string;
  age: number;
}

const user1: User1 = {
  name: '张三',
  age: 10
}

interface User2 {
  age: string,
  age: number
}

const user2: User2 = {
  name: '李四',
  age: 11
}

const user3: { name: string, age: number } = {
  name: '王五'
  age: 12
}

```



### 类 实现 接口
```
interface Person {
  name: string; 
  greet(): void;
}

class Employee implements Person {
  public name: string;
  greet(): void {
    console.log('I am emplyee');
  }
}

```

### 匿名函数

```
interface PrintCallback {
  // 匿名函数
  (success: boolean): void
}

let printCallback: PrintCallback;
printCallback = (suc: boolean): void =>{
}

``` 


### 类型断言
在typescript中，类型断言是告诉编译器 变量是哪个类型，只在编译器中发挥作用

```
// x可以是任意类型，编译器不能明确知道 x 是哪种类型
let x: any = "hi, jack";
// <string> 表示把 x 断言成字符串类型，就是告诉编译器要把 x 当成字符串， 这样就可以调用 substring函数，因为字符串才有这个函数
let s = (<string>x).substring(0, 3)
let n = (<number>x);
console.log(typeof n); // string， 类型断言不做类型转换，只给编译器使用
```

```
// 由于number没有length属性，编译器编译时会报错，Property 'length' does not exist on type 'number'
function getLength(something: string | number): number {
  return something.length; 
}

// 下面的写法编译器在编译时还是会报错
function getLength(something: string | number): number {
  if (somthing.length) {
    return something.length;
  } else {
    return something.toString().length;
  }
}

// 使用类型断言解决报错
function getLength(something: string | number): number {
  if ((<string>somthing).length) {
    return (<string>somthing).length;
  } else {
    return something.toString().length;
  }
}·
```

### 断言与接口结合使用
```
let person = {} 
// 此处编译器会报错，不能动态添加属性。因为typescript为了更好的明确类型和类型里的结构
person.name = "gq";
person.age = 30;
```

解决方案一：
```
interface Person {
  name: string;
  age: number;
}

// 使用as进行类型断言
let person = {} as Person; // 把空对象断言成 Person 类型
person.name = "gq";
person.age = 30;
```

解决方案二：
```
interface Person {
  name: string;
  age: number;
}

let person = <Person>{
  name: 'gq',
  age: 30
}
```

### 接口继承接口

```
interface Person {
  name: string
}

interface Programmer extends Person {
  age: num
}

let p: Programmer = {
  name: 'gq',
  age: 30
}
```

一个类不能继承多个类，也就说不能有多个父类  
但一个类可以实现多个接口

```
interface Person {
  name: string
}

interface Employee {
  age: number
}

class P implements Person, Employee {
  name: string;
  age: number;
}
```

### 接口 继承 类
```
class Component {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  display(): void {
    console.log('width', this.width);
    console.log('height', this.height);
  }
}

interface Widget extends Component {
  hide(): void
}

class Button extends Component implements Widget {
  hide(): void {
    console.log('hiding');
  }
}

let w:Widget = new Button(1, 2);
w.display();
w.hide();
```

### 索引类型 Indexable Types

索引为string类型
```
interface States {
  [state: string]: boolean
}
let s: States = { 'enabled': true, 'disabled': false}
console.log(s['enabled']);
```

索引为number类型
```
interface Numbers {
  [index: number]: number
}

let s: Numbers = [10, 20, 30]; // 用接口定义出来的s无push length join 等属性或方法
console.log(s[0]); // 10
// console.log(s.length); //报错，Property 'length' does not exist on type 'Numbers'

let s2: number[] = [10, 20, 30];
console.log(s2.length); // 3
```

```
interface NestedCss {
  color?: string;
  nest?: {
    [selector: string]: NestedCss
  }
}

let example: NestedCss = {
  color: "red",
  nest: {
    ".subclass": {
      color: "blue",
    }
  }
}
```


