import blogImg1 from './../Assets/blog1.jpg';
import pregnancyCover from './../Assets/pregnancycover.jpg';
import pregnancy1 from './../Assets/pregnancy1.jpg';
import depressionCover from './../Assets/depressioncover.jpg';
import depression1 from './../Assets/depression1.jpg';
import depression2 from './../Assets/depression2.jpg';
import practiciesCover from './../Assets/7practicescover.jpg';
import practiciesend from './../Assets/7practicesend.jpg';
import takecarebabycover from './../Assets/takecarebabycover.jpg';
import swaddling from './../Assets/takecarebaby-swaddle.jpg';
import crying from './../Assets/takecarebaby-crying.jpg';
import strongrpcover from './../Assets/strongrpcover.jpg';
import strongrpmiddle from './../Assets/strongrpmiddle.jpg';
import mythscover from './../Assets/Busting 5 Myths About Autism Autism affects only children.jpg'
import myths1 from './../Assets/Busting 5 Myths About Autism Myth 1 .jpg'
import myths5 from './../Assets/Busting 5 Myths About Autism Myth 5.jpg'
import autismcover from './../Assets/autismcover.jpeg'
import autismsigns from './../Assets/autismsigns.jpg'
import autismspectrum from './../Assets/aytismspectrum.png.jpeg'


