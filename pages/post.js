import Layout from '../components/MyLayout'

import Link from 'next/link'

const Post = (props) => (
  <Layout>
    <h1>{props.url.query.title}</h1>
    <p>This is the blog post content...</p>
  </Layout>
)

export default Post
