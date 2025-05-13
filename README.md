
# owal.sh - terminal-style personal website

A minimalist, terminal-style personal website with customizable themes and colors.

## features

- Terminal-inspired interface
- Multiple theme options (dark, solarized dark, solarized light, light)
- Customizable accent colors with a watercolor-inspired palette
- Responsive design for all screen sizes
- Sections for about, experience, skills, and links

## getting started

### prerequisites

- Node.js (v14 or newer)
- npm or yarn

### installation

1. Clone the repository
   ```bash
   git clone https://github.com/vowalsh/owal-sh.git
   cd owal-sh
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## building for production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` folder, ready to be deployed.

## customization

### themes

The website includes four themes:
- Dark
- Solarized Dark
- Solarized Light
- Light

Theme preferences are saved in local storage.

### terminal colors

You can customize the terminal accent color by clicking the color palette icon in the header.

## license

This project is open source and available under the [MIT License](LICENSE).

## acknowledgments

- built with React and Vite
- styled with Tailwind CSS
- icons from Lucide React
- UI components from shadcn/ui