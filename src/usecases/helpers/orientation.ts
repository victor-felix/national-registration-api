interface Orientation<L, A> {
  isLeft(): this is Orientation<L, A>;
  isRight(): this is Orientation<L, A>;
}

export default Orientation;