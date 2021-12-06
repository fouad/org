import { writeFileSync } from 'fs'
import RSS from 'rss'
import { allBlogs } from '.contentlayer/data'

async function generate() {
  const feed = new RSS({
    title: 'Fouad Matin',
    site_url: 'https://fouad.org',
    feed_url: 'https://fouad.org/feed.xml',
  })

  allBlogs.map((post) => {
    feed.item({
      title: post.title,
      url: `https://fouad.org/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.summary,
    })
  })

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