const blogs = [
    {
        id: 1,
        title: "Guidelines for strong Parent-Child relationship",
        content: `
        <h2>Understand Your Responsibilities as a Parent</h2>
        <p>Parents must prepare their child to become an independent, fully functioning adult by being a guide, mentor, and a friend. The parent must understand the child’s needs and act according to them without forcing their choices and needs onto them.</p>

        <h2>Respect Each Other’s Boundaries</h2>
        <p>It is important for parents to allow their child to have increasingly more privacy and autonomy. Allow the child to explore around, guide wherever needed, and encourage them to learn from their experiences. Restricting them from exploring might affect their confidence level, and the child might become dependent on parents to face new situations.</p>

        <h2>Listen Carefully</h2>
        <p>All human beings want to be listened to and heard, and children are no exception. Some issues that might seem like a small issue to adults could be a big deal to kids. Parents should learn listening skills that will help them understand the emotions their child may be trying to convey in conversations.</p>
        <img src="${strongrpmiddle}" alt="Pregnancy">

        <h2>Spend Time Together and Laugh</h2>
        <p>Sharing some good time with your kids creates the feeling of togetherness, makes them feel happy, and reduces stress for you.</p>

        <h2>Express Feelings to Each Other</h2>
        <p>Everyone needs appreciation and affection. Make an effort to point out the good qualities of the child and make them feel good about it.</p>

        <h2>Remain Calm During Stress</h2>
        <p>Nothing gets resolved during stressful times; instead, one might express negative feelings onto the wrong target. Try to relax and take some time off before interacting with loved ones.</p>
        `,
        category: "Tips",
        imageUrl: strongrpcover,
        date: "August 2, 2023",
        author: "Jane Doe"
    },
    {
        id: 2,
        title: "How to Take Care of Your Baby Properly",
        content: `
        <h2>Swaddling</h2>
        <p>Swaddling your baby helps your baby feel warm and secure like in the womb. Lay the blanket in a diamond shape. Fold the top point inwards. Lay your baby down on its back on the blanket with his head just a bit above the folded point. Take one of the side points across the baby’s chest and tuck it under his thighs. Bring the bottom point over the baby’s feet. And follow through with the last point of the blanket across the baby’s chest and tuck it also under the opposite thigh.</p>
        <img src="${swaddling}" alt="Pregnancy">


        <h2>Dressing Your Baby</h2>
        <p>Wash all clothes, blankets, and linens before using them the first time. Always use a mild detergent to protect your child from skin allergies and rashes. When selecting clothes for your baby, realize that they will be repeatedly soiled and must undergo many washes. Check for sturdy zippers and well-stitched seams. The inside seams should be soft and not rough and itchy. Bunch up shirts before pulling them over your baby’s head. Look for shirts with side or front openings, shoulder buttons, and stretchable necklines. Clothes should be comfortable and loose. Purchase a few inexpensive and durable clothes for sizes 0—3 months as babies will outgrow them very quickly.</p>

        <h2>Dental Hygiene</h2>
        <p>After the first tooth erupts, pay extra care to dental hygiene. Family history of gum problems and cavities should always be kept in mind. Schedule a visit for the baby between 6—12 months of age and then follow up regularly. Do not allow the child to go to bed with a bottle containing anything other than water. Check with the dentist on what toothpaste can be used.</p>

        <h2>Crying</h2>
        <p>Crying is your baby’s way to communicate a whole range of needs and responses. It is also a way to relieve tension and stress. Sometimes going to a quiet place really helps. Hunger, in the early days and weeks of life, is the most prominent reason for crying. Wet diapers are another big cause as they make your baby very uncomfortable. Disposable diapers feel heavy and warm when wet. Illness can be another reason for crying. If a baby is crying too much, contact your pediatrician. Gas can be yet another reason. Newborns need to be burped often. Rub your baby’s back gently or move your baby’s legs back and forth towards the chest in a cyclic motion to relieve gas pains. It might get frustrating or anger you trying to constantly comfort your baby if he is fussy or not responding to your efforts. It is completely alright to be frustrated or angry and you needn’t be hard on yourself. Get someone to help if possible. Never shake a baby or throw them up into the air. The rapid movement causes severe whiplashes around the spinal column, neck, or head. The younger the child, the more serious the danger. Avoid raising your hand on children of any age in any way and learn to control your temper and stress and release it in a more mature way.</p>
        <img src="${crying}" alt="Pregnancy">


        <h2>Colic</h2>
        <p>Babies with colic cry frequently and may twist their face in pain and draw their knees up to the abdomen and pass gas. They usually feed well and gain weight normally, but soothing colicky babies is difficult. Check with the pediatrician to rule out any issues. Cuddle your baby, gently rock or place your baby on your knees to try and soothe. Warm water bottles on the abdomen also help to an extent. After feeding your baby, carry him around on your shoulder and gently rub his back to relieve any gas.</p>

        <h2>Bathing Your Baby</h2>
        <p>Babies needn’t be bathed every day; every alternate day works just fine. Use a sponge to gently bathe the face and hands every day. Never leave your baby alone while bathing him. Use mild soap always and ensure that the bathwater is lukewarm and never too hot. A way of testing is to dip your little finger to check the heat.</p>

        <h2>Postpartum Adjustments</h2>
        <p>Mothers need a good amount of rest after delivery. Those who have undergone C-sections need even more recovery time. Parents need to go the extra mile to support each other in their new roles. The biggest change that comes over is the relationship between spouses. As parents, you also need to spend time away from the baby and with each other to understand yourself and relax. Divide duties between yourselves and don’t place the entire onus on just the mother. Take time out with your partner, enjoy an evening out for a few hours with friends, call relatives over, etc.</p>

        <h2>Gender Roles</h2>
        <p>For women, avoid roles dictated to you by the media and society and create a balance that benefits you as well as your family. Do not try to be perfect or be hard on yourself. Small compromises here and there are completely fine. A father needs to be present as much for his wife as for his baby. Parenting is a combined role, never just a mother’s job.</p>
        `,
        category: "Insight",
        imageUrl: takecarebabycover,
        date: "August 2, 2023",
        author: "John Smith"
    },
    {
        id: 3,
        title: "7 Practices of Highly Effective Parents",
        content: `
        <p>We adore our children and want the very best for them. However, are we taking the right actions toward that very best? Most of us know that children learn or are shaped by what we do, not what we say. However, not many know the implication of these words on our very own lives. At this moment, let’s take a glance at the way we are shaping our children with our “actions” or “non-actions”.</p>

        <h2>Coming Home Tired</h2>
        <p>Most of us come home from work tired. Let’s accept it. Day by day we are getting home from work more tired. It’s as if we have been rolling mountains the whole day. The only thing we wish to do back home is to relax. Children are extremely instinctual. They read you more from your body language than from your words. So, they interpret that work of any sort is something that gets you tired and sulky. From a very young age, they develop an aversion to working. They think that life is great when they do not work and just have fun in some way or the other. They are getting a message that work is not fun.</p>

        <h2>Wearing Masks</h2>
        <p>We seem happy when we communicate over the phone or with friends. We humans, being highly evolved beings, have learned the art of pretending. Whatever our energy level and mental state is, suddenly, we sound happy and excited when we are speaking over the phone or with an outsider. These masks we wear, in our definition, might be the social face which we ought to hold for a successful living, looks like a puzzle to our little ones. They get an impression that the phone is that magic device that makes you happy, and also you are to be relaxed and happy with friends, but grim and uptight with family. We are teaching them to wear masks.</p>

        <h2>Television Addiction</h2>
        <p>We install ourselves in front of the television at the first opportunity. Any child, you might have observed, has a very high energy level. He/she wants to play all the time. We do not realize that it is the work they are doing. They are born with a tendency to work passionately. As they grow up, they come across role models whose keenness at home is to catch up with something or the other on television. On top of it, they also see their father and mother criticizing each other for their choice of program to watch. Eventually, children learn to choose that show, which closely portrays what they want to do, and fall in line with the competition within the family. We are teaching them that pleasure is to be gained through senses, not by action.</p>

        <h2>Dislike for Work</h2>
        <p>We are too tired for real action; we dislike our work. Most of us lead a life where we imagine or watch what we want to do and work only for the sake of money, time passing, or status. Our attitude portrays work to be a very distant ally. We are not in a state to talk passionately about work to our children. On the other hand, we cannot even sit for a minute without filling our time. Our children grow up watching us mostly disinterested in any sort of physical action. Just think about the number of fathers or mothers who go out and play while their children watch them, the number of parents who actively play at least an hour with their children, the number of parents who take their children to their workplace and explain how fabulous it is to work. Our children are left with no choice but to play on the computer or phone imitating their parent’s obsession with the phone or computer. We are taking them towards non-action.</p>

        <h2>Technology Over Intimacy</h2>
        <p>We are connected more through technology than intimacy. Technology, with its huge advance, has brought the whole world together. Now we receive appreciation and attention from people we barely know through several ways, which is highly addictive, though superficial. We beam to see 100+ likes on a picture posted on Facebook over a genuine appreciation from the partner. Now we have started to live for the sake of that wide range of appreciation over the joy from the depth of appreciation. This depth can be felt when we can sense the presence of another person wholly with us, moment to moment, sharing not only our outstanding experiences but also creating intense moments together. In any experience, whether it’s a small discussion with family or quality time vacationing, the depth of experiencing depends on the focus. Right now, our focus is not on the task at hand but on capturing the task for appreciation from some faceless friends on social media. We are teaching our children to live an empty life right from the beginning.</p>

        <h2>Lack of Intense Connections with Partner</h2>
        <p>We do not try to establish intense connections with our partner. Most of us eventually take our partner for granted and communicate only about some facts or about a decision to be made. A child keenly watches the way parents interact. It is highly rewarding to watch parents who care for each other, understand each other, and truly connect. A child learns its interaction style and emotional expression by observing parents. Now, to a child, home looks like a place where people collect nice stuff, watch television, eat, blame people, discuss some anxiety-arousing topics occasionally, and relax as much as possible, not with each other. Home, where children are supposed to learn to work, to love, to communicate, to resolve an issue, is slowly becoming a place where one learns to pretend more. We aren't teaching our children to establish true and genuine connections.</p>

        <p>We all love our children and wish for a fulfilling life for them. However, let us remember that our children can have a fulfilling life only if they find us leading one. Anything is possible if we truly intend to and start acting towards it. We need to lead our children by example. Let us reflect on our lives and create the very life we wish for our children, from this very moment.</p>
        <img src="${practiciesend}" alt="Pregnancy">

        `,
        category: "Tips",
        imageUrl: practiciesCover,
        date: "August 15, 2023",
        author: "Jane Doe"
    },
    {
        id: 4,
        title: "How To Deal with Post-Pregnancy Depression",
        content: `
        <p>Motherhood is one of the most cherished phases in any woman's life. It brings about various changes physically, emotionally, and socially in a mother's life. It may require many adjustments especially if it is the first time. At times the onset of psychiatric illness at such a juncture in time may be missed. It is important that we are aware of such psychiatric disorders as they concern both mother & newborn baby. Very young infants can be affected by and are highly sensitive to the environment and the quality of care. Prolonged or severe psychiatric illness affects the mother-infant attachment, breastfeeding, and infant care. WHO states that in developing countries mental health issues might be seen in 15.6% during pregnancy and 19.8% after childbirth.</p>
    
        <img src="${pregnancy1}" alt="Pregnancy">
    
        <h2>Psychological issues seen around delivery time</h2>
        <ul>
            <li><strong>Before delivery:</strong> Anxiety related to pregnancy & delivery, pre-existing mood or anxiety or psychosis, the onset of a new psychiatric disorder during pregnancy.</li>
            <li><strong>After delivery:</strong> Baby blues (most common), Postpartum depression, Postpartum psychosis</li>
        </ul>
    
        <h2>Risk factors</h2>
        <ol>
            <li>First time as a mother</li>
            <li>Young age</li>
            <li>Family history of psychiatric illness</li>
            <li>Previous history of postpartum illnesses or other psychiatric illnesses in mother</li>
            <li>Environment</li>
            <li>Stressful pregnancy or delivery related to mother</li>
            <li>Stressful events after delivery related to a newborn baby</li>
            <li>Poor family support</li>
        </ol>
    
        <h2>Maternal mental health issues</h2>
        <h3>1) Baby Blues</h3>
        <ul>
            <li>Most common (50 to 80% postnatal women)</li>
            <li>Mood swings (crying spells, Irritability)</li>
            <li>Inability to sleep.</li>
            <li>Confusion</li>
            <li>Anxiety (heartbeat racing, shaking, sweating, dry mouth, constant worrying)</li>
            <li>Starts within a few days of delivery and resolves with good rest and sleep, adequate family and/or spouse support and counselling.</li>
            <li>Milder than Postpartum depression rarely may exceed more than 15 days.</li>
        </ul>
    
        <h3>2) Anxiety in Puerperium</h3>
        <ul>
            <li>Constant worrying about the baby.</li>
            <li>Constantly checking on the baby</li>
            <li>Fear of cot death</li>
            <li>Staying awake & hypervigilant through the night</li>
            <li>Insomnia</li>
            <li>Also called maternity neurosis</li>
        </ul>
    
        <h3>3) Postpartum Depression</h3>
        <ul>
            <li>Starts within 2 weeks to 3 months post-delivery.</li>
            <li>Seen in 10-15% of postnatal women.</li>
            <li>Constant low and sad mood</li>
            <li>Poor energy levels</li>
            <li>Decreased physical activity.</li>
            <li>Negative thinking about child & his/her wellbeing</li>
            <li>Suicidal ideation</li>
            <li>Poor interest in previously pleasurable activities</li>
            <li>Disturbed sleep & appetite</li>
            <li>Repetitive guilty thoughts regarding parenting techniques and caring for the baby.</li>
        </ul>
    
        <p>Depression causes decreased functioning & decreased care for children. Treating the depression of mothers leads to improved growth and development of the newborn and reduces the likelihood of infection and malnutrition among them.</p>
    
        <h2>Treatment</h2>
        <ul>
            <li>Admission to hospital in cases of suicidal ideas</li>
            <li>Medication</li>
            <li>Counselling to patient & relatives</li>
        </ul>
    
        <p>Let us care for mother and baby both. Postpartum psychiatric disorders are treatable. With awareness we will be able to get them help sooner and provide a better environment for mother & child both.</p>
        `,
        category: "Health",
        imageUrl: pregnancyCover,
        date: "September 1, 2023",
        author: "Jane Smith"
    },
    {
        id: 5,
        title: "Symptoms to Look Out for Depression in Children",
        content: `
        <p>Depression is a mental health disorder characterized by persistently low or sad mood or loss of interest in activities, causing significant impairment in your daily life. Depression, also called ‘clinical depression’ or a ‘depressive disorder’ causes distressing symptoms that affect how you think, feel, act, or behave on a daily basis. Depression can occur along with other conditions such as diabetes, high blood pressure (hypertension), cancer, heart diseases, etc. or it can make the symptoms of these conditions worse.</p>

        <p>The persistent feeling of sadness or loss of interest that characterizes major depression can lead to a range of behavioral and physical symptoms. These may include changes in sleep, appetite, energy level, concentration, daily behavior, or self-esteem. Depression can also be associated with thoughts of suicide (the act of intentionally causing one’s own death).</p>

        <p>The mainstay of treatment is usually medication, talk therapy, or a combination of the two. Increasingly, research suggests that these treatments may normalize brain changes associated with depression.</p>
        <img src="${depression1}" alt="Depression">

        <h2>Depression in Children</h2>
        <p>Children also suffer from depression at times. Childhood depression is different from the normal "blues" and everyday emotions that occur as a child develops. Childhood depression is persistent sadness that children experience and start to feel alone, hopeless, helpless, and worthless. When this type of sadness is unending, it disrupts every part of the child's life. It interferes with the child's daily activities, schoolwork, and peer relationships. It can also affect the life of each family member.</p>

        <p>Keep in mind that while depression in children is a serious illness, it is also a treatable one. Studies show that depression among children is very common and affects about 2% of preschool and school-age children. If you think your child is continuously sad, unhappy, angry or distressed, it might be a good idea to visit your pediatrician to understand why your child might be behaving like this. Knowing the signs and symptoms of depression in children will help you be aware and identify its onset, if any, at an earlier stage.</p>
        <img src="${depression2}" alt="Depression">

        <h2>Signs of Depression in Children</h2>
        <p>The symptoms of depression in children vary. It is often not diagnosed and untreated because they are passed off as normal emotional and psychological changes that occur during their growth years. Signs and symptoms of depression in children include:</p>
        <ul>
            <li>Irritability or anger</li>
            <li>Continuous feelings of sadness and hopelessness</li>
            <li>Social withdrawal</li>
            <li>Increased sensitivity to rejection</li>
            <li>Changes in appetite - either increased or decreased.</li>
            <li>Changes in sleep - sleeplessness or excessive sleep</li>
            <li>Vocal outbursts of crying</li>
            <li>Difficulty in concentrating.</li>
            <li>Fatigue and low energy</li>
            <li>Physical complaints (such as stomach aches, headaches) that don't respond to treatment.</li>
            <li>Reduced ability to function during events and activities at home or with friends, in school, extracurricular activities, and in other hobbies or interests.</li>
        </ul>

        <p>Not all children have all these symptoms. Although some children may continue to function reasonably well in structured environments, most kids with significant depression will suffer a noticeable change in social activities, loss of interest in school and poor academic performance, or a change in appearance. Childhood depression can have a serious impact on your child's life, so it is always important to be on the lookout for warning signs.</p>

        <p>Talk to your child to understand what and how they are feeling on a regular basis. Remember to be supportive and non-judgmental. Early interventions in the form of therapy and medications can help your child get back on track before depression turns into a serious illness.</p>
        `,
        category: "Health",
        imageUrl: depressionCover,
        date: "September 10, 2023",
        author: "John Doe"
    },
    {
        id: 6,
        title: "Busting 5 Common Myths About Autism",
        content: `
            <p>It is 2024. It can be safely said that the world is more aware and sensitized about several issues than it was even 10 years ago, including science and health. However, even with the increasing awareness about health and developmental disorders, the word “autism” usually creates a wrong picture in everyone's minds.</p>
            <p>Autism is still a highly misunderstood condition. These misconceptions need to be cleared and people need to be educated, so that those affected by autism get acceptance, help, and access to resources needed to lead a meaningful life.</p>
            <h2>What is Autism?</h2>
            <p>Autism or autism spectrum disorder (ASD) is a neuro-developmental disorder (related to brain development). It includes a wide range of conditions (hence the term spectrum) in which the affected person faces challenges with speech, social skills, nonverbal communication, and repeated behavior patterns.</p>
            <h2>Myth 1: Autism is a disease, and it can be cured.</h2>
            <p><strong>Fact:</strong> Autism is not a disease, and it cannot be cured with medicine. Autism is a neuro-developmental disorder that may be caused by a combination of environmental and hereditary factors. You cannot catch it as a disease from someone else. Also, there is presently no treatment for autism. However, autistic people can learn to manage their symptoms and live independent, healthy, and productive lives with early behavioral intervention and therapy.</p>
                    <img src="${myths1}" alt="Depression">

            <h2>Myth 2: Autism affects only children.</h2>
            <p><strong>Fact:</strong> Autism is not a childhood condition, and it lasts lifelong. You cannot grow out of or cure autism. Autism is a ‘spectrum’ disorder and hence affects different people in different ways, and through different stages of life. With the right intervention and therapy tools, autistic adults, as well as autistic children, can develop social skills and communication abilities and lead a fulfilling life.</p>
            <h2>Myth 3: Autistic individuals lack emotions and empathy.</h2>
            <p><strong>Fact:</strong> Autistic individuals are capable of feeling all emotions. However, they may not be able to communicate their emotions or interpret other people’s emotions, expressions, and body language due to their challenges with social and communication skills. This does not mean that they lack emotions or cannot express love. Autistic individuals can successfully form social relationships with the right behavioral intervention.</p>
            <h2>Myth 4: Vaccines cause autism.</h2>
            <p><strong>Fact:</strong> This may be one of the most popular myths about autism - that vaccines, and specifically the MMR vaccine (a vaccine against measles, mumps, and rubella), cause autism. This myth is reportedly based on a dubious study in the 1990s, which has since been proven to be unscientific and unreliable. There is no scientific evidence that childhood vaccination causes autism. The safety of all vaccines is firmly established before administration.</p>
            <h2>Myth 5: Autism is caused by bad parenting.</h2>
            <p><strong>Fact:</strong> There is no single known cause for autism, and research suggests that there may be several environmental and genetic factors involved in autism, which does not include parenting style. This myth stems from a theory popular in the 1950s, called the “Refrigerator Mother Hypothesis”. It suggested that mothers who were emotionally neglectful or distant traumatized their children and caused autism. This theory has long been scientifically debunked.</p>
                    <img src="${myths5}" alt="Depression">

            <p>Do not stop learning and educating others about autism. The more people for whom these myths are busted, the better.</p>
        `,
        category: "Health",
        imageUrl: mythscover,
        date: "June 15, 2024",
        author: "Jane Doe"
    },
    {
        id: 7,
        title: "Does Your Child Have Autism?",
        content: `
            <h2>What is autism spectrum disorder?</h2>
                                <img src="${autismspectrum}" alt="Depression" class="autism-spectrum-img">
            <p>Autism Spectrum disorder refers to a range of developmental disorders that often appear during early childhood. A set of behaviors that fall on a spectrum are associated with this condition which typically lead to social and functional difficulties. Autism Spectrum Disorder is often a lifelong condition, but there has been immense research in the field which has helped develop a variety of intervention techniques that aim at managing the symptoms and helping children with autism to grow into functional adults. The earlier a child is diagnosed with ASD, the earlier he/she will be exposed to intervention and rehabilitation programs which are essential and so identifying the early signs of ASD is crucial. Early diagnosis and intervention often lead to very positive outcomes.</p>
            <h2>What to look for?</h2>
                                <img src="${autismsigns}" alt="Depression">

            <p>The following are some of the signs that you should look out for in your infant and toddler to determine if he shows symptoms of ASD:</p>
            <ul>
                <li>If your child doesn’t respond to his name or any other verbal acknowledgement aimed at gaining his/her attention. If your child fails to make consistent eye contact.</li>
                <li>If there is a lack of shared facial expressions and responses like: not smiling at you.</li>
                <li>If your child shows a lack of listening to and looking at people around him/her.</li>
                <li>If your child generally has difficulties in engaging in interactions or conversations of any kind with you and others.</li>
                <li>If your child seems to get upset by any minute change in routine.</li>
                <li>If your child seems uninterested in play activities-especially with other kids.</li>
                <li>If your child consistently repeats certain phrases even after having moved past the babbling phase.</li>
                <li>If your child shows a lack or delay in language acquisition.</li>
                <li>If your child shows any unusual behaviors that he/she tends to repeat consistently. If your child seems too attached to a particular object and has odd and repetitive behavior associated with it.</li>
                <li>If your child shows an unnatural, almost single-minded interest in specific topics like alphabets or numbers.</li>
            </ul>
            <h2>The Next Step</h2>
            <p>These are merely the warning signs, and it is imperative to keep in mind that the symptoms of ASD show up along a spectrum. Thus, some children with Autism will show an inability to speak while other children can be highly verbal but repetitive and single-minded in their speech. This is true for most behaviors associated with Autism. If you find that your child displays some of these signs, then the best thing to do is to refer to a clinical psychologist who can carry out further diagnostic tests and observations to determine where your child falls on the spectrum and what interventions are best suited. Though it is easy to look at Autism and the symptoms associated with it as a disability, there are a few strengths associated with it as well. Children with autism tend to have special abilities in at least one aspect/area and some even have above average intelligence. Identifying these strengths and helping your child build on them will ensure that he/she can overcome the limitations. Autism does not mean that your child cannot have a fruitful and enriching life, it just means that he/she will need a different kind of support and care to do so.</p>
        `,
        category: "Health",
        imageUrl: autismcover,
        date: "June 15, 2024",
        author: "John Smith"
    }


];

export default blogs;
