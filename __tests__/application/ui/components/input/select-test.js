/** @jsx React.DOM */
/* jshint ignore:start */
var testedFilePath = '../../../../../application/ui/components/input/select.jsx';

jest.dontMock(testedFilePath);
jest.dontMock('underscore');

describe('SelectInput', function() {
    it('renders option tag for each element of options prop', function() {
        var Select, TestUtils, select;

        Select = require(testedFilePath);
        TestUtils = require('react/lib/ReactTestUtils');

        select = <Select options={['foo', 'bar']} />

        TestUtils.renderIntoDocument(select);

        options = TestUtils.scryRenderedDOMComponentsWithTag(select, 'option');

        expect(options.length).toEqual(2);
        expect(options[0].getDOMNode().getAttribute('value')).toEqual('foo');
        expect(options[0].getDOMNode().textContent).toEqual('foo');
        expect(options[1].getDOMNode().getAttribute('value')).toEqual('bar');
        expect(options[1].getDOMNode().textContent).toEqual('bar');
    });
});
