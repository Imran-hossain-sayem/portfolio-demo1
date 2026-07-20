import myphoto from '../assets/myphoto.jpeg';
import resultPredictor from '../assets/result_predictor.png';
import portfolioImage from '../assets/portfolio.png';

export const profile = {
  name: 'Md. Imran Hossain Sayem',
  role: 'Computer Science & Engineering Student',
  headline: 'AI Engineer • Machine Learning Enthusiast • Computer Vision Researcher',
  intro:
    'I am building toward a career in AI and machine learning by creating practical systems, exploring research-driven ideas, and developing thoughtful software experiences.',
  email: 'imran.sayem.01@gmail.com',
  github: 'https://github.com/Imran-hossain-sayem',
  linkedin: 'https://www.linkedin.com/in/md-imran-hossain-sayem-b9a687269',
  resume: '#',
  photo: myphoto,
};

export const skills = [
  { category: 'Programming', proficiency: 92, items: ['Python', 'C++', 'Java', 'JavaScript'] },
  { category: 'Frontend', proficiency: 84, items: ['React', 'HTML5', 'CSS3'] },
  { category: 'Backend', proficiency: 78, items: ['Node.js', 'Express.js'] },
  { category: 'Databases', proficiency: 72, items: ['MongoDB', 'MySQL'] },
  { category: 'Machine Learning', proficiency: 88, items: ['TensorFlow', 'PyTorch', 'Scikit-learn'] },
  { category: 'Computer Vision', proficiency: 82, items: ['OpenCV', 'YOLO'] },
  { category: 'Tools', proficiency: 90, items: ['Git', 'GitHub', 'VS Code', 'Linux', 'Postman'] },
];

export const interests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'Object Detection',
  'Image Processing',
  'Federated Learning',
  'Data Science',
  'Software Engineering',
];

export const projects = [
  {
    title: 'Student Result Predictor',
    description:
      'An AI-powered web application that predicts student academic performance using machine learning. The project highlights preprocessing, model training, evaluation, and deployment on Hugging Face Spaces.',
    image: resultPredictor,
    tech: ['Python', 'Flask', 'Scikit-learn', 'Hugging Face'],
    github: 'https://github.com/Imran-hossain-sayem',
    demo: 'https://huggingface.co/spaces/Md-imran-hossain-156/HSC-RESULT-PREDICTOR',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'A premium personal portfolio built with React and Vite to showcase technical skills, AI projects, research interests, achievements, and professional growth in a recruiter-friendly experience.',
    image: portfolioImage,
    tech: ['React', 'Vite', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Imran-hossain-sayem',
    demo: '#',
  },
];

export const research = [
  {
    title: 'Research Interests',
    points: ['Computer Vision', 'Deep Learning', 'Federated Learning', 'Responsible AI'],
  },
  {
    title: 'Current Learning',
    points: ['Advanced CNN architectures', 'Vision transformers', 'Deployment workflows'],
  },
  {
    title: 'Current Projects',
    points: ['Building practical AI tools', 'Exploring model experimentation', 'Strengthening software engineering fundamentals'],
  },
  {
    title: 'Future Goals',
    points: ['Contribute to meaningful AI research', 'Build impactful intelligent systems', 'Pursue graduate studies'],
  },
];

export const timeline = [
  {
    title: 'Research Focus',
    period: 'Present',
    details: 'Exploring AI, computer vision, and applied machine learning through project-based learning and experimentation.',
  },
  {
    title: 'Teaching / Mentorship',
    period: 'Ongoing',
    details: 'Supporting peers through knowledge sharing, collaborative problem solving, and technical discussions.',
  },
  {
    title: 'Volunteer Activities',
    period: 'Ongoing',
    details: 'Contributing to community learning and helping others grow through accessible technology resources.',
  },
];

export const achievements = [
  { value: '3+', label: 'AI & ML Projects' },
  { value: '1', label: 'Research Focus Area' },
  { value: '100%', label: 'Curiosity-Driven Growth' },
  { value: '∞', label: 'Learning Mindset' },
];
