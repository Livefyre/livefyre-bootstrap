'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('sinon-chai'));
var sinon = require('sinon');

var Command = require('livefyre-bootstrap/command');

describe('command', function () {
    var cmd;
    beforeEach(function () {
        cmd = new Command(function () {});
    });

    it('is a function', function () {
        expect(cmd).to.be.instanceof(Command);
    });

    describe('canExecute()', function () {
        it('defaults to true', function () {
            expect(cmd.canExecute()).to.equal(true);
        });
    });

    describe('.execute()', function () {
        it('executes the function passed to the constructor', function () {
            var spy = sinon.spy();
            var cmd = new Command(spy);
            cmd.execute();
            expect(spy.callCount).to.equal(1);
        });
    });

    describe('.enable()', function () {
        it('causes .canExecute() to be true', function () {
            cmd.disable();
            cmd.enable();
            expect(cmd.canExecute()).to.equal(true);
        });
        it('fires the change:canExecute event with true', function () {
            var spy = sinon.spy();
            cmd.on('change:canExecute', spy);
            cmd.enable();
            expect(spy).to.have.been.called;
        });
    });

    describe('.disable()', function () {
        it('causes .canExecute() to be false', function () {
            cmd.disable();
            expect(cmd.canExecute()).to.equal(false);
        });
    });
});

// TODO: Command should emit events so buttons can disable them