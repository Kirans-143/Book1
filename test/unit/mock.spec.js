const printNum = (print) => {
  for (let i = 0; i < 5; i++) {}
  const result = print();
  return result.pass - result.fail;
};

describe("Mock test", () => {
  // if we mock a fun then we should mocking return values
  const result = {
    pass: 20,
    fail: 2,
  };
  let print = jest.fn().mockReturnValue(result);
  it("mock fun", () => {
    expect(printNum(print)).toBe(18);
  });
});
