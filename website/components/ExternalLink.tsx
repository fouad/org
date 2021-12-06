import classNames from 'classnames'

export const ExternalLink = ({ className = '', href, children }) => (
  <a
    className={classNames(
      'text-gray-500 hover:text-gray-600 transition',
      className
    )}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
)
