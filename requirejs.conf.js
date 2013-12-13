require.config({
  baseUrl: '/',
  paths: {
    jquery: 'lib/jquery/jquery',
    text: 'lib/requirejs-text/text',
    base64: 'lib/base64/base64',
    hogan: 'lib/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
    hgn: 'lib/requirejs-hogan-plugin/hgn',
    inherits: 'lib/inherits/inherits',
    'event-emitter': 'lib/event-emitter/src/event-emitter',
    mocha: 'lib/mocha/mocha',
    chai: 'lib/chai/chai',
    json: 'lib/requirejs-plugins/src/json',
    bootstrap: 'lib/bootstrap/dist/js/bootstrap',
    sinon : 'lib/sinonjs/sinon',
    'sinon-chai': 'lib/sinon-chai/lib/sinon-chai',
    view: 'lib/view/src/view'
  },
  packages: [{
     name: "livefyre-bootstrap",
     location: "src/"
  },{
     name: "tests",
     location: "tests"
  },{
     name: "streamhub-sdk",
     location: "lib/streamhub-sdk/src/"
  },{
    name: "streamhub-sdk/modal",
    location: "lib/streamhub-sdk/src/modal"
  },{
    name: "streamhub-sdk/collection",
    location: 'lib/streamhub-sdk/src/collection'
  },{
    name: "streamhub-sdk/auth",
    location: 'lib/streamhub-sdk/src/auth'
  },{
    name: "streamhub-sdk/content",
    location: 'lib/streamhub-sdk/src/content'
  },{
    name: "stream",
    location: "lib/stream/src"
  }],
  shim: {
    bootstrap: {
        deps: ['jquery']
    },
    jquery: {
        exports: '$'
    },
    jasmine: {
        exports: 'jasmine'
    },
    'jasmine-html': {
        deps: ['jasmine'],
        exports: 'jasmine'
    },
    'jasmine-jquery': {
        deps: ['jquery', 'jasmine']
    },
    'sinon': {
      exports: 'sinon'
    }
  }
});
