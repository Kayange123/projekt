import { g, auth, config } from '@grafbase/sdk'

//@ts-ignore
const project = g.model('Project',{
  title: g.string().length({min: 5}),
  description: g.string().optional(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(()=>user)
}).auth((rules)=>{rules.public().read(), rules.private().create().delete().update()})

//@ts-ignore
const user = g.model('User', {
  name: g.string().length({min: 5, max: 20}),
  email: g.email().unique(),
  avatar: g.url(),
  description: g.string().optional(),
  githubUrl: g.string().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(()=>project).optional().list(),
}).auth((rules)=> rules.public().read())

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET'),
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules : (rules)=> rules.private()
  }
})
