/**
 * 15. 实现OmitThisParameter<T>
 * https://bigfrontend.dev/zh/typescript/OmitThisParameter
 */
/**
 * Function.prototype.bind()返回一个this已经bind过后的function。 对于这种情况，可以用OmitThisParameter<T>来增加type信息。
 * 请自行实现MyOmitThisParameter<T>。
 */

function foo(this: { a: string }) {}
// foo(); // Error

const bar = foo.bind({ a: 'BFE.dev' });
bar(); // OK

type Foo = (this: { a: string }) => boolean;
type Bar = MyOmitThisParameter<Foo>; // () => string

// 实现MyOmitThisParameter<T>
type MyOmitThisParameter<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? (...args: Parameters<T>) => R
  : never;
