const helper = require('node-red-node-test-helper');
const testTargetNode = require('../src/index.js');

describe('your-custom-node Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    const flow = [{ id: 'n1', type: 'your-custom-node', name: 'test name' }];
    helper.load(testTargetNode, flow, function () {
      var n1 = helper.getNode('n1');
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  it('should make payload lower case', function (done) {
    const flow = [
      { id: 'n1', type: 'your-custom-node', name: 'test name', wires:[[ 'n2' ]] },
      { id: 'n2', type: 'helper' }
    ];
    helper.load(testTargetNode, flow, function () {
      const n2 = helper.getNode('n2');
      const n1 = helper.getNode('n1');
      n2.on('input', function (msg) {
        msg.should.have.property('payload', 'uppercase');
        done();
      });
      n1.receive({ payload: 'UpperCase' });
    });
  });
});
