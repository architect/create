# Architect Create changelog

---

## [2.0.0 - 2.0.1] 2021-07-22

### Changed

- Breaking change: removed support for Node.js 10.x (now EOL, and no longer available to created in AWS Lambda) and Node.js 12.x
- Updated dependencies

---

## [1.4.2 - 1.4.3] 2021-06-21

### Changed

- Updated dependencies

---

## [1.4.1] 2021-03-25

### Fixed

- Fixed project structure and basic file creation when initializing a fresh new project; fixes [#1078](https://github.com/architect/architect/issues/1078)

---

## [1.4.0] 2021-03-22

### Added

- Added beta support for `@plugins` pragma
  - This allows plugin authors to create new Lambdas

---

## [1.3.4] 2021-03-17

### Fixed

- Fixed file creation in projects that use Architect within `package.json`

---

## [1.3.3] 2021-01-18

### Fixed

- Fixed crash in Windows on invalid regexp, fixes #1052, thanks @kevin4dhd!

---

## [1.3.2] 2020-12-02

### Added

- Add support for custom templates in paths outside the project directory (e.g. `~/tmpl/http.js`, `../../tmpl/http.js`)


### Fixed

- Fixed potential for empty files to be written to disk during initialization should a template not be found

---

## [1.3.1] 2020-11-30

### Fixed

- Fixed broken `@tables stream` documentation link (which will be added back in later!), thanks @filmaj!

---

## [1.3.0] 2020-11-23

### Added

- Added support for custom file paths
- Added support for custom default templates, thanks @Ankcorn!
  - Add per-pragma custom templates via the Arc preferences file, example:
```arc
# preferences.arc or prefs.arc
@create
templates
  http path/to/template/file
```


### Changed

- Implemented Inventory (`@architect/inventory`)

---

## [1.2.0] 2020-09-30

### Added

- Add support for `@http` catchall syntax (e.g. `get /api/*`)

---

## [1.1.3] 2020-09-30

### Fixed

- Fix issue where `app.arc` manifests accidentally may be overwritten by template initializer

---

## [1.1.2] 2020-09-28

### Changed

- Fix remaining `.arc` file references to `app.arc`

---

## [1.1.1] 2020-08-27

### Added

- Added explicit `statusCode` parameters to all responses for forward compatibility with API Gateway HTTP APIs

---

## [1.1.0] 2020-06-23

### Changed

- Default Architect project manifest filename is now `app.arc` (changed from `.arc`)
  - All existing projects are unaffected by this change, and will always support `.arc`
  - Fixes #805
- Internal change: implemented new code standard with `@architect/eslint-config`
- Updated dependencies

---

## [1.0.18] 2020-03-22

### Changed

- Cleaned up boilerplate code
- Updated dependencies

---

## [1.0.16 - 17] 2020-03-02

### Added

- Added support for running without an existing Architect project manifest


### Changed

- Added `cache-control` header by default
- Updated dependencies

---

## [1.0.15] 2020-02-05

### Changed

- Updated dependencies

---

## [1.0.14] 2020-01-29

### Changed

- Default `.arc` file no longer includes a boilerplate for `@aws bucket`

---

## [1.0.13] 2020-01-29

### Added

- Added `--static` flag to init to create a basic static asset app (instead of one with a `@http get /` function)
  - Example: `npm init @architect --static ./myapp`

---

## [1.0.12] 2020-01-22

### Changed

- Update default node version to `nodejs12.x`
- Updated dependencies

---

## [1.0.11] 2020-01-06

### Fixed

- Fixed issue with incorrectly setting default runtime, which could crash Sandbox


### Changed

- Updated dependencies

---

## [1.0.10] 2019-12-24

### Fixed

- Fixes broken 'runtime' value during initialization

---

## [1.0.8 - 1.0.9] 2019-12-17

### Added

- Added custom runtime `deno`

---

## [1.0.7] 2019-12-15

### Fixed

- Fixes project bootstrapping predicate; thanks @ksjogo!

---

## [1.0.6] 2019-12-12

### Changed

- Updated dependencies

---

## [1.0.5] 2019-11-19

### Changed

- Updated dependencies

---

## [1.0.3 - 1.0.4] 2019-10-18

### Added

- `/public` no longer generated if `@static` `folder` is defined
- Reintroduces backwards compatible `arc init` invocation from `@architect/architect`

---

## [1.0.0 - 1.0.2] 2019-10-17

### Background

- This repo was seeded by the project initializer in `@architect/utils/init`, with the intention to extend its capabilities


### Added

- Standalone project creation via `npm init @architect` (or via CLI by installing this repo globally, which would be kind of a funny thing to do, but hey who knows)
- Project creation will also install `@architect/architect` into your new project (if necessary and appropriate)
- Added ability to specify project name and install path, e.g. `create ./foo` creates a dir named `foo` in your current dir, and creates a new Arc project named `foo` in there


### Changed

- Updated default function names; resolves #2, thanks @andybee!


### Fixed

- Runtime flag now works: `runtime`, `--runtime`, or `-r` + `node`, `js`, `python`, `py`, `ruby`, `rb` initializes with Node, Python, or Ruby

---

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
