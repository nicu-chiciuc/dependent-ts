export const expectType = <TExpected>() =>
<TActual>(
  value: TActual,
  input: TExpected extends TActual //
    ? TActual extends TExpected ? true
    : never
    : never,
) => {}
