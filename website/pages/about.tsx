import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

import Container from 'components/Container'
import { ExternalLink } from 'components/ExternalLink'
import React, { Fragment, ReactNode } from 'react'

export default function About() {
  return (
    <Container title="About – Fouad Matin">
      <div className="flex flex-col justify-center items-start max-w-2xl w-full mx-auto mb-8">
        <h1 className="font-light text-2xl tracking-tight text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose leading-8 md:leading-snug text-xl md:text-3xl font-light text-gray-800 dark:text-gray-400">
          <p>
            Hi there, I’m Fouad. I’m the CEO of Indent, we build security
            products that help companies access to customer data under control.
          </p>
          <p>
            Growing up in Virginia, right outside of DC, I gained a distinct
            appreciation for how the decisions of a few individuals play an
            out-sized role in everyday life … at least that’s the excuse I use
            to justify the amount of news I consume.
          </p>
          <p>
            I tend to spend my free time cooking, reading, and appreciating
            life. If there&rsquo;s something you think I can help with, please
            feel free to reach out.
          </p>
        </div>
        <h2
          id="work"
          className="mt-6 font-light text-2xl mb-4 text-black dark:text-white"
        >
          Work
        </h2>
        <ExpandableItemList items={workHistory} />
        <h2
          id="investments"
          className="mt-8 font-light text-2xl mb-4 text-black dark:text-white"
        >
          Investments
        </h2>
        <ExpandableItemList items={investments} />
      </div>
    </Container>
  )
}

const investments: ExpandableItem[] = [
  {
    title: 'Ambrook',
    rounds: ['Pre-seed'],
    href: 'https://ambrook.com',
    desc: 'Simple finances for the modern farm',
    expanded: `To be announced`,
  },
  {
    title: 'Capway',
    rounds: ['Seed'],
    href: 'https://capway.com',
    desc: 'Banking for the unbanked',
    expanded: `To be announced`,
  },
  {
    title: 'Context',
    rounds: ['Seed'],
    href: 'https://context.app',
    desc: "See what's happening on web3",
    expanded: `To be announced`,
  },
  {
    title: 'ContainIQ',
    rounds: ['Seed'],
    href: 'https://containiq.com',
    desc: 'Instant Kubernetes monitoring',
    expanded: `To be announced`,
  },
  {
    title: 'Fabric',
    rounds: ['Pre-seed'],
    href: 'https://tryfabric.com',
    desc: 'Slack-based issue tracking for software teams',
    expanded: `To be announced`,
  },
  {
    title: 'Laudable',
    rounds: ['Seed'],
    href: 'https://laudable.com',
    desc: 'Bring customer testimonials to life',
    expanded: `To be announced`,
  },
  {
    title: 'Otter',
    rounds: ['Pre-seed'],
    href: 'https://withotter.com',
    desc: 'Childcare that feels like family',
  },
  {
    title: 'Stealth Climate Company',
    rounds: ['Seed'],
    desc: `It's time to grow a lot more trees`,
  },
]

const workHistory: ExpandableItem[] = [
  {
    title: 'Indent · Co-founder + CEO',
    dates: ['March 2018', 'Present'],
    desc: 'Building the future of security',
    expanded: (
      <>
        We started Indent because we saw that most companies didn't know who had
        access to customer data, and the cost of finding out was too high for
        most of them, let alone locking it down. Indent provides user-friendly
        access control for everyone.
        <br />
        <br />
        Also, we&rsquo;re hiring!{' '}
        <ExternalLink className="underline" href="https://indent.com/jobs">
          indent.com/jobs
        </ExternalLink>
      </>
    ),
  },
  {
    title: 'Segment · Engineer',
    dates: ['November 2016', 'November 2017'],
    desc: 'Building the future of security',
    expanded: `Led the product and engineering development for Segment Personas, enabling customers to resolve user actions into profiles.`,
  },
  {
    title: 'VotePlz · Co-founder',
    dates: ['August 2016', 'November 2016'],
    desc: 'We helped one million people vote',
    expanded: `Started a nonpartisan nonprofit focused on building the easiest way for young people to register and get out to vote. Helped 1 million people vote in 2016.`,
  },
  {
    title: 'StrongIntro · Co-founder + CEO',
    dates: ['December 2014', 'August 2016'],
    desc: 'We helped one million people vote',
    expanded: `Started a referral recruiting company and ran product, sales and engineering. Went through the inaugural Y Combinator Fellowship program and YC W16.`,
  },
]

type ExpandableItem = {
  title: string
  desc: string

  href?: string
  expanded?: string | ReactNode
  rounds?: string[]
  dates?: string[]
}

function ExpandableItemList({ items = workHistory }) {
  const Inner = ({ item, children }) => {
    const Component = item.href ? ExternalLink : Fragment
    const props: any = { children }
    if (item.href) {
      props.href = item.href
    }
    return <Component {...props} />
  }

  return (
    <dl className="w-full divide-y divide-gray-200 dark:divide-gray-600">
      {items.map((item) => (
        <Disclosure as="div" key={item.title} className="py-3">
          {({ open }) => (
            <>
              <dt className="text-lg">
                <Disclosure.Button className="group cursor-pointer text-left w-full flex justify-start items-start text-gray-400">
                  {isExpandable(item) && (
                    <span className="mr-4 h-7 flex items-center">
                      <ChevronDownIcon
                        className={classNames(
                          open ? 'rotate-0' : '-rotate-90',
                          'h-4 w-4 transform'
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  )}
                  <Inner item={item}>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">
                        <span className="group-hover:underline">
                          {item.title}
                        </span>
                        {item.href && (
                          <span className="ml-2 inline-block transform -rotate-45 font-light">
                            &rarr;
                          </span>
                        )}
                        {(item.rounds || item.dates) && (
                          <span className="block sm:inline-block sm:ml-2 text-sm font-normal text-gray-400">
                            {(item.rounds || item.dates).map((r, i) => (
                              <span key={r} className="whitespace-nowrap">
                                {r}
                                {i !==
                                  (item.rounds || item.dates).length - 1 && (
                                  <> &rarr; </>
                                )}
                              </span>
                            ))}
                          </span>
                        )}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.desc}
                      </span>
                    </div>
                  </Inner>
                </Disclosure.Button>
              </dt>
              {isExpandable(item) && (
                <Disclosure.Panel as="dd" className="mt-2 pl-8">
                  <p className="text-base text-gray-500">{item.expanded}</p>
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </dl>
  )
}

function isExpandable(item: ExpandableItem): boolean {
  return item.expanded && item.expanded !== 'To be announced'
}
