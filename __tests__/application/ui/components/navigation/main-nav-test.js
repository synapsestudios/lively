/** @jsx React.DOM */
/* jshint ignore:start */
var testedFilePath = '../../../../../application/ui/components/navigation/main-nav.jsx';
jest.dontMock(testedFilePath);

describe('MainNav', function() {
    it('contains links to the pages', function() {
        var MainNav = require(testedFilePath);
        var TestUtils = require('react/lib/ReactTestUtils');

        var config = {
            'resources' : {
                'aResource' : [
                    ''
                ],
            }
        };

        // Render the main nav in the document
        var mainNav = <MainNav config={config} />;
        TestUtils.renderIntoDocument(mainNav);

        var backLink = TestUtils.findRenderedDOMComponentWithClass(
            mainNav,
            'header__back-link'
        );
        expect(backLink.getDOMNode().textContent).toEqual('Back to API List');
    });
});
