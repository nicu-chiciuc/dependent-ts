import { map } from "../src/index";

it("Main test", () => {
  const ret = map([1, 2], (val) => val.toString());

  expect(ret).toStrictEqual(["1", "2"]);
});
