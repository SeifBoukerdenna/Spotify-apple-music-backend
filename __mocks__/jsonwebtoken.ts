// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jwt = jest.createMockFromModule("jsonwebtoken") as any;

jwt.sign = jest.fn(() => {
  // Return a mock token
  return "mock-token";
});

module.exports = jwt;
