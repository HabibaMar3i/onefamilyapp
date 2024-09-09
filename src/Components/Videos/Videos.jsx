import React, { useEffect, useState } from 'react';
import './Videos.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal, Button } from 'react-bootstrap';

const videos = [
    {
        id: 1,
        title: "Explaining Autism",
        videoUrl: "https://www.youtube.com/embed/w57LHWxYGck",
        DrName: "By: Dr Israa Rifaat",
        thumbnail: "https://img.youtube.com/vi/w57LHWxYGck/0.jpg", 
    },
    {
        id: 2,
        title: "Positive Parenting Advice for Parents",
        videoUrl: "https://www.youtube.com/embed/sVS_zY35vWc",
        thumbnail: "https://img.youtube.com/vi/sVS_zY35vWc/0.jpg", 
        DrName: "By: Dr Israa Rifaat",
    },
    {
        id: 3,
        title: "Explaining ADHD to children",
        videoUrl: "https://www.youtube.com/embed/UcbZMeNnG7A",
        thumbnail: "https://img.youtube.com/vi/UcbZMeNnG7A/0.jpg"
    },
    {
        id: 4,
        title: "Tigger has ADHD?!",
        videoUrl: "https://www.youtube.com/embed/oyAzC7iHtE4",
        thumbnail: "https://img.youtube.com/vi/oyAzC7iHtE4/0.jpg"
    },
];

const Videos = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const handleShowModal = (videoUrl) => {
        setCurrentVideoUrl(videoUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentVideoUrl('');
    };

    return (
        <div className="video-list-container container my-5">
            <div className="text-center mb-5" data-aos="fade-up">
                <h2 className="custom-heading" data-aos="fade-up">Our Videos</h2>
                <p className="blog-page-description">
                    Explore our collection of videos on therapeutic techniques, speech therapy, and understanding autism. Learn from experts and improve your knowledge.
                </p>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {videos.map((video) => (
                    <div className="col" key={video.id} data-aos="fade-up">
                        <div className="video-card shadow-sm" onClick={() => handleShowModal(video.videoUrl)}>
                            <div className="video-thumbnail-container">
                                <img src={video.thumbnail} alt={video.title} className="video-thumbnail img-fluid" />
                                <div className="play-icon">
                                    <i className="fa fa-play-circle" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="video-card-body">
                                <h5 className="video-card-title">{video.title}</h5>
                                <p className="video-card-dr">{video.DrName}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-fullscreen" centered>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="embed-responsive">
                                <iframe
                                    src={currentVideoUrl}
                                    title="Video"
                                    className="embed-responsive-item"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Videos;
