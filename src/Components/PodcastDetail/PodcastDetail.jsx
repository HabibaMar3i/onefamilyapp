import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './PodcastDetail.css';
import podcastImg1 from './../../Assets/podcasts.png';
import podcastImg2 from './../../Assets/podcasts2.png';
import podcastImg3 from './../../Assets/podcasts3.png';
import podcastImg4 from './../../Assets/podcasts4.png';
import podcastImg5 from './../../Assets/podcasts5.png';
import podcastImg6 from './../../Assets/podcasts6.png';
import podcastImg7 from './../../Assets/podcasts7.png';
import podcastImg8 from './../../Assets/podcasts8.png';

const podcastData = [
    {
        id: 1,
        title: "ADHD Aha!",
        description: "Listen to people share candid stories about the moment it clicked that they, or someone they know, has ADHD. Host Laura Key, who’s had her own ADHD “aha” moment, chats with guests about common topics like ADHD and shame, mental health challenges, and more. Through heartfelt interviews, listeners learn about the unexpected, emotional, and even funny ways ADHD symptoms surface for kids and adults.",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/adhd-aha/id1587179913?i=1000536408513",
            spotify: "https://open.spotify.com/show/6zHwhg9tavgvhlBKhHaEa3",
            youtube: "https://www.youtube.com/playlist?list=PL0Kjy0JtEbaTDhm6Npx4BRKMWkQBKt2kO"
        },
        imageUrl: podcastImg1
    },
    {
        id: 2,
        title: "In It",
        description: "Listen to the joys and frustrations of supporting kids who learn and think differently. Hosts Rachel Bozek and Gretchen Vierstra talk with parents, caregivers, teachers, and sometimes kids, offering support and advice for and from people who struggle with reading, math, focus, and other learning differences.",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/in-it-raising-kids-who-learn-and-think-differently/id1447018742",
            spotify: "https://open.spotify.com/show/6qb0LuxbTPRsQycjfI0fiS?si=P6VxJ34ESvmkvWxUFLOkSQ&dl_branch=1",
            youtube: "https://www.youtube.com/playlist?list=PL0Kjy0JtEbaTrAhKeAIeUYil04Tv9dTY-"
        },
        imageUrl: podcastImg2
    },
    {
        id: 3,
        title: "Understood Explains Season 3",
        description: "Want to know how special education works and get IEP tips for parents? This season of Understood Explains covers the ins and outs of individualized education programs. Host Juliana Urtubey is the 2021 National Teacher of the Year and has helped many families develop IEPs. So you can learn from a pro in this limited-run series. Episodes drop weekly in English and Spanish, starting March 21.",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/understood-explains/id1634250152",
            spotify: "https://open.spotify.com/show/6GHiiunYdoOLAWnTC4CiMh",
            youtube: "https://www.youtube.com/playlist?list=PL0Kjy0JtEbaSwT4PFpqs_qcEtmvvZ7DNh"
        },
        imageUrl: podcastImg3
    },
    {
        id: 4,
        title: "The Opportunity Gap",
        description: "Kids of color who have ADHD and other common learning differences often face a double stigma. But there’s a lot that families can do to address the opportunity gap in our communities. Host Julian Saavedra is a father of two. He's also an assistant principal who has spent nearly 20 years working in public schools. Join Saavedra as he talks with parents and experts and offers tips to help you advocate for your child.",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/the-opportunity-gap/id1594430326",
            spotify: "https://open.spotify.com/show/7cmIGDXDVvd6FWBkRFYFY9",
            youtube: "https://www.youtube.com/playlist?list=PL0Kjy0JtEbaTs3L4hw9BfJQKKSn4uSyJ1"
        },
        imageUrl: podcastImg4
    },
    {
        id: 5,
        title: "Understood Explains Season 1",
        description: "There’s a lot to learn about learning and thinking differences like dyslexia and ADHD. Understood Explains is a podcast that unpacks one important topic each season. Season 1 covers the ins and outs of the process school districts use to evaluate kids for special education services. Host Dr. Andrew Kahn is a psychologist who has spent nearly 20 years evaluating kids for schools. He explains each step of the evaluation process and gives tips on how to talk with your child along the way.",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/understood-explains/id1634250152",
            spotify: "https://open.spotify.com/show/6GHiiunYdoOLAWnTC4CiMh",
            youtube: "https://www.youtube.com/playlist?list=PL0Kjy0JtEbaTaz9xcbXzihEv-_yNiUEoV"
        },
        imageUrl: podcastImg5
    },
    {
        id: 6,
        title: "What Now? Season 1",
        description: "Practical strategies. Expert insights. Bite-size episodes. “What Now? A Parent’s Guide” is a how-to podcast that helps you handle common behavior challenges like a pro. Psychologist Dr. Andrew Kahn hosts Season 1, which looks at tantrums and meltdowns. Each episode takes less than 10 minutes and helps you fit these parenting strategies into your life whenever you need them.",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/what-now-a-parents-guide-to/id1709430434",
            spotify: "https://open.spotify.com/show/3w0EzdxKr4CLOFTZRaZuHH",
            youtube: "https://www.youtube.com/playlist?list=PL0Kjy0JtEbaRfyetTZccPjnup_fGmBiyC"
        },
        imageUrl: podcastImg6
    },
    {
        id: 7,
        title: "How’d You Get THAT Job?!",
        description: "Explore the unique (and often unexpected) career paths of people who learn and think differently. Listen as host Eleni Matheou talks with people about finding a job they love​ — and how it reflects who they are and how they learn.",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/howd-you-get-that-job/id1587179334",
            spotify: "https://open.spotify.com/show/6ZLars1rxYiJT3tAsHRy0h",
            youtube: "https://www.youtube.com/playlist?list=PL0Kjy0JtEbaSI-1einslCUN3zaSHobBOV"
        },
        imageUrl: podcastImg7
    },
    {
        id: 8,
        title: "Understood Explains Season 2",
        description: "There’s a lot to learn about learning and thinking differences like dyslexia and ADHD. Understood Explains is a podcast that unpacks one important topic each season. Season 2 explains ADHD diagnosis in adults. It’s hosted by psychologist Dr. Roberto Olivardia, who answers common questions and shares stories about when he was diagnosed with ADHD as an adult.",
        links: {
            apple: "https://podcasts.apple.com/us/podcast/understood-explains/id1634250152",
            spotify: "https://open.spotify.com/show/6GHiiunYdoOLAWnTC4CiMh",
            youtube: "https://www.youtube.com/playlist?list=PL0Kjy0JtEbaTXq-qxVnCgTqp-HsenBM6D"
        },
        imageUrl: podcastImg8
    }
];

