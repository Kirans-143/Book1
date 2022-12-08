const promiseFunc = () => {
  return new Promise((resolve, reject) => {
    resolve("I am a promise");
    reject("I am a promise");
  });
};

xdescribe("Async function", () => {
  xit("Test your promise", () => {
    promiseFunc()
      .then((data) => {
        expect(data).toBe("I am a promise");
      })
      .catch((err) => {
        expect(err).toBe("I am a promise");
      });
  });
  it("Test await", async () => {
    await promiseFunc()
      .then((result) => {
        expect(result).toBe("I am a promise");
      })
      .catch((err) => {
        expect(err).toBe("I am a promise");
      });
  });
});
