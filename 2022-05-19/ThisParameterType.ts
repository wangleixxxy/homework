/**
 * 14. 实现ThisParameterType<T>
 * 对于function type T，ThisParameterType<T>返回this type。 如果没有指定，则使用unknown。
 */

function Foo(this: { a: string }) {}
function Bar() {}

type MyThisParameterType<T extends (args: any[]) => any> = T extends (
  this: infer U,
  ...args: any[]
) => any
  ? U
  : unknown;

type A = MyThisParameterType<typeof Foo>; // {a: string}
type B = MyThisParameterType<typeof Bar>; // unknown
