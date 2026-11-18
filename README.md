# hivepal-web

The website of [Hivepal](https://github.com/mixx86/hivepal): https://mixx86.github.io/hivepal-web/

The pages come from the Hivepal repo's `docs/` (one source of truth): `sync.py` copies them into
`site-src/` and turns links that leave `docs/` into links to GitHub. Only the home page
(`site-src/index.md`), the theme (`site-src/stylesheets/hivepal.css`) and the assets live here.

```bash
python3 sync.py ../hivepal          # copy the docs
uvx --from mkdocs-material==9.8.1 mkdocs serve  # preview at http://127.0.0.1:8000
./deploy.sh                         # build and publish to GitHub Pages (branch gh-pages)
```

Built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/); diagrams are Mermaid.
