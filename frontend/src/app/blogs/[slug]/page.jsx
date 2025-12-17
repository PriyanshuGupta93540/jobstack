import { notFound } from 'next/navigation';
import { getBlogBySlug, getRelatedBlogs } from '../../data/blogData';
import BlogDetailScreen from '../../screens/BlogDetailScreen';

export async function generateMetadata({ params }) {
  // Await params in Next.js 15
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${blog.title} | KEC Biofuel Blog`,
    description: blog.excerpt,
    keywords: `${blog.category}, CBG, biofuel, renewable energy, ${blog.title}`,
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      url: `https://www.kecbiofuel.com/blogs/${blog.slug}`,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
      creator: '@KEC_Biofuel',
    },
  };
}

export default async function BlogDetailPage({ params }) {
  // Await params in Next.js 15
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);
  
  if (!blog) {
    notFound();
  }
  
  const relatedBlogs = getRelatedBlogs(blog.id);
  
  return <BlogDetailScreen blog={blog} relatedBlogs={relatedBlogs} />;
}