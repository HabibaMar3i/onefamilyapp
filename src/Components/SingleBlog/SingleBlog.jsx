import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import blogs from '../../data/blogsData'; // Import the blog data
import './SingleBlog.css';

const fetchBlog = async (id) => {
    // Simulate a fetch request to get the blog data by ID
    const blog = blogs.find((blog) => blog.id === parseInt(id));
    if (!blog) {
        throw new Error('Blog not found');
    }
    return blog;
};

const SingleBlog = () => {
    const { id } = useParams();
    
    const { data: blog, error } = useQuery(['blog', id], () => fetchBlog(id), {
        cacheTime: 0, // No cache to always fetch new data
    });

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });

        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, [id]); // Re-run when `id` changes

    if (error) {
        return <div>Blog not found</div>;
    }

    return (
        blog && (
            <div className="single-blog-container container">
                <div className="single-blog-header" data-aos="fade-up">
                    <h2 className="custom-heading">{blog.title}</h2>
                    <div className="blog-meta">
                        <span><i className="fas fa-user"></i> {blog.author}</span>
                        <span><i className="fas fa-calendar-alt"></i> {blog.date}</span>
                        <span><i className="fas fa-folder"></i> {blog.category}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 single-blog" data-aos="fade-right">
                        <img src={blog.imageUrl} alt={blog.title} className="single-blog-image img-fluid" />
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                    <div className="col-md-4" data-aos="fade-left">
                        <h3 className='recent-blogs-title'>Recent Blogs</h3>
                        <ul className="recent-blogs-list">
                            {blogs.map((recentBlog) => (
                                recentBlog.id !== blog.id && (
                                    <li key={recentBlog.id}>
                                        <a href={`/bloglist/${recentBlog.id}`}>{recentBlog.title}</a>
                                        <p><i className="fas fa-calendar-alt"></i> {recentBlog.date}</p>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    );
};

export default SingleBlog;

