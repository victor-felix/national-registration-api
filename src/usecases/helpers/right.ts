import Orientation from './orientation';

export default class Right<L, A> implements Orientation<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }
}