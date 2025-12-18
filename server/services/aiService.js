import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  baseURL: 'https://ai.megallm.io/v1',
  apiKey: process.env.MEGALLM_API_KEY
});

// Process messy user input into structured legal explanation
export async function processLegalProblem(userInput) {
  try {
    const response = await client.chat.completions.create({
      model: 'claude-sonnet-4-5-20250929',
      messages: [
        {
          role: 'system',
          content: `You are an expert legal assistant for Indian startups and businesses. Your job is to:
1. Take messy, informal problem descriptions from users
2. Clean them up into clear, professional legal explanations
3. Identify the legal category
4. Assess urgency level
5. Extract key facts

Respond in JSON format with:
{
  "processedProblem": "Clear, professional legal explanation of the issue",
  "category": "one of: corporate, intellectual-property, employment, contracts, compliance, fundraising, disputes, real-estate, tax, other",
  "urgency": "one of: low, medium, high, critical",
  "keyFacts": ["list of important facts extracted"],
  "suggestedActions": ["immediate steps the user should consider"],
  "estimatedComplexity": "simple, moderate, complex"
}`
        },
        {
          role: 'user',
          content: userInput
        }
      ],
      temperature: 0.3
    });

    const content = response.choices[0].message.content;
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('AI Processing Error:', error);
    throw error;
  }
}

// Match lawyers based on processed case
export async function matchLawyers(processedCase, availableLawyers) {
  try {
    const response = await client.chat.completions.create({
      model: 'claude-sonnet-4-5-20250929',
      messages: [
        {
          role: 'system',
          content: `You are a legal matching expert. Given a case and a list of lawyers, score each lawyer's suitability for this case on a scale of 0-100.
Consider:
- Specialization match
- Experience level
- Language preferences
- Location
- Availability
- Rating and success rate

Return JSON array of lawyer IDs with scores:
[{"lawyerId": "id", "score": 85, "reason": "brief explanation"}]
Only include lawyers with score > 60. Return top 5 matches.`
        },
        {
          role: 'user',
          content: JSON.stringify({
            case: processedCase,
            lawyers: availableLawyers
          })
        }
      ],
      temperature: 0.2
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (error) {
    console.error('Lawyer Matching Error:', error);
    throw error;
  }
}

// Generate chat response for legal queries
export async function generateChatResponse(messages, caseContext) {
  try {
    const response = await client.chat.completions.create({
      model: 'claude-sonnet-4-5-20250929',
      messages: [
        {
          role: 'system',
          content: `You are a helpful legal assistant for Find My Vakeel. Help users understand their legal situation and guide them through the process.

Case Context: ${JSON.stringify(caseContext)}

Be helpful, professional, and concise. If unsure, recommend consulting with the matched lawyer.`
        },
        ...messages
      ],
      temperature: 0.5
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Chat Response Error:', error);
    throw error;
  }
}

export default { processLegalProblem, matchLawyers, generateChatResponse };
