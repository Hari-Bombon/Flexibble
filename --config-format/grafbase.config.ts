import { graph, auth, config } from '@grafbase/sdk';

// Define a User model
const User = graph.model('User', {
  name: graph.string().length({ min: 2, max: 20 }),
  email: graph.string().unique(),
  avatarUrl: graph.url(),  // Added comma here
  description: graph.string(),
});

// Configure Grafbase
const grafbaseConfig = config({
  // Provide configuration options here
  // Example: connection settings, authentication details, etc.
});

// Export the configured Grafbase instance
export default grafbaseConfig
