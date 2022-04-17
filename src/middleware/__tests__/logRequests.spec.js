import logRequests from "../logRequests";

describe("logRequests middleware", () => {
  it("should call a logger", () => {
    const nextSpy = jest.fn();
    const logSpy = { info: jest.fn() };
    const mw = logRequests(logSpy);

    mw({}, {}, nextSpy);
    expect(mw).toHaveLength(3);
    expect(nextSpy).toHaveBeenCalled();
    expect(logSpy.info).toHaveBeenCalled();
  });
});
