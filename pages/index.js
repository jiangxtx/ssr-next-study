import Header from '../components/Header'
import Layout from '../components/MyLayout'

import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
  <li>
    <Link
      //as={`/p/${props.id}`}
      //href={`/post?title=${props.title}`}
      href={{pathname: '/post', query: {title: props.title, key: 'js1201'}}}
    >
      <a>{props.title}</a>
    </Link>
  </li>
)

const Index = (props) => (
  <Layout>
    <Head>
      <title>next-js ssr study</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <h1 style={{color: 'red'}}>My Blog locally</h1>
    <ul>
      <PostLink id={"hello-nextjs"} title="Hello Next.js"/>
      <PostLink id={'learn-nextjs'} title="Learn Next.js is awesome"/>
      <PostLink id={'deploy-nextjs'} title="Deploy apps with Zeit"/>
    </ul>

    <h1>Batman TV Shows</h1>
    {
      props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`}
                href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))
    }

    {/*Next.js 提供了的 Built-in-CSS 的特性*/}
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }
      ul {
        padding: 0;
      }
      li {
        list-style: none;
        margin: 5px 0;
      }
      a {
        text-decoration: none;
        color: blue;
      }
      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=batman`)
  // 此处的await不可或缺，否则打印出来的data为Promise
  const data = await res.json()
  console.log('data fetched: ', data)

  return {
    shows: data
  }
}

export default Index
