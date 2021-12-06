import Image from 'next/image'

import Container from '../components/Container'

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-8">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-light text-2xl tracking-tight mb-1 text-black dark:text-white">
              Fouad Matin
            </h1>
            <h2 className="my-4 text-gray-700 dark:text-gray-200">
              <a className="text-blue-600" href="https://indent.com">
                <span className="font-semibold">Indent</span>
              </a>{' '}
              CEO
            </h2>
            <p className="leading-8 md:leading-snug text-gray-800 text-xl md:text-3xl font-light dark:text-gray-400 mb-4">
              I'm a software engineer, product designer, and investor. Over the
              last few years, I've worked to help a few million people vote and
              companies to manage their customer data.
            </p>
            <p className="leading-8 md:leading-snug text-gray-800 text-xl md:text-3xl font-light dark:text-gray-400 mb-4">
              Now, I run a security company called:{' '}
              <a
                className="text-blue-600 font-medium underline"
                href="https://indent.com"
              >
                Indent
              </a>
            </p>
            <p className="leading-8 md:leading-snug text-gray-800 text-xl md:text-3xl font-light dark:text-gray-400">
              Our goal is to prevent the next major data breach from
              unauthorized access.
            </p>
          </div>
          <div className="w-[80px] sm:w-[176px] relative mb-8 ml-auto sm:ml-0 sm:mb-0 mr-auto">
            <div className="w-20 h-20 rounded-full shadow-rainbow overflow-hidden">
              <Image
                alt="Fouad Matin"
                height={176}
                width={176}
                src="/avatar.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
