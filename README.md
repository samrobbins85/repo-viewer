# nextjs-template

This is a template repository for when I want to produce a something using Next.js

## License

This is licensed under MIT, one of the best licenses for open source software. Change the `LICENSE` file if a different license is more suitable.

## Tailwind CSS

This does not need any additional configuration, but this site uses [Tailwind CSS](https://tailwindcss.com/), this makes styling elements simpler.

Additional styles can be configured in `/styles/index.css` and Tailwind Plugins can be installed in `tailwind.config.js`

## Code formatting and linting

Again this doesn't need any additional configuration, but can be configured if you wish, for code formatting and linting I have

-   `.eslintrc.yml`
-   `.prettierrc.json`
-   `.markdownlint.yml`
-   `.stylelintrc.json`

Ensure that whatever configuration you choose doesn't cause conflicts, such as using tabs in ESLint and spaces in prettier.

This is also configured with GitHub superlinter to run all these as one GitHub action

## Dependabot

Dependabot is enabled on this repository, so you will receive pull requests whenever there is an update to a package, this ensures you have the latest features and reduces the chance of a security vulnerability.

## VS Code autostart

When you open this project in VS Code it will run `npm run dev` to start the development server

## Vercel Hosting

This site will use hosting from Vercel. This can be configured in `vercel.json`.
