/**
 * 正如String.prototype.trim()，请实现Trim<T>。
 */

type Space = ' ' | '\t' | '\n';
type TrimLeft<S> = S extends `${Space}${infer W}` ? TrimLeft<W> : S;
type TrimRight<S> = S extends `${infer W}${Space}` ? TrimRight<W> : S;

type Trim<S extends string> = TrimLeft<TrimRight<S>>;

type A = Trim<'    BFE.dev'>; // 'BFE'
type B = Trim<' BFE. dev  '>; // 'BFE. dev'
type C = Trim<'  BFE .   dev  '>; // 'BFE .   dev'
