import Link from 'next/link'
import {
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from 'react-icons/ri'

import NowPlaying from 'components/NowPlaying'
import { ExternalLink } from 'components/ExternalLink'
import NowOnline from './NowOnline'

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex items-center space-x-4">
          <ExternalLink href="https://twitter.com/fouadmatin">
            <RiTwitterFill size={24} />
          </ExternalLink>
          <ExternalLink href="https://github.com/fouad">
            <RiGithubFill size={24} />
          </ExternalLink>
          <ExternalLink href="https://instagram.com/fouadmatin">
            <RiInstagramFill size={24} />
          </ExternalLink>
          <ExternalLink href="https://linkedin.com/fouadmatin">
            <RiLinkedinBoxFill size={24} />
          </ExternalLink>
        </div>
      </div>
    </footer>
  )
}
