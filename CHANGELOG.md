# Changelog

## [1.0.1](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/compare/v1.0.0...v1.0.1) (2025-04-07)


### Bug Fixes

* remove conflicting CSS with teleportTarget ([112c973](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/112c97335b3ebefc594abddc75117a5cf7de6e57))

## [1.0.0](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/compare/v0.3.1...v1.0.0) (2025-04-07)


### ⚠ BREAKING CHANGES

* update MediaWiki requirement to 1.43.0
* update imports to use MediaWiki namespace

### Features

* increase floating content padding ([f77590f](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/f77590f6ff61b3a27f6b67ed7e3e06f979d92be9))
* use Codex tokens ([057d4a0](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/057d4a0f086890736bff55eec9b28a46b91e74f4))
* use MW teleportTarget to position floating elements ([65754ac](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/65754ac97396f11505ef6edb201edc07861d1806))


### Miscellaneous Chores

* update @floating-ui/dom to 1.6.13 ([4599502](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/4599502da4f2c02c4891c4dea96c95b2cd72f828))


### Code Refactoring

* update imports to use MediaWiki namespace ([0b7c67a](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/0b7c67ae7e2719e228a32c54809479b1786f38b3))


### Build System

* update MediaWiki requirement to 1.43.0 ([f6990e4](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/f6990e4a55a1e1405984ce95c611058e490aea90))

## [0.3.1](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/compare/v0.3.0...v0.3.1) (2024-11-30)


### Bug Fixes

* match all sibling elements instead of the next one ([5f36d05](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/5f36d0556b53d1547d836eb9e5431c28d5ceb61d))
* mw-parser-output should apply to inner element ([3041a91](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/3041a91ad8d842535d7bc0a7af4e2eab7c069eb5))

## [0.3.0](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/compare/v0.2.0...v0.3.0) (2024-11-30)


### Features

* add mw-parser-output to floating-content so tooltip content can be styled by TemplateStyles ([512cb20](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/512cb20e3d17ae2f038324fe242b3e8aa41ccd12))
* use aria-details for reference element ([4ba15fe](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/4ba15fe35bb99a23833917e11bb3f67d2653d4b5))


### Miscellaneous Chores

* set installer-name for composer ([2aa7a2b](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/2aa7a2be0e9dbf8ca75aea31d8c4b45f3a847131))

## [0.2.0](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/compare/v0.1.0...v0.2.0) (2024-09-07)


### Features

* add animation to floating elements ([44c6751](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/44c67512c3c5de70cac622684d661faf15924761))
* constrain to top and bottom alignment only ([0fb2c11](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/0fb2c11884fe736cb7f0f5fc1419c0fb0a87e43f))
* separate floating positioning from content ([47de78b](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/47de78bdcb3654a78f32ddeb469a4b7f073c4a4a))
* use autoUpdate by default ([75e3930](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/75e39308647e514a96376fe75e6f9121dc252911))


### Bug Fixes

* prevent floating element from breaking viewport ([43f8870](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/43f8870e3c2282b93f80224216d6afb577519f88))
* remove elements after transition ([3f34b71](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/3f34b7190f2ab6bf5429b8b5d1e529cd57d2980f))

## [0.1.0](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/compare/v0.0.1...v0.1.0) (2024-09-05)


### Features

* add basic tooltip logic ([e72ecf8](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/e72ecf82adb16d781ea0ec5b78b6baa8328b3f70))
* add shift ([b11c043](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/b11c0438449cd217e8299f5839d2cc39ca2104b1))
* allow floating target to be focusable ([360991e](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/360991ef620ad5a3529f58b6cbe094e89613812c))
* allow the floating element to stay visible when it is interacted ([1bcec58](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/1bcec5845579775dda9e7de982c9c9935cfa6130))
* content must be directly inside the reference element ([106844e](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/106844e9446d4bdb8f35c08ce8cc6f6ada275ae6))
* initial commit ([41bae67](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/41bae675933cb618b2e5dfa36d5572c544eeed45))
* set aria-hidden to floating element ([e6a5eec](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/e6a5eecd0f5add28f1bcaa594b451ba3ad243924))
* set up arrow and basic styles ([ff0077f](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/ff0077f0f88e368f9eb538f0c80195a1c40a167e))
* support wikitext parser function ([542b585](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/542b585031fb6ad610f3a475fe1b143c63e8f83e))
* tweak floating styles ([5602449](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/560244944eb969c638c3440c50f619bb2b5d4c9f))


### Performance Improvements

* use transform instead of position to position floating element ([8e174dc](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/commit/8e174dc875f97f71703c2fbc14d60dcdc5956c69))
