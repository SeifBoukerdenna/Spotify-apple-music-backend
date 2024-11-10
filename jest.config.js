// jest.config.js or jest.config.mjs

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^\\$/(.*)$': '<rootDir>/$1',
    },
};
