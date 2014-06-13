/** @jsx React.DOM */
/* jshint ignore:start */
var testedFilePath = '../../../../../application/ui/components/navigation/main-nav.jsx';

jest.dontMock(testedFilePath);
jest.dontMock('underscore');

describe('MainNav', function() {
    it('contains links for sections and resources', function() {
        var MainNav = require(testedFilePath);
        var TestUtils = require('react/lib/ReactTestUtils');

        var config = {
            'resources' : {
                'Section' : [
                    {
                        name : 'Resource 1'
                    },
                    {
                        name : 'Resource 2'
                    }
                ]
            }
        };

        var mainNav = <MainNav config={config} />;
        TestUtils.renderIntoDocument(mainNav);

        links = TestUtils.scryRenderedDOMComponentsWithClass(mainNav, 'main-nav__link');

        expect(links.length).toEqual(3);
        expect(links[0].getDOMNode().textContent).toEqual('Section');
        expect(links[1].getDOMNode().textContent).toEqual('Resource 1');
        expect(links[2].getDOMNode().textContent).toEqual('Resource 2');
    });

    it('renders back link', function() {
        var MainNav = require(testedFilePath);
        var TestUtils = require('react/lib/ReactTestUtils');

        var mainNav = <MainNav config={{}} />;
        TestUtils.renderIntoDocument(mainNav);

        var backLink = TestUtils.findRenderedDOMComponentWithClass(
            mainNav,
            'header__back-link'
        );

        expect(backLink.getDOMNode().getAttribute('href')).toEqual('/');
    });
});
