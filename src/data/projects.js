import verificationEngineImage from "../assets/verification-engine-preview.png";

export const projects = [
  {
    id: "verification-engine",
    date: "Aug 30",
    text: "Built Verification Engine end to end on AWS: a platform letting South African shareholders claim unpaid dividends and lost shares without the usual paperwork. Real Cognito auth, Rekognition face verification, Textract OCR, Step Functions orchestration for a two party estate flow, all defined in CDK.",
    hashtags: ["AWS", "CDK", "DotNet", "React", "CloudEngineering", "Serverless"],
    image: verificationEngineImage,
    linkLabel: "master.ds1rwbch2twux.amplifyapp.com",
    linkUrl: "https://master.ds1rwbch2twux.amplifyapp.com",
    githubUrl: "https://github.com/LindokuhleChili/verification-engine",
    stats: { replies: 3, retweets: 5, likes: 21, views: "1.2K" }
  },
  {
    id: "compuclass",
    date: "Nov 2025",
    text: "Led a 6 person team building CompuClass, a Learning Management System with a 3D Windows environment simulator, designed for schools without laptop access. Added the simulator, and personally built the teacher portal, quiz engine, and the full Supabase schema.",
    hashtags: ["ReactNative", "Supabase", "TeamLead", "EdTech"],
    linkLabel: "github.com/Channel-Zero/Compuclass-v1.5",
    linkUrl: "https://github.com/Channel-Zero/Compuclass-v1.5",
    githubUrl: "https://github.com/Channel-Zero/Compuclass-v1.5",
    stats: { replies: 2, retweets: 3, likes: 14, views: "612" }
  }
];
