// This is the initialization file for the Factor framework.
// Add any config customization to the object that is passed in to the function.
const commandLineArguments = require("yargs").argv
const pkg = require("./package")

// Add configuration options to the 'factor' key in package.json
// Or to factor.config.js
let conf = {}
try {
  conf = require("./factor.config")
} catch {}

const factorConfig = { ...pkg.factor, ...conf }

// This is the initialization file for the Factor framework.
// Add any config customization to the object that is passed in to the function.
// Anything that needs access to the $filters, $files or $config object should happen inside the setup callback
require("@factor/core")({
  baseDir: __dirname,
  setup: Factor => {
    // Override password.json master key handling
    // Factor.$filters.add('master-password', yourPasswordsObject )
  },
  ...factorConfig,
  ...commandLineArguments
})