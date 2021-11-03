[<img src="https://assets.arc.codes/architect-logo-500b@2x.png" width=500>](https://www.npmjs.com/package/@architect/create)

## [`@architect/create`](https://www.npmjs.com/package/@architect/create)

> Architect Create: Bootstrap new Architect projects, and idempotently create new project resources

[![GitHub CI status](https://github.com/architect/create/workflows/Node%20CI/badge.svg)](https://github.com/architect/create/actions?query=workflow%3A%22Node+CI%22)


## Create a new Architect project

```
npm init @architect [--runtime [node, deno, ruby, python]] [project name and/or path]
```

Example:

> `npm init @architect` ......... create project named for current dir in current dir

> `npm init @architect ./` ...... create project named for current dir in current dir

> `npm init @architect foo` ..... create project named `foo` in current dir

> `npm init @architect ./foo` ... create `./foo` dir and project named `foo` that dir

> `npm init @architect ../foo` .. create `../foo` dir and project named `foo` that dir

> `npm init @architect /foo` .... create `/foo` dir, creates project named `foo` that dir

> `npm init @architect ../` ..... create project in .. for named for whatever .. is named
