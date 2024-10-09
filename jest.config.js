module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+.vue$": "vue-jest",
    "^.+.js$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mappage de l'alias @ vers le dossier src
    ".(css|less|sass|scss)$": "identity-obj-proxy",
    ".(jpg|jpeg|png|gif|svg)$": "<rootDir>/tests/unit/mocks/fileMock.js",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
