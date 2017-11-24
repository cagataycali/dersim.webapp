import React from 'react'
import Layout from '../components/layout'

export default class extends React.Component {
  static async getInitialProps ({ query, res }) {
    return { slug: query.slug }
  }

  render () {
    const { slug } = this.props

    return (
      <Layout title={`Ders.im | ${slug}`}>
        {slug}
      </Layout>
    )
  }
}
