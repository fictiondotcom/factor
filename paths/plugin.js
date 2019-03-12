const path = require("path")
const consola = require("consola")
module.exports = Factor => {
  return new class {
    constructor() {
      this.assign()

      // Set aliases for node using NPM package
      require("module-alias").addAliases(this.getAliases())
    }

    assign() {
      const { baseDir } = Factor.$pkg
      const _ = {}
      _.app = baseDir
      _.source = path.resolve(baseDir, "src")
      _.dist = path.resolve(baseDir, "dist")
      _.config = path.resolve(baseDir, "config")
      _.generated = path.resolve(baseDir, ".factor")
      _.static = path.resolve(baseDir, "static")
      _.template = path.resolve(_.source, "index.html")
      _.favicon = path.resolve(_.static, "favicon.png")

      this.paths = Factor.$filters.applyFilters("paths", _)
    }

    get(p) {
      return this.paths[p] || null
    }

    add(p, value) {
      if (typeof p == "object") {
        this.paths = { ...this.paths, ...p }
      } else {
        this.paths[p] = value
      }
    }

    getAliases() {
      return {
        "@": this.get("source"),
        "~": this.get("app"),
        "@generated": this.get("generated"),
        "@config": this.get("config"),
        "@entry": this.get("entry")
      }
    }

    replaceWithAliases(p) {
      const aliases = this.getAliases()

      for (const ali in aliases) {
        if (aliases[ali]) {
          p = p.replace(aliases[ali], ali)
        }
      }

      return p
    }
  }()
}