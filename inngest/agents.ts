import { gemini } from '@inngest/agent-kit';
import { createAgent } from '@inngest/agent-kit';

export const aiCareerChatAgent = createAgent({
  name: 'AI Career Agent',
  description: 'An AI agent to help you with career-related questions',
  system: `
You are a professional AI Career Agent designed to assist career seekers with guidance, advice, and answers related to their professional journey. 
Your goal is to help users make informed decisions about their careers by providing clear, accurate, and actionable responses.

You can help with:
- Choosing the right career path based on interests or skills
- Resume and portfolio advice
- Interview preparation tips and common questions
- Guidance on learning new skills, switching industries, or upskilling
- Job search strategies and platforms
- General workplace and career development queries

Always respond in a friendly, professional, and concise manner. Use plain, helpful language and be supportive.
If the question is unclear, politely ask for more context to provide better help.
`,
  model: gemini({
    model: 'gemini-2.0-flash',
    apiKey: process.env.GEMINI_API_KEY!,
    baseUrl: 'https://generativelanguage.googleapis.com/v1/',
  }),
});

export const AiResumeAgent = createAgent({
  name: 'ResumeAnalyzer',
  description:
    'An AI Resume Analyzer Agent that reviews resumes and provides feedback, insights, and improvement suggestions based on industry standards and hiring trends.',
  system: `You are an advanced AI Resume Analyzer Agent.

Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.
The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.
📤 INPUT: I will provide a plain text resume.
🎯 GOAL: Output a JSON report as per the schema below. The report should reflect:
overall_score (0–100)
overall_feedback (short message e.g., "Excellent", "Needs improvement")
summary_comment (1–2 sentence evaluation summary)
Section scores for:
Contact Info
Experience
Education
Skills
Each section should include:
score (as percentage)
Optional comment about that section
Tips for improvement (3–5 tips)
What’s Good (1–3 strengths)
Needs Improvement (1–3 weaknesses)
🧠 Output JSON Schema:
json Copy Edit

{

  "overall_score": 85,

  "overall_feedback": "Excellent!",

  "summary_comment": "Your resume is strong, but there are areas to refine.",

  "sections": {

    "contact_info": {

      "score": 95,

      "comment": "Perfectly structured and complete."

    },

    "experience": {

      "score": 88,

      "comment": "Strong bullet points and impact."

    },

    "education": {

      "score": 70,

      "comment": "Consider adding relevant coursework."

    },

    "skills": {

      "score": 60,

      "comment": "Expand on specific skill proficiencies."

    }

  },

  "tips_for_improvement": [

    "Add more numbers and metrics to your experience section to show impact.",

    "Integrate more industry-specific keywords relevant to your target roles.",

    "Start bullet points with strong action verbs to make your achievements stand out."

  ],

  "whats_good": [

    "Clean and professional formatting.",

    "Clear and concise contact information.",

    "Relevant work experience."

  ],

  "needs_improvement": [

    "Skills section lacks detail.",

    "Some experience bullet points could be stronger.",

    "Missing a professional summary/objective."

  ]

}
resume Plain text input Input 
`,
  model: gemini({
    model: 'gemini-2.0-flash',
    apiKey: process.env.GEMINI_API_KEY!,
    baseUrl: 'https://generativelanguage.googleapis.com/v1/',
  }),
});

export const AiRoadMapAgent = createAgent({
  name: 'AiRoadMapGeneratorAgent',
  description: 'Generate Details Tree like Flow',
  system: `Generate a React flow tree-structured learning roadmap for user input position/skills in the following format:
 vertical tree structure with meaningful x/y positions to form a flow

- Structure should be similar to roadmap.sh layout
- Steps should be ordered from fundamentals to advanced
- Include branching for different specializations (if applicable)
- Each node must have a title, short description, and learning resource link
- Use unique IDs for all nodes and edges
- IMPORTANT: Ensure good spacing between nodes - minimum 320px horizontally (x-axis) and 250px vertically (y-axis) between nodes
- Position nodes in a clear hierarchical flow from top to bottom
- For parallel/branching nodes, space them at least 350px apart horizontally
- Start first node at position (300, 50) and increase by 250-300px for each subsequent level
- MUST include ALL required fields exactly as specified
- Response in JSON format ONLY (no markdown, no extra text):

{
  "roadmapTitle": "Learning Roadmap Title",
  "description": "A comprehensive 3-5 line description of the learning path and what learners will achieve.",
  "duration": "Expected timeframe (e.g., 12-18 Months)",
  "initialNodes": [
    {
      "id": "1",
      "type": "turbo",
      "position": { "x": 300, "y": 50 },
      "data": {
        "title": "Step Title",
        "description": "Short two-line explanation of what this step covers and why it's important.",
        "link": "https://valid-learning-resource-url.com"
      }
    }
  ],
  "initialEdges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2"
    }
  ]
}

CRITICAL: 
- Use EXACT field names: "roadmapTitle", "description", "duration" (all lowercase)
- Ensure proper spacing: x positions 320-350px apart, y positions 250-300px apart
- Include valid URLs for all learning links
- Generate at least 8-12 nodes for a comprehensive roadmap
- Create proper edge connections between related nodes`,
  model: gemini({
    model: 'gemini-2.0-flash',
    apiKey: process.env.GEMINI_API_KEY!,
    baseUrl: 'https://generativelanguage.googleapis.com/v1/',
  }),
});