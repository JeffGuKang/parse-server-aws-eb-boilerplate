module.exports =  {
  root: true,
  parser:  "@typescript-eslint/parser",  // Specifies the ESLint parser  
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  "module",  // Allows for the use of imports    
    project: 'tsconfig.json',
    tsconfigRootDir: '.',    
    // createDefaultProgram: true,        
  },
  extends:  [
    "plugin:@typescript-eslint/recommended", // uses typescript-specific linting rules
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended", // enables eslint-plugin-prettier and eslint-config-prettier
  ],
  rules:  {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "indent": "off",
    "prefer-const": "warn",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/interface-name-prefix": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    // "@typescript-eslint/member-delimiter-style": {
    //     delimiter: "none",
    //     requireLast: true,
    // },
  },
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  settings: {
    react: {
        version: "detect",
    },
},
  env: {
  }
};
