module.exports = {
    "extends": "airbnb-base",
    "env": {
      "browser": true,
      "es6": true,
      "jquery": true,
      "node": true,
      "mocha": true
    },
    "rules": {
      "one-var": 0,
      "one-var-declaration-per-line": 0,
      "new-cap": 0,
      "consistent-return": 0,
      "no-param-reassign": 0,
      "comma-dangle": 0,
      "curly": ["error", "multi-line"],
      "import/no-unresolved": [2, {
        "commonjs": true
      }],
      "no-shadow": ["error", {
        "allow": ["req", "res", "err"]
      }],
      "valid-jsdoc": ["error", {
        "requireReturn": true,
        "requireReturnType": true,
        "requireParamDescription": false,
        "requireReturnDescription": true
      }],
      "require-jsdoc": ["error", {
        "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": true,
          "ClassDeclaration": true
        }
      }],
      "max-len": ["error", { "code": 80 }],
      "linebreak-style": [
        "error",
        "windows"
      ]
    }
};
