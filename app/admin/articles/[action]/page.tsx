'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/data-context';
import { Article, Category } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import { slugify } from '@/utils/helpers';

export default function ArticleForm({ article }: { article?: Article }) {
  const router = useRouter();
  const { categories, addArticle, updateArticle } = useData();
  const isEditing = !!article;

  // Form state
  const [title, setTitle] = useState(article?.title || '');
  const [content, setContent] = useState(article?.content || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [author, setAuthor] = useState(article?.author || '');
  const [featuredImage, setFeaturedImage] = useState(article?.featuredImage || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(article?.categories || []);
  const [tags, setTags] = useState(article?.tags?.join(', ') || '');
  const [isFeatured, setIsFeatured] = useState(article?.isFeatured || false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate excerpt from content if not provided
  useEffect(() => {
    if (!excerpt && content) {
      const generatedExcerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');
      setExcerpt(generatedExcerpt);
    }
  }, [content, excerpt]);

  // Handle category selection
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    if (!featuredImage.trim()) newErrors.featuredImage = 'Featured image URL is required';
    if (selectedCategories.length === 0) newErrors.categories = 'At least one category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const formattedTags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const articleData: Article = {
        id: article?.id || `article-${Date.now()}`,
        title,
        slug: article?.slug || slugify(title),
        content,
        excerpt,
        featuredImage,
        author,
        publishDate: article?.publishDate || new Date().toISOString(),
        categories: selectedCategories,
        tags: formattedTags,
        isFeatured,
        viewCount: article?.viewCount || 0,
      };
      
      if (isEditing) {
        updateArticle(articleData);
      } else {
        addArticle(articleData);
      }
      
      router.push('/admin/articles');
    } catch (error) {
      console.error('Error saving article:', error);
      setErrors({ submit: 'Failed to save article. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Article' : 'Create New Article'}</h1>
          <button
            onClick={() => router.push('/admin/articles')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium"
          >
            Cancel
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          
          {/* Featured Image */}
          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image URL *
            </label>
            <input
              id="featuredImage"
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.featuredImage ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.featuredImage && <p className="mt-1 text-sm text-red-600">{errors.featuredImage}</p>}
          </div>
          
          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
          </div>
          
          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt (auto-generated if left empty)
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
          </div>
          
          {/* Categories */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Categories *
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {categories.map((category: Category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    id={`category-${category.id}`}
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
          </div>
          
          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="tag1, tag2, tag3"
            />
          </div>
          
          {/* Featured */}
          <div className="flex items-center">
            <input
              id="isFeatured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
              Feature this article on homepage
            </label>
          </div>
          
          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
              {errors.submit}
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-6 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
