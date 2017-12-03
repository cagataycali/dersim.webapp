import Head from 'next/head'
import Navbar from './Navbar'

export default ({ children, title = 'Ders.im' }) => (
  <div>
    <Head>
      <title>{ title }</title>
    </Head>
    <header>
      <nav>
        <Navbar />
      </nav>
    </header>

    { children }
  </div>
)
