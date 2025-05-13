# owal.sh

terminal-style personal portfolio with CLI navigation.

## features

- bash prompt navigation with arrow keys (←→ sections, ↑↓ scroll)
- paginated single-section view with fade transitions
- system theme detection (light/dark)
- GitHub contribution chart
- IBM Plex Mono typography

## sections

- `cat about.md` - bio, GitHub activity, current interests
- `python experience.py` - work history
- `./education.sh` - degrees and coursework
- `ls -la skills/` - technical skills
- `cat research.md` - academic research
- `./links.sh` - contact and social links

## dev

```bash
npm install
npm run dev
```

## build

```bash
npm run build
```

## stack

- React + TypeScript + Vite
- Tailwind CSS
- Lucide icons

## license

[MIT](LICENSE)
