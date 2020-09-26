import Head from "next/head";
import contentful from "../../lib/contentful";

function BlogPost({ entry }) {
  if (!entry) return <p>Loading...</p>;
  return (
    <div>
      <Head>
        <title>Blog - {entry.title}</title>
      </Head>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {entry.title}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div dangerouslySetInnerHTML={{ __html: entry.body }} />
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const entry = await contentful.getEntry("blogPost", slug);

  return {
    props: {
      entry,
    },
  };
}

export async function getStaticPaths() {
  const allBlogPosts = await contentful.getEntries("blogPost");

  return {
    paths: allBlogPosts.map((post) => ({ params: { slug: post.fields.slug } })),
    fallback: false,
  };
}

export default BlogPost;
