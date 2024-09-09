import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DisorderDetail.css';
import ocdImage from './../../Assets/ocd.png';
import adhdImage from './../../Assets/adhd.png';
import eatingDisorderImage from './../../Assets/eating_disorder.png';
import depressionImage from './../../Assets/depression.png';

const disordersData = [
    {
        id: 1,
        title: "OCD with Ariel",
        description: "Obsessive compulsive disorder (OCD) usually begins in late childhood or early adolescence...",
        symptoms: [
            "Fear of contamination from germs, dirt, poisons, and other physical and environmental substances.",
            "Fear of harm from illness, accidents or death that may occur to oneself or to others...",
            "Excessive concern with symmetry, exactness, and orderliness.",
            "Needing to know and remember things."
        ],
        benefits: [
            "Perseverance: Individuals with OCD often demonstrate determination and persistence...",
            "Creativity: They channel their obsessive thoughts and compulsions into creative outlets...",
            "Organizational Skills: This can translate into maintaining tidy and orderly spaces...",
            "Attention to Detail: Allowing them to notice things that others might overlook..."
        ],
        imageUrl: ocdImage,
        cartoon: "In The Little Mermaid, Ariel has a cave filled with things she collects from the human world...",
        greeting: "Hello everyone, I’m Ariel, nice to meet you all."
    },
    {
        id: 2,
        title: "ADHD with Tigger",
        description: "People with ADHD have physical characteristics in their brains that lead to symptoms...",
        symptoms: [
            "Difficulty sustaining attention in tasks or play activities.",
            "Often does not seem to listen when spoken to directly.",
            "Frequently makes careless mistakes in schoolwork or other activities.",
            "Has difficulty organizing tasks and activities."
        ],
        benefits: [
            "Energy: Some people living with ADHD liked having more energy than other people...",
            "Self-awareness: The treatment for ADHD often includes therapies that help people learn to manage emotions and behaviors...",
            "Resilience: The ability to bounce back from difficulties (resiliency) is a predictor of success...",
            "Creativity: Research has found that people with ADHD have more creativity and are better at idea generation..."
        ],
        imageUrl: adhdImage,
        cartoon: "In Winnie the Pooh, there's a character known for being lively, intelligent, creative, and sincere...",
        greeting: "Hello friends, I’m Tigger, happy to meet you all."
    },
    {
        id: 3,
        title: "Eating Disorders with Pooh",
        description: "Eating disorders are serious health conditions that affect both your physical and mental health...",
        symptoms: [
            "Unexplained weight loss.",
            "Restricting food intake (type or amount).",
            "Worries or rules around food and eating.",
            "Excessive exercise.",
            "Consuming food secretly.",
            "Going to the bathroom immediately after meals.",
            "Solo dining or not wanting to eat with other people.",
            "Withdrawing from friends or social activities.",
            "Hiding food or throwing it away.",
            "Fixation on food, calories, exercise, or weight loss.",
            "Food rituals (chewing food longer than necessary, eating in secret)."
        ],
        riskFactors: [
            "Family history of eating disorders or other mental health issues, such as depression.",
            "A history of trauma (physical, emotional).",
            "Compulsive disorder (OCD).",
            "History of dieting.",
            "Involvement in activities that focus on a slender appearance, such as gymnastics, swimming, and running.",
            "Major life changes, such as starting a new school.",
            "Perfectionistic tendencies."
        ],
        prevention: [
            "If eating disorders run in your family, being aware of the warning signs is a good first step to catching the problem early.",
            "Prompt treatment can break unhealthy eating patterns before they become harder to overcome.",
            "You can also reduce the risks of an eating disorder by getting treatment for problems like depression, anxiety, and OCD."
        ],
        imageUrl: eatingDisorderImage,
        cartoon: "In Winnie the Pooh, Pooh embodies eating disorders with his love for food, especially honey...",
        greeting: "Hello friends, I’m Pooh, love you all."
    },
    {
        id: 4,
        title: "Depression with Squidward",
        description: "Childhood depression is different from the normal \"blues\" and everyday emotions that children go through...",
        symptoms: [
            "Crankiness or anger.",
            "Continuous feelings of sadness and hopelessness.",
            "Social withdrawal.",
            "Being more sensitive to rejection.",
            "Changes in appetite either increased or decreased.",
            "Changes in sleep (sleeplessness or excessive sleep).",
            "Vocal outbursts or crying.",
            "Trouble concentrating.",
            "Fatigue and low energy.",
            "Physical complaints (such as stomachaches and headaches) that do not respond to treatment.",
            "Trouble during events and activities at home or with friends, in school, during extracurricular activities, and with other hobbies or interests.",
            "Feelings of worthlessness or guilt.",
            "Impaired thinking or concentration.",
            "Thoughts of death or suicide."
        ],
        riskFactors: [
            "Children with a family history of depression are at higher risk of depression.",
            "Children who have parents with depression tend to have their first episode of depression earlier than children whose parents don’t have the condition."
        ],
        imageUrl: depressionImage,
        cartoon: "In SpongeBob SquarePants, Squidward embodies depression with his constant nervousness and anger...",
        greeting: "Hello friends, to One Family."
    }
];

const DisorderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const disorder = disordersData.find(d => d.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!disorder) {
        return <div>Disorder not found</div>;
    }

    const sectionClass = disorder.id === 1 ? 'ariel-section' : disorder.id === 2 ? 'tigger-section' : disorder.id === 3 ? 'pooh-section' : 'squidward-section';

    return (
        <div className="disorder-detail-container container">
            <button onClick={() => navigate(-1)} className="close-button">Close</button>
            <div className="disorder-header">
                <div className="d-flex align-items-center">
                    <img src={disorder.imageUrl} alt={disorder.title} className="disorder-detail-image img-fluid" />
                    <div className="speech-bubble">{disorder.greeting}</div>
                </div>
                <h1>{disorder.title}</h1>
                <p>{disorder.description}</p>
            </div>
            <div className="disorder-content">
                <div className={`section ${sectionClass}`}>
                    <h2>Symptoms</h2>
                    <ul>
                        {disorder.symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                        ))}
                    </ul>
                </div>
                {disorder.benefits && (
                    <div className={`section ${sectionClass}`}>
                        <h2>Benefits</h2>
                        <ul>
                            {disorder.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {disorder.riskFactors && (
                    <div className={`section ${sectionClass}`}>
                        <h2>Risk Factors</h2>
                        <ul>
                            {disorder.riskFactors.map((riskFactor, index) => (
                                <li key={index}>{riskFactor}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {disorder.prevention && (
                    <div className={`section ${sectionClass}`}>
                        <h2>Prevention</h2>
                        <ul>
                            {disorder.prevention.map((prevention, index) => (
                                <li key={index}>{prevention}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className={`section ${sectionClass}`}>
                    <h2>In Cartoons</h2>
                    <p>{disorder.cartoon}</p>
                </div>
            </div>
        </div>
    );
};

export default DisorderDetail;
