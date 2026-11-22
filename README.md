# COLORS LAMP Stack Application

This project is a small COLORS web application with a vanilla HTML, CSS, and JavaScript frontend and a PHP/MySQL backend. It supports login, adding colors, and searching saved colors.

## Technologies

- HTML and CSS
- Vanilla JavaScript
- PHP
- MySQL
- Apache or the PHP built-in development server
- Node.js and npm for linting and automated tests
- ESLint, HTMLHint, Stylelint, and Jest
- GitHub Actions

## Project Structure

- `index.html` - Login page
- `color.html` - Add and search color page
- `js/code.js` - Frontend application logic
- `LAMPAPI/` - PHP API endpoints
- `database.sql` - Database schema and test seed data
- `tests/unit.test.js` - Frontend unit tests
- `tests/integration.test.js` - Live PHP API integration tests
- `.github/workflows/lint.yml` - Lint and test workflow

## Local Setup

### 1. Configure MySQL

Import the included schema:

```sql
mysql -u root -p < database.sql
```

The schema creates the `COP4331` database, `Users` and `Colors` tables, and a test user:

- Login: `testuser`
- Password: `testpass`

### 2. Configure PHP Database Credentials

The PHP endpoints use these defaults for local development:

- Host: `localhost`
- Port: `3306`
- Database: `COP4331`
- User: `TheBeast`
- Password: `WeLoveCOP4331`

They may be overridden with `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` environment variables.

### 3. Start the Application

With PHP and MySQL available, run this command from the project directory:

```powershell
php -S 127.0.0.1:8000 -t .
```

Open `http://127.0.0.1:8000/index.html`.

## Install Test and Lint Tools

Node.js is used only for development tools and testing. It does not replace the PHP/MySQL application server.

```powershell
npm ci
```

## Run Automated Checks

Run each lint check:

```powershell
npm run lint:html
npm run lint:css
npm run lint:js
```

Run the frontend unit tests:

```powershell
npm test -- --runTestsByPath tests/unit.test.js
```

Run the complete Jest suite while the PHP server and MySQL database are running:

```powershell
npm test
```

The API integration tests send requests to `http://127.0.0.1:8000` by default. Set `API_BASE_URL` to use a different server URL.

## GitHub Actions CI

The workflow in `.github/workflows/lint.yml` runs on every `push` and `pull_request`. It:

1. Starts a MySQL 8.0 service container.
2. Initializes the database using `database.sql`.
3. Installs PHP with the mysqli extension.
4. Starts the PHP built-in server on `127.0.0.1:8000`.
5. Installs Node.js dependencies with `npm ci`.
6. Runs HTMLHint, Stylelint, and ESLint.
7. Runs the complete Jest test suite.

