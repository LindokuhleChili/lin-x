import verificationEngineImage from "../assets/verification-engine-preview.png";
import aiForAfricaTeamImage from "../assets/ai-for-africa-winning-team.jpg";

export const projects = [
  {
    id: "ai-for-africa-winning-team",
    date: "Oct 2",
    text: "Won as part of the First Team: Vodacom / UJ / AWS AI for Africa Challenge, 2 October 2026, Vodaworld Midrand.",
    image: aiForAfricaTeamImage,
    imageAlt:
      "Group photo of the winning team on stage at Vodaworld Midrand, holding certificates and gift bags in front of Vodacom and AWS backdrops. Lindokuhle Chili is in the group, wearing all black.",
    imageWidth: 720,
    imageHeight: 830,
    imageMaxWidth: 720,
    imageCredit: "Photo: UJ School of Consumer Intelligence and Information Systems"
  },
  {
    id: "ai-for-africa-coverage",
    date: "Oct 2",
    text: "Coverage of the Vodacom / UJ / AWS AI for Africa Challenge by UJ SCiiS.",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7513101563935227904",
    embedTitle: "Coverage of the Vodacom / UJ / AWS AI for Africa Challenge by UJ SCiiS",
    linkLabel: "linkedin.com",
    linkTitle: "Watch the coverage on LinkedIn",
    linkUrl:
      "https://www.linkedin.com/posts/uj-school-of-consumer-intelligence-and-information-systems_aiforafricachallenge-uj-sciis-activity-7513101563935227904-cpK3"
  },
  {
    id: "verification-engine",
    date: "Aug 30",
    text: "Built Verification Engine end to end on AWS: a platform letting South African shareholders claim unpaid dividends and lost shares without the usual paperwork. Real Cognito auth, Rekognition face verification, Textract OCR, Step Functions orchestration for a two party estate flow, all defined in CDK.",
    hashtags: ["AWS", "CDK", "DotNet", "React", "CloudEngineering", "Serverless"],
    image: verificationEngineImage,
    linkLabel: "master.ds1rwbch2twux.amplifyapp.com",
    linkUrl: "https://master.ds1rwbch2twux.amplifyapp.com",
    githubUrl: "https://github.com/LindokuhleChili/verification-engine"
  },
  {
    id: "compuclass",
    date: "2026",
    text: "Latest project: Led a 6 person team building CompuClass, a Learning Management System with a 3D Windows environment simulator, designed for schools without laptop access. Added the simulator, and personally built the teacher portal, quiz engine, and the full Supabase schema.",
    hashtags: ["ReactNative", "Supabase", "TeamLead", "EdTech"],
    linkLabel: "compuclass-v15.vercel.app",
    linkUrl: "https://compuclass-v15.vercel.app",
    githubUrl: "https://github.com/Channel-Zero/Compuclass-v1.5"
  },
  {
    id: "amazon-q-challenge",
    date: "Oct 2025",
    text: "Amazon Q Developer Coding Challenge.",
    video: "/amazon-q-challenge.mp4",
    videoPoster: "/amazon-q-challenge-poster.jpg",
    videoLabel: "Two people holding a giant novelty check for the Amazon Q Developer Coding Challenge, an Amazon gift card worth fifty dollars.",
    videoWidth: 720,
    videoHeight: 1280,
    videoMaxWidth: 360
  }
];
