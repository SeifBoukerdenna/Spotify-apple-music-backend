// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fs = jest.createMockFromModule("fs") as any;

fs.readFileSync = jest.fn(() => {
  // Return a mock private key
  return "mock-private-key";
});

module.exports = fs;
