// Données statiques pour le mode offline
export const staticRules = [
  {
    id: 1,
    title: "Next.js Best Practices",
    slug: "nextjs-best-practices",
    content: `
# Next.js Best Practices

## Core Principles
- Use App Router for better performance
- Implement proper error boundaries
- Use proper data fetching patterns with suspense
- Leverage server components when possible
- Optimize images with next/image

## Performance
- Use dynamic imports for code splitting
- Implement proper caching strategies
- Optimize bundle size with webpack analysis
- Use React.memo for expensive components
    `,
    tags: ["Next.js", "React", "Performance"],
    author: {
      name: "Directories Team",
      url: "https://github.com/directories",
      avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
    },
  },
  {
    id: 2,
    title: "TypeScript Guidelines",
    slug: "typescript-guidelines",
    content: `
# TypeScript Guidelines

## Type Safety
- Use strict null checks
- Prefer interface over type for object shapes
- Use type guards and assertions
- Implement proper type inference
- Avoid any type

## Best Practices
- Use const assertions
- Leverage utility types
- Implement proper error handling
- Use discriminated unions
    `,
    tags: ["TypeScript", "JavaScript", "Type Safety"],
    author: {
      name: "Directories Team",
      url: "https://github.com/directories",
      avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
    },
  },
  {
    id: 3,
    title: "Symfony PHP Development",
    slug: "symfony-php-development",
    content: `
# Symfony PHP Development

## Core Principles
- Write concise, technical responses with accurate PHP/Symfony examples
- Prioritize SOLID principles for object-oriented programming
- Follow PHP and Symfony best practices
- Design for scalability and maintainability

## Symfony Standards
- Use Doctrine ORM for database interactions
- Implement Repository and Service patterns
- Utilize Symfony Security component
- Leverage Symfony Cache component
    `,
    tags: ["Symfony", "PHP", "Backend"],
    author: {
      name: "Umut Ramazan Gedik",
      url: "https://x.com/UmutRamazan7",
      avatar: "https://pbs.twimg.com/profile_images/1843937582205263872/-nJw6j2L_400x400.jpg",
    },
  },
  {
    id: 4,
    title: "Cairo Smart Contracts",
    slug: "cairo-smart-contracts",
    content: `
# Cairo Smart Contracts for Starknet

## Core Principles
- Write secure, efficient, and maintainable Cairo smart contracts
- Ensure rigorous testing and auditing before deployment
- Focus on security and performance

## Cairo Development
- Use Cairo's unique programming model
- Structure code to be modular
- Implement strict access controls
- Validate all inputs to prevent unauthorized transactions
    `,
    tags: ["Cairo", "Starknet", "Blockchain"],
    author: {
      name: "amanusk",
      url: "https://x.com/amanusk_",
      avatar: "https://avatars.githubusercontent.com/u/7280933?v=4",
    },
  },
];

export const staticJobs = [
  {
    id: 1,
    title: "Développeur Frontend React",
    company: "TechCorp",
    location: "Paris, France",
    type: "CDI",
    salary: "50k-70k €",
    description: "Nous recherchons un développeur frontend expérimenté avec React et TypeScript.",
    tags: ["React", "TypeScript", "Frontend"],
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Développeur Backend Node.js",
    company: "StartupXYZ",
    location: "Remote",
    type: "CDI",
    salary: "45k-65k €",
    description: "Rejoignez notre équipe backend pour développer des APIs robustes.",
    tags: ["Node.js", "Backend", "API"],
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Développeur Full Stack",
    company: "InnovationLab",
    location: "Lyon, France",
    type: "CDI",
    salary: "55k-75k €",
    description: "Poste full stack avec Next.js et PostgreSQL.",
    tags: ["Next.js", "PostgreSQL", "Full Stack"],
    featured: true,
    created_at: new Date().toISOString(),
  },
];

export const staticMcps = [
  {
    id: 1,
    title: "GitHub MCP",
    slug: "github-mcp",
    description: "Model Context Protocol pour GitHub - Gestion des repositories, issues, et pull requests.",
    category: "Development",
    tags: ["GitHub", "Development", "MCP"],
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Database MCP",
    slug: "database-mcp",
    description: "MCP pour la gestion des bases de données - Requêtes, schémas, et migrations.",
    category: "Database",
    tags: ["Database", "SQL", "MCP"],
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "File System MCP",
    slug: "filesystem-mcp",
    description: "MCP pour la gestion des fichiers et dossiers - Lecture, écriture, et organisation.",
    category: "System",
    tags: ["File System", "System", "MCP"],
    featured: true,
    created_at: new Date().toISOString(),
  },
];

export const staticEvents = [
  {
    id: 1,
    title: "Conférence React Paris 2024",
    date: new Date(Date.now() + 86400000).toISOString(), // Demain
    location: "Paris, France",
    description: "La plus grande conférence React de France avec les meilleurs speakers.",
    type: "Conference",
    tags: ["React", "JavaScript", "Conference"],
  },
  {
    id: 2,
    title: "Workshop TypeScript",
    date: new Date(Date.now() + 172800000).toISOString(), // Après-demain
    location: "Remote",
    description: "Workshop pratique sur TypeScript avancé.",
    type: "Workshop",
    tags: ["TypeScript", "Workshop", "Learning"],
  },
];
