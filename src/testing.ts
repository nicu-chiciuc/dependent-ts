/**
  Can be used just for testing. Doesn't do anything at runtime.
 */
export const expectType = <TExpected>() =>
<TActual>(
  _value: TActual,
  _input: TExpected extends TActual ? (TActual extends TExpected ? true : never) : never,
) => {}
