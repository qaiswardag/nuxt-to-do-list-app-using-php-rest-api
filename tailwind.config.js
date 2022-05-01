module.exports = {
    //  Start the Tailwind CLI build process
    //  Run the CLI tool to scan your template files for classes and build your CSS:

    //  npx tailwindcss -i ./assets/css/main.css -o ./dist/output.css --watch

    content: [
        `components/**/*.{vue,js}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `public/**/*.{vue,js,html}`,
        `plugins/**/*.{js,ts}`,
    ],
    theme: {},
    plugins: [],
};
