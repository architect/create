// let { join } = require('path')

module.exports = {
  // Setters
  set: {
    /**
     * Pragmas
     */
    // @events
    events: params => {
      // return {
      //   name: 'my-event',
      //   src: join('path', 'to', 'code'),
      // }
    },
    // @queues
    queues: params => {
      // return {
      //   name: 'my-queue',
      //   src: join('path', 'to', 'code'),
      // }
    },
    // @http
    http: params => {
      // return {
      //   method: 'get',
      //   path: '/*'
      //   src: join('path', 'to', 'code'),
      // }
    },
    // @scheduled
    scheduled: params => {
      // return {
      //   name: 'my-scheduled-event',
      //   src: join('path', 'to', 'code'),
      //   rate: '1 day', // or...
      //   cron: '* * * * * *',
      // }
    },
    // @tables-streams
    'tables-streams': params => {
      // return {
      //   name: 'my-table-stream',
      //   table: 'app-data',
      //   src: join('path', 'to', 'code'),
      // }
    },
    // Custom / bare Lambdas (with event sources to be defined by `deploy.start`)
    customLambdas: params => {
      // return {
      //   name: 'my-custom-lambda',
      //   src: join('path', 'to', 'code'),
      // }
    },

    /**
     * Resources
     */
    env: params => {
      // return {
      //   MY_ENV_VAR: 'ok',
      //   ANOTHER_VAR: { objects_and_arrays_are_automatically_json_encoded: 'neat!' }
      // }
    },
    runtimes: params => {
      // return {
      //   name: 'runtime-name',
      //   type: 'transpiled',
      //   build: '.build',
      //   baseRuntime: 'nodejs14.x',
      // }
    },
  },

  // Deploy
  deploy: {
    start: async params => {
      // Run operations prior to deployment
      // Optionally return mutated CloudFormation
    },
    services: async params => {
      // return {
      //   'service-name': 'value or ARN', // Register a service, or...
      //   'arbitrary-data': '...' // Add up to 4KB of arbitrary data / config as a string
      // }
    },
    target: async params => {
      /* API NOT YET ENABLED */
      // Deploy to a target other than AWS (e.g. Begin, Serverless Cloud, etc.)
    },
    end: async params => {
      /* API NOT YET ENABLED */
      // Run operations after to deployment
    },
  },

  // Sandbox
  sandbox: {
    start: async params => {
      // Run operations upon Sandbox startup
    },
    watcher: async params => {
      // Act on filesystem events within your project
    },
    end: async params => {
      // Run operations upon Sandbox shutdown
    },
  }
}
