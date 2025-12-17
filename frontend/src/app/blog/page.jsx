// import BlogScreen from '@/screens/BlogScreen';
import { Metadata } from 'next';
import BlogScreen from '../screens/BlogScreen';
// import BlogScreen from '@/components/Screen/BlogScreen';

export const metadata = {
  title: 'Blog - KEC Biofuel | Latest Insights on CBG & Renewable Energy',
  description: 'Explore expert articles on Compressed Biogas (CBG), biofuel innovations, sustainable agriculture, and India\'s clean energy revolution. Stay updated with KEC Biofuel\'s latest insights.',
  keywords: 'CBG blog, biofuel articles, renewable energy insights, sustainable agriculture, green energy India, KEC Biofuel',
  openGraph: {
    title: 'KEC Biofuel Blog - Renewable Energy Insights',
    description: 'Expert perspectives on CBG production, biofuel technology, and sustainable energy solutions.',
    type: 'website',
    url: 'https://www.kecbiofuel.com/blog',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'KEC Biofuel Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KEC Biofuel Blog - Renewable Energy Insights',
    description: 'Expert perspectives on CBG production, biofuel technology, and sustainable energy solutions.',
    images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop']
  }
};

export default function BlogPage() {
  return <BlogScreen />;
}
