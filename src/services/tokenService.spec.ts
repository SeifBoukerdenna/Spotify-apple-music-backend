import fs from "fs";
import jwt from "jsonwebtoken";
import { generateDeveloperToken } from "./tokenService";

jest.mock("fs");
jest.mock("jsonwebtoken");

describe("generateDeveloperToken", () => {
  // Declare a variable to hold the spy
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    // Spy on console.error and mock its implementation
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error to its original implementation after each test
    consoleErrorSpy.mockRestore();
  });

  it("should generate a token successfully", () => {
    // Arrange
    const mockPrivateKey = "mock-private-key";
    const mockToken = "mock-token";

    (fs.readFileSync as jest.Mock).mockReturnValue(mockPrivateKey);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    // Act
    const token = generateDeveloperToken();

    // Assert
    expect(token).toBe(mockToken);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should throw an error if private key file is not found", () => {
    // Arrange
    const mockError = new Error("File not found");
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    // Act & Assert
    expect(() => generateDeveloperToken()).toThrow(
      "Private key file not found"
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to read private key file:",
      mockError
    );
  });

  it("should throw an error if token generation fails", () => {
    // Arrange
    const mockPrivateKey = "mock-private-key";
    const mockError = new Error("Token generation error");

    (fs.readFileSync as jest.Mock).mockReturnValue(mockPrivateKey);
    (jwt.sign as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    // Act & Assert
    expect(() => generateDeveloperToken()).toThrow("Token generation failed");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Token generation error:",
      mockError
    );
  });
});
