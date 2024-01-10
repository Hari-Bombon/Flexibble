import { graph, auth, config } from '@grafbase/sdk';

// Assuming there's a separate URL type definition or method
const UrlType = graph.url();

// Define a User model
const User = graph.model('User', {
  name: graph.string().length({ min: 2, max: 20 }),
  email: graph.string().unique(),
  avatarUrl: UrlType,
  description: graph.string(),
  githubUrl: UrlType.optional(),
  linkedinUrl: UrlType.optional(),
  projects: graph.relation(() => Project).list().optional(),
});

// Define a Project model
const Project = graph.model('Project', {
  title: graph.string().length({ min: 3 }),
  description: graph.string(),
  image: UrlType,
  githubUrl: UrlType.optional(),
  category: graph.string().search(),
  createdBy: graph.relation(() => User),
});

// Export the User model, Project model, and the Grafbase configuration
export { User, Project, config };
