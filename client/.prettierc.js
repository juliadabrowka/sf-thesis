module.exports = {
  endOfLine: "auto",
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  printWidth: 80,
  semi: true,
  useTabs: false,
  bracketSpacing: false,
  bracketSameLine: false,
  overrides: [
    {
      files: ["*.ts"],
      options: {
        printWidth: 80,
      },
    },
  ],
};
