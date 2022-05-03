import Left from './left';
import Right from './right';

export type Either<L, A> = Left<L, A> | Right<L, A>;

export const left = <L, A>(l: L): Either<L, A> => new Left<L, A>(l);

export const right = <L, A>(a: A): Either<L, A> => new Right<L, A>(a);