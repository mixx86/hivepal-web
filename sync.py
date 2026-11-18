"""Copies the documentation from the Hivepal repo (one source of truth) into site-src/.

Links that leave docs/ (to the code, SECURITY.md, the OpenAPI file…) become links to GitHub.

    python3 sync.py [path to the hivepal repo, default ../hivepal]
"""
import re
import shutil
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent / "site-src"
REPO = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / "hivepal").resolve()
DOCS = REPO / "docs"
GITHUB = "https://github.com/mixx86/hivepal/blob/main/"
OWN = {"index.md", "assets", "stylesheets", "javascripts"}  # the site's own files, never overwritten
SKIP = {"README.md", "hivepal-icon.png", "hivepal-icon.svg"}

LINK = re.compile(r"(\]\(|src=\")([^)\"#\s]+)([^)\"\s]*)")


def fix_links(text: str, src: Path) -> str:
    def repl(m: re.Match) -> str:
        target = m.group(2)
        if re.match(r"^[a-z]+:|^/|^#", target):
            return m.group(0)
        resolved = (src.parent / target).resolve()
        try:
            resolved.relative_to(DOCS)
            return m.group(0)  # stays inside the docs: a page of the site
        except ValueError:
            pass
        try:
            rel = resolved.relative_to(REPO)
        except ValueError:
            return m.group(0)
        return f"{m.group(1)}{GITHUB}{rel.as_posix()}{m.group(3)}"
    return LINK.sub(repl, text)


def main() -> None:
    if not DOCS.is_dir():
        raise SystemExit(f"no docs/ in {REPO}")
    for p in SITE.iterdir():
        if p.name not in OWN:
            shutil.rmtree(p) if p.is_dir() else p.unlink()
    n = 0
    for src in DOCS.rglob("*"):
        rel = src.relative_to(DOCS)
        if src.is_dir() or rel.name in SKIP:
            continue
        dst = SITE / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        if src.suffix == ".md":
            dst.write_text(fix_links(src.read_text(), src))
        else:
            shutil.copy2(src, dst)
        n += 1
    print(f"synced {n} files from {DOCS}")


if __name__ == "__main__":
    main()
