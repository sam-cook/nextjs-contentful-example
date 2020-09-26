import Link from "next/link";
import contentful from "../../lib/contentful";

function BlogListItem({ entry }) {
  return (
    <li>
      <Link href={`/blog/${entry.fields.slug}`}>
        <a className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                {entry.fields.title}
              </div>
              <div className="mt-2 sm:ml-auto sm:flex sm:justify-between">
                <div className="sm:flex">
                  <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                    {entry.sys.createdAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default function BlogList({ entries }) {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Blog
          </h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul>
            {entries.map((entry) => (
              <BlogListItem key={entry.fields.slug} entry={entry} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const entries = await contentful.getEntries("blogPost");

  return {
    props: {
      entries,
    },
  };
}
