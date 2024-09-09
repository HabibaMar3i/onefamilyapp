import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import blogs from '../../data/blogsData'; // Import the blog data
import './BlogList.css';

const BlogList = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    return (
        <div className="blog-list-container container my-5">
            <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="custom-heading" data-aos="fade-up">Our Blog</h2>
                <p className="blog-page-description">
                    Explore our latest articles and insights on child therapy, therapeutic play techniques, and more. Stay informed with tips and guides from our experts.
                </p>
            </div>
            <div className="row">
                {blogs.map((blog) => (
                    <div key={blog.id} className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay={blog.id * 100}>
                        <div className="blog-card">
                            <div className="blog-image-container">
                                <img src={blog.imageUrl} alt={blog.title} className="blog-image img-fluid" />
                                <span className="blog-category">{blog.category}</span>
                            </div>
                            <div className="blog-info">
                                <h5>{blog.title}</h5>
                                <p>{blog.content.substring(0, 80).replace(/<[^>]+>/g, "")}...</p> {/* Display a snippet of the content without HTML tags */}
                                <Link to={`/bloglist/${blog.id}`} className="read-more">Read More ➔</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
