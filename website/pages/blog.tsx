import { useState } from 'react'

import Container from 'components/Container'
import BlogPost from 'components/BlogPost'
import { InferGetStaticPropsType } from 'next'
import { pick } from 'lib/utils'
import { allBlogs } from '.contentlayer/data'

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    )

  return (
    <Container
      title="Blog – Fouad Matin"
      description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
    >
      <div className="w-full flex flex-col items-start justify-center max-w-2xl mx-auto">
        <h1 className="font-light text-2xl tracking-tight mb-4 text-black dark:text-white">
          Blog
        </h1>
        <div className="relative w-full mb-8">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  )
}

export function getStaticProps() {
  const posts = allBlogs.map((post) =>
    pick(post, ['slug', 'title', 'summary', 'publishedAt'])
  )

  return { props: { posts } }
}
