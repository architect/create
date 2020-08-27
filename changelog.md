# Architect Create changelog

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
