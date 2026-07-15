# Contributing to MultiArena Clash

Thank you for your interest in contributing! We welcome all kinds of contributions.

## Getting Started

### Prerequisites
- Node.js v18+
- Git
- MongoDB (local or Atlas)
- Godot Engine 4.x (for game development)

### Development Setup

1. **Fork the repository**
   ```bash
   gh repo fork aadi7036/MultiArena-Clash --clone
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Types of Contributions

- **🐛 Bug Reports**: Use the bug report template
- **✨ Feature Requests**: Describe the use case and implementation
- **📝 Documentation**: Fix typos and clarify wording
- **🎮 Game Development**: Improve game mechanics and add new content
- **🔧 Backend Development**: Fix bugs and add features
- **🎨 Frontend Development**: UI/UX improvements and mobile optimization

## Code Standards

### Commit Messages
```
<type>(<scope>): <subject>
<body>
<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore

## Pull Request Process

1. Update from main
2. Write tests
3. Run linter: `npm run lint:fix`
4. Create descriptive PR with title and description
5. Address review feedback

## Testing

```bash
npm run test
npm run test:watch
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.