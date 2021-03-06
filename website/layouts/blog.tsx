import Image from 'next/image'
import { parseISO, format } from 'date-fns'

import Container from 'components/Container'
import ViewCounter from 'components/ViewCounter'
import type { PropsWithChildren } from 'react'
import type { Blog } from '.contentlayer/types'

const editUrl = (slug) =>
  `https://github.com/fouad/org/edit/main/website/data/blog/${slug}.mdx`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://fouad.org/blog/${slug}`
  )}`

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Blog }>) {
  return (
    <Container
      title={`${post.title} – Fouad Matin`}
      description={post.summary}
      image={`https://fouad.org${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-8">
        <h1 className="font-light text-2xl tracking-tight mb-2 text-black dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Fouad Matin"
              height={20}
              width={20}
              src="/avatar.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-xs text-gray-700 dark:text-gray-300">
              <span className="font-medium">Fouad Matin</span>
              {' on '}
              {format(parseISO(post.publishedAt), 'MMM d, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {children}
        </div>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          <a
            href={discussUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Discuss on Twitter'}
          </a>
          {` • `}
          <a
            href={editUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Edit on GitHub'}
          </a>
        </div>
      </article>
    </Container>
  )
}
