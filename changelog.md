# Architect Create changelog

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
