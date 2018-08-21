import Header from './Header'
import Head from "next/head";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Head>
      <title>Detail: next-js ssr study</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <img className='img-logo' src="/static/my-beloved-girl.jpg" alt="我喜爱的小女孩"/>
    <Header/>
    {props.children}
    <style jsx>{`
      .img-logo {
        height: 60px;
      }
    `}</style>
  </div>
)

export default Layout
