var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var relative = require('.');

var cases = [{
  from: '/foo/bar.html',
  to: '/bam.html',
  is: '../bam.html'
}, {
  from: '/bam.html',
  to: '/foo/bar.html',
  is: './foo/bar.html'
}, {
  from: '/foo.html',
  to: '/bar.html',
  is: './bar.html'
}, {
  from: '/foo.html',
  to: '/foo.html',
  is: './foo.html'
}, {
  from: '/foo/bar.html',
  to: '/foo/bar.html',
  is: './bar.html'
}, {
  from: '/foo/bar/',
  to: '/foo/bar/',
  is: './'
}, {
  from: '/',
  to: '/foo.html',
  is: './foo.html'
}, {
  from: '/foo.html',
  to: '/',
  is: './'
}, {
  from: '/',
  to: '/',
  is: './'
}, {
  from: '/foo.html?query=foo',
  to: '/bar.html?query=bar',
  is: './bar.html?query=bar'
}, {
  from: '/foo.html#foo',
  to: '/bar.html#bar',
  is: './bar.html#bar'
}, {
  from: '/foo.html?query=foo#foo',
  to: '/bar.html?query=bar#bar',
  is: './bar.html?query=bar#bar'
}, {
  from: '/one/two/foo/bar/#/app/state',
  to: '/one/two/bam/#/second-app/second-state',
  is: '../../bam/#/second-app/second-state'
}, {
  from: '/one/two/three/page.html',
  to: '/foo/bar/',
  is: '../../../foo/bar/'
}, {
  from: '/foo/bar/',
  to: '/one/two/three/page.html',
  is: '../../one/two/three/page.html'
}];

lab.experiment('relative()', function() {

  cases.forEach((c, i) => {
    lab.test(`case ${i}`, done => {
      expect(relative(c.from, c.to)).to.equal(c.is);
      done();
    });
  });

  lab.test('it throws when from path is relative', done => {
    expect(() => relative('./foo/bar.html', '/foo/bar.html')).to.throw('Must be called with a full path');
    done();
  });

  lab.test('it throws when to path is relative', done => {
    expect(() => relative('/foo/bar.html', './foo/bar.html')).to.throw('Must be called with a full path');
    done();
  });

});
