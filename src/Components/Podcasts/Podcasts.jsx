import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Podcasts.css';
import podcastImg1 from './../../Assets/podcasts.png';
import podcastImg2 from './../../Assets/podcasts2.png';
import podcastImg3 from './../../Assets/podcasts3.png';
import podcastImg4 from './../../Assets/podcasts4.png';
import podcastImg5 from './../../Assets/podcasts5.png';
import podcastImg6 from './../../Assets/podcasts6.png';
import podcastImg7 from './../../Assets/podcasts7.png';
import podcastImg8 from './../../Assets/podcasts8.png';

const podcasts = [
    { id: 1, title: "ADHD Aha!", episodes: 75, description: "Listen to people share candid stories about the moment it clicked that they, or someone they know, has ADHD...", imageUrl: podcastImg1 },
    { id: 2, title: "In It", episodes: 79, description: "Listen to the joys and frustrations of supporting kids who learn and think differently...", imageUrl: podcastImg2 },
    { id: 3, title: "Understood Explains Season 3", episodes: 12, description: "Want to know how special education works and get IEP tips for parents?", imageUrl: podcastImg3 },
    { id: 4, title: "The Opportunity Gap", episodes: 44, description: "Kids of color who have ADHD and other common learning differences often face a double stigma...", imageUrl: podcastImg4 },
    { id: 5, title: "Understood Explains Season 1", episodes: 12, description: "There’s a lot to learn about learning and thinking differences like dyslexia and ADHD...", imageUrl: podcastImg5 },
    { id: 6, title: "What Now? Season 1", episodes: 9, description: "Practical strategies. Expert insights. Bite-size episodes...", imageUrl: podcastImg6 },
    { id: 7, title: "How’d You Get THAT Job?!", episodes: 51, description: "Explore the unique (and often unexpected) career paths of people who learn and think differently...", imageUrl: podcastImg7 },
    { id: 8, title: "Understood Explains Season 2", episodes: 10, description: "There’s a lot to learn about learning and thinking differences like dyslexia and ADHD...", imageUrl: podcastImg8 }
];

const Podcasts = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    return (
        <div className="container podcast-grid my-5">
            <div className="header">
            <h1 className="custom-heading podcast-title" data-aos="fade-up">Our Podcasts</h1>
                <p className="blog-page-description" data-aos="fade-up" data-aos-delay="200">
                    Real talk and personal stories for and from people who learn and think differently.
                    Our podcasts bring new voices and perspectives you won’t hear anywhere else. Dive into
                    candid conversations on the topics that interest you.
                </p>
            </div>
            <div className="row">
                {podcasts.map((podcast) => (
                    <div key={podcast.id} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={podcast.id * 100}>
                        <Link to={`/podcast/${podcast.id}`} className="podcast-link">
                            <div className="podcast-item">
                                <img src={podcast.imageUrl} className="podcast-image" alt={podcast.title} />
                                <div className="podcast-info">
                                    <h5 className="podcast-title">{podcast.title}</h5>
                                    <p className="podcast-episodes">{podcast.episodes} episodes</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Podcasts;