const fetchPodcast = async (id) => {
    const podcast = podcastData.find(p => p.id === parseInt(id));
    if (!podcast) {
        throw new Error('Podcast not found');
    }
    return podcast;
};

const PodcastDetail = () => {
    const { id } = useParams();
    
    const { data: podcast, error } = useQuery(['podcast', id], () => fetchPodcast(id), {
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
        return <div className="text-white">Podcast not found</div>;
    }

    return (
        podcast && (
            <div className="podcast-detail-container container">
                <div className="podcast-detail-content row">
                    <div className="col-md-6">
                        <img src={podcast.imageUrl} alt={podcast.title} className="podcast-detail-image img-fluid rounded" />
                    </div>
                    <div className="col-md-6 podcast-detail-info">
                        <h1 className="podcast-detail-title">{podcast.title}</h1>
                        <p className="podcast-detail-description">{podcast.description}</p>
                        <h2 className="listen-subscribe">Listen & Subscribe</h2>
                        <div className="podcast-detail-links">
                            <a href={podcast.links.apple} className="btn btn-outline-light podcast-link me-2">Apple Podcasts</a>
                            <a href={podcast.links.spotify} className="btn btn-outline-light podcast-link me-2">Spotify</a>
                            <a href={podcast.links.youtube} className="btn btn-outline-light podcast-link">YouTube</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default PodcastDetail;
