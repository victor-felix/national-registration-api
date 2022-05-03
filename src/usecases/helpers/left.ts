import Orientation from './orientation';

export default class Left<L, A> implements Orientation<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }
}