module.exports = {
    testEnvironment: "node",
    roots: ["./dist"],
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
      },
};
