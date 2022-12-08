const Math = require("../../myApp/Math");

xdescribe("My Calculator method", () => {
  let totalSum = 0;
  beforeEach(() => {
    totalSum = 0;
  });

  beforeAll(() => {
    console.log("Before All test printing");
  });

  afterEach(() => {
    console.log("After Each test printing");
  });

  afterAll(() => {
    console.log("After All test printing");
  });

  test("Add method", () => {
    expect(Math.sum(1, 2)).toBe(3);
    expect(Math.sum(8, 6)).toBe(14);
    expect(Math.sum(8, -6)).toBe(2);
    expect(Math.sum()).toBe("Please entry numbers");
    expect(Math.sum("a", "b")).toBe("Please entry numbers");
  });

  test("Square method", () => {
    expect(Math.square(2)).toBe(4);
    expect(Math.square(0)).toBe(0);
    expect(Math.square(-5)).toBe(25);
    expect(Math.square()).toBe("Please entry number");
    expect(Math.square(Infinity)).toBe(Infinity);
    expect(Math.square(2, 4)).toBe(4);
  });

  test("Total sum test", () => {
    const total = Math.sum(2, 3);
    totalSum += total;
    expect(totalSum).toBe(5);
  });

  test("Total sum test", () => {
    const total = Math.sum(7, 3);
    totalSum += total;
    expect(totalSum).toBe(10);
  });
});
