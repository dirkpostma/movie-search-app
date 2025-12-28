# Contributing Guidelines

Thank you for your interest in improving this React Native project!

## Development Setup

1. Follow the [Getting Started](README.md#getting-started) guide
2. Ensure all dependencies are installed: `yarn install`
3. Set up your environment: `cp src/env.example.ts src/env.ts`

## Code Quality Standards

### Pre-commit Hooks

This project uses Husky to enforce code quality before commits:

- **ESLint**: Automatically runs on staged files
- **Prettier**: Automatically formats staged files
- **Commitlint**: Validates commit message format

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**

```
feat(search): add debounce to search input
fix(list): resolve memory leak in infinite scroll
docs(readme): update architecture documentation
```

### Code Style

- **TypeScript**: Strict mode enabled, all types must be explicit
- **ESLint**: Follows React Native ESLint config
- **Prettier**: Automatic formatting on save/commit
- **Imports**: Use path aliases (`@/core`, `@/features`)

### Testing

- Write tests for new features
- Maintain or improve test coverage
- Run `yarn test` before committing
- E2E tests should pass (if applicable)

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following code standards
3. Ensure all tests pass: `yarn test`
4. Ensure type checking passes: `yarn typecheck`
5. Ensure linting passes: `yarn lint`
6. Update documentation if needed
7. Create a pull request with a clear description

## Architecture Guidelines

### Component Structure

- **Atoms**: Basic building blocks (no business logic)
- **Molecules**: Composed components (minimal logic)
- **Organisms**: Complex components (may contain hooks)
- **Templates**: Page layouts
- **Screens**: Navigation entry points
- **Pages**: Screen content (contains business logic)

### File Naming

- Components: `kebab-case.tsx`
- Hooks: `use-kebab-case.ts` or `use-kebab-case.tsx`
- Utilities: `kebab-case.ts`
- Types: `types.ts` or `kebab-case.types.ts`

### Import Order

1. React and React Native imports
2. Third-party library imports
3. Internal imports (using path aliases)
4. Type imports

## Questions?

Feel free to open an issue for questions or clarifications!
