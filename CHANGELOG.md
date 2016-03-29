## [v1.0.6](https://github.com/synapsestudios/lively/compare/v1.0.5...v1.0.6) - 2015-08-24
###Added
- [#155](https://github.com/synapsestudios/lively/pull/155)  Configuration param to specify NOT to include the param.


## [v1.0.5](https://github.com/synapsestudios/lively/compare/v1.0.4...v1.0.5) - 2015-07-15
###Changed
- [#151](https://github.com/synapsestudios/lively/pull/151)  Lively to use webpack 1.10.0.


## [v1.0.4](https://github.com/synapsestudios/lively/compare/v1.0.3...v1.0.4) - 2015-07-06
### Added
- [#136](https://github.com/synapsestudios/lively/pull/136)  Data type that uses a text box for longer strings.
- [#150](https://github.com/synapsestudios/lively/pull/150)  HotModuleReplacementPlugin for qa environment.

###Fixed
- [#144](https://github.com/synapsestudios/lively/pull/144)  Adding Recursive Objects Breaks Design.


## [v1.0.3](https://github.com/synapsestudios/lively/compare/v1.0.2...v1.0.3) - 2015-05-26
### Fixed
- [#130](https://github.com/synapsestudios/lively/pull/130)   "No access token provided" error.
- [#139](https://github.com/synapsestudios/lively/pull/139) Fixed enum param inside array ending up with null value (merged).
- [#140](https://github.com/synapsestudios/lively/pull/140)  Unable to scroll longer response body.
- [#142](https://github.com/synapsestudios/lively/pull/142)  Error during `npm install`.


## [v1.0.2](https://github.com/synapsestudios/lively/compare/v1.0.1...v1.0.2) - 2015-04-17
### Fixed
- [#139](https://github.com/synapsestudios/lively/pull/139)  Fixed enum param inside array ending up with null value.


## [v1.0.1](https://github.com/synapsestudios/lively/compare/v1.0.0...v1.0.1) - 2015-04-06
### Fixed
- [#139](https://github.com/synapsestudios/lively/pull/139)  Fixed enum not using first enumValue when no defaultValue is provided.


## [v1.0.0](https://github.com/synapsestudios/lively/compare/v0.4.0...v1.0.0) - 2015-04-02
### Added
- [#135](https://github.com/synapsestudios/lively/pull/135)  Added Webpack Dev Server entry point to Webpack Config.

### Changed
- [#88](https://github.com/synapsestudios/lively/pull/88)  Refactored params-list to use separate components instead of recursion.


## [v0.4.0](https://github.com/synapsestudios/lively/compare/v0.3.0...v0.4.0) - 2015-03-13
### Changed
- [#125](https://github.com/synapsestudios/lively/pull/125)  Move from gulp to webpack


## [v0.3.0](https://github.com/synapsestudios/lively/compare/v0.2.0...v0.3.0) - 2015-03-12
### Added
- [#83](https://github.com/synapsestudios/lively/pull/83)  Add support for an array of hashes with custom keys
- [#60](https://github.com/synapsestudios/lively/pull/60)  Allow sending specific param as the body instead of an object

### Fixed
- [#122](https://github.com/synapsestudios/lively/pull/122)  Enum fields can have invalid defaultValues


## [v0.2.0](https://github.com/synapsestudios/lively/compare/v0.1.0...v0.2.0) - 2015-03-05
### Added
- [#27](https://github.com/synapsestudios/lively/pull/27)  Allow user to pass null for a parameter
- [#46](https://github.com/synapsestudios/lively/pull/46)  Display request/response time
- [#67](https://github.com/synapsestudios/lively/pull/67)  Refactor to use Fluxxor
- [#79](https://github.com/synapsestudios/lively/pull/79)  Add checkboxes to determine whether or not to send parameter
- [#94](https://github.com/synapsestudios/lively/pull/94)  Document configuration files
- [#97](https://github.com/synapsestudios/lively/pull/97)  OAuth "Log Out" Button
- [#101](https://github.com/synapsestudios/lively/pull/101)  Display GET querystring params in Request URI box
- [#106](https://github.com/synapsestudios/lively/pull/106)  Add support for simple, non-resumable upload
- [#119](https://github.com/synapsestudios/lively/pull/119)  Add button to highlight response body for easy copying to clipboard
- [#120](https://github.com/synapsestudios/lively/pull/120)  Add loading indicator so it's clear when a request is being made
- [#127](https://github.com/synapsestudios/lively/pull/127)  Add way to generate valid Stripe tokens

### Changed
- [#104](https://github.com/synapsestudios/lively/pull/104)  Version lock synapse-common to 0.2.0
- [#107](https://github.com/synapsestudios/lively/pull/107)  Rename `method` component to `endpoint`
- [#110](https://github.com/synapsestudios/lively/pull/110)  Update synapse-common to v1.0.0
- [#114](https://github.com/synapsestudios/lively/pull/114) / [#123](https://github.com/synapsestudios/lively/pull/123)  Update GitHub documentation

### Fixed
- [#87](https://github.com/synapsestudios/lively/pull/87) / [#92](https://github.com/synapsestudios/lively/pull/92) / [#102](https://github.com/synapsestudios/lively/pull/102) / [#103](https://github.com/synapsestudios/lively/pull/103), [#108](https://github.com/synapsestudios/lively/pull/108) / [#109](https://github.com/synapsestudios/lively/pull/109) / [#112](https://github.com/synapsestudios/lively/pull/112) / [#113](https://github.com/synapsestudios/lively/pull/113)


## [v0.1.0](https://github.com/synapsestudios/lively/releases/tag/v0.1.0) - 2014-09-26
- Initial release
