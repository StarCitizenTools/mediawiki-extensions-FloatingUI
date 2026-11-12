# AGENTS.md

## Overview

FloatingUI is a MediaWiki extension (requires MW 1.43+) that wraps the [Floating UI](https://floating-ui.com/) JavaScript library and exposes it through a `{{#floatingui:reference|floating}}` parser function. PHP renders the reference/floating elements; vanilla JS positions the floating element relative to its reference at runtime via MediaWiki's ResourceLoader. Styles are written in LESS.

## Verification

Run only what's relevant to the files you changed.

| Files changed | Command |
| --- | --- |
| `*.php` | `composer preflight` (lint, style, and Phan) |
| `*.js` | `npm run lint:js` |
| `*.less`, `*.css` | `npm run lint:styles` |
| `i18n/` | `npm run lint:i18n` |

Auto-fix commands: `composer fix` (PHP), `npm run lint:fix:js` (JS), `npm run lint:fix:styles` (styles).

**Preflight**: Run `npm run preflight` to execute all Node-based lints in one command. Run `composer preflight` in the [dev environment](#dev-environment) to execute all PHP lints, style checks, and Phan static analysis.

**Always run the relevant checks before committing.** Read the full output — PHPCS warnings must be fixed, not just errors. The command exits 0 even with warnings, so do not treat exit code alone as a pass.

### Dev environment

PHP checks, PHPUnit and browser tests need a running MediaWiki that serves this checkout. Use the first that applies:

1. An environment the user has named.
2. A disposable one you start yourself with [mwenv](https://github.com/ProfessionalWiki/mwenv), which needs no MediaWiki installation.
3. A MediaWiki installation that contains this checkout, such as MediaWiki-Docker, when the task needs its content or extensions.

Ask the user only if none of these can run, or the task needs something a fresh wiki lacks. Don't destroy an environment you didn't create: its database may hold the user's test content.

Whichever you use, it needs what CI's PHP jobs get (`.github/workflows/ci.yml`): load each extension in `extra-extensions`, and require each package in `extra-composer-packages` into MediaWiki with Composer, without loading it.

## Coding conventions

### PHP

- All files start with `declare( strict_types=1 );`
- Use native PHP types (properties, parameters, return values); use PHPDoc only for collection types like `string[]`
- Always use MediaWiki-namespaced imports (`use MediaWiki\Title\Title;`), never legacy shims (`use Title;`)

### JavaScript

- CommonJS modules: `require()` for imports, `module.exports` for exports
- Bundled Floating UI library files live under `modules/lib/` and are managed via `ForeignResourcesDir` — do not hand-edit them (see [Updating the Floating UI library](#updating-the-floating-ui-library))

### LESS/CSS

- Styles live in `modules/`

### extension.json

`extension.json` is the source of truth for how the extension is wired — ResourceLoader modules, hooks, parser function registration, config variables, and dependencies are all declared here.

- When adding or removing files under `modules/`, update the corresponding `packageFiles` or `styles` list in `extension.json`
- The `{{#floatingui:...}}` parser function is registered in `includes/Hooks.php` via `ParserFirstCallInit`; its magic word lives in `FloatingUI.magic.php`
- Config variables (if added) should be prefixed `wgFloatingUI` and declared under `config` in `extension.json`

### Commits

- Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `fix:`, `feat:`, `refactor:`)
- Use `ci:` or `chore:` for non-user-facing changes (tooling, config, dependencies)

### i18n

- Any user-facing string needs a message key in `i18n/en.json`
- Every key in `en.json` must also have a documentation entry in `i18n/qqq.json`

## Updating the Floating UI library

The bundled Floating UI library (`modules/lib/floatingui-core/` and `modules/lib/floatingui-dom/`) is managed through MediaWiki's `manageForeignResources` maintenance script. The pinned versions, source tarball URLs, and SHA-512 integrity hashes live in `modules/lib/foreign-resources.yaml`.

To bump:

1. Look up the new version's tarball URL and integrity hash on npm:
   ```sh
   curl -s https://registry.npmjs.org/@floating-ui/core/<NEW_VERSION> \
     | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['dist']['integrity']);print(d['dist']['tarball'])"
   ```
2. Edit `modules/lib/foreign-resources.yaml` — update `version`, `src`, and `integrity` for each package.
3. Regenerate the bundled UMD files, from this directory in the [dev environment](#dev-environment):
   ```sh
   php ../../maintenance/run.php manageForeignResources --extension FloatingUI update
   ```
4. Verify the committed files match the manifest:
   ```sh
   php ../../maintenance/run.php manageForeignResources --extension FloatingUI verify
   ```
5. Commit `modules/lib/foreign-resources.yaml` together with the regenerated `*.umd.js`, `LICENSE`, and `README.md` files.

Floating UI changelog: https://github.com/floating-ui/floating-ui/releases
