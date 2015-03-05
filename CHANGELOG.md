## [v0.2.0](https://github.com/synapsestudios/lively/compare/v0.1.0...v0.2.0) - 03/05/2015

### Added Features
- [#27](https://github.com/synapsestudios/lively/pull/27) Allow user to explicitly pass null for a parameter
- [#46](https://github.com/synapsestudios/lively/pull/46) Display request/response time
- [#79](https://github.com/synapsestudios/lively/pull/79) Add checkboxes to determine whether or not to send parameter
- [#97](https://github.com/synapsestudios/lively/pull/97) OAuth "Log Out" Button
- [#101](https://github.com/synapsestudios/lively/pull/101) Display GET querystring params in Request URI box
- [#119](https://github.com/synapsestudios/lively/pull/119) Copy Response to Clipboard link
- [#120](https://github.com/synapsestudios/lively/pull/120) Add loading indicator so it's clear when a request is being made
- [#127](https://github.com/synapsestudios/lively/pull/127) Add way to generate valid Stripe tokens

### Documentation Updates
- [#94](https://github.com/synapsestudios/lively/pull/94) Document Lively configuration
- [#114](https://github.com/synapsestudios/lively/pull/114) Update lively config files to match Github API
- [#123](https://github.com/synapsestudios/lively/pull/123) Update lively config files to match Github API for endpoints with custom accept headers

### Refactorings
- [#67](https://github.com/synapsestudios/lively/pull/67) Refactor Lively to use Flux
- [#104](https://github.com/synapsestudios/lively/pull/104) Version lock synapse-common to 0.2.0
- [#107](https://github.com/synapsestudios/lively/pull/107) Rename Method component to Endpoint
- [#110](https://github.com/synapsestudios/lively/pull/110) Update synapse-common to v1.0.0

### Bug Fixes
- [#87](https://github.com/synapsestudios/lively/pull/87) NaN displayed when deleting entry or adding non-numeric value to integer type field
- [#92](https://github.com/synapsestudios/lively/pull/92) Expanded methods should not save state between pages
- [#102](https://github.com/synapsestudios/lively/pull/102) Can't POST payload with child in array[hash] when defaultValue is set
- [#103](https://github.com/synapsestudios/lively/pull/103) array[] parameters submit empty values
- [#108](https://github.com/synapsestudios/lively/pull/108) 422 blank field errors when fields aren't blank
- [#109](https://github.com/synapsestudios/lively/pull/109) 422 errors first time submitting some endpoints
- [#112](https://github.com/synapsestudios/lively/pull/112) Uncaught TypeError when submitting a request with a querystring parameter
- [#113](https://github.com/synapsestudios/lively/pull/113) Default values aren't populated after logging in via Oauth or navigating to other sections


## [v0.1.0](https://github.com/synapsestudios/lively/releases/tag/v0.1.0) - 2014-09-26
- Initial release
