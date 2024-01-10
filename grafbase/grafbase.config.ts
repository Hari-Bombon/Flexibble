import { graph, auth, config } from '@grafbase/sdk';

// Assuming there's a separate URL type definition or method
const UrlType = graph.url();
//@ts-ignore

const User = graph.model('User', {
  name: graph.string().length({ min: 2, max: 20 }),
  email: graph.string().unique(),
  avatarUrl: UrlType,
  description: graph.string(),
  githubUrl: UrlType.optional(),
  linkedinUrl: UrlType.optional(),
  projects: graph.relation(() => Project).list().optional(),
}).auth((rules) =>{
  rules.public().read()
})

//@ts-ignore
const Project = graph.model('Project', {
  title: graph.string().length({ min: 3 }),
  description: graph.string(),
  image: graph.url(),  // Assuming you have a URL type defined
  githubUrl: UrlType.optional(),
  category: graph.string().search(),
  createdBy: graph.relation(() => User),
}).auth((rules) =>{
  rules.public().read(),
  rules.private().create().delete().update()
})


const jwt = auth.JWT({
  issue:'grafbase',
  secret: graph.env('NEXT_AUTH_SECRET')
})
// Export the User model, Project model, and the Grafbase configuration
export default config({
  schema: graph,
  auth: {
    providers: [jwt]
    rules:(rules) => rules.private(),
    },
  },
)
