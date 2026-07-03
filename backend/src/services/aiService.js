const Setting = require('../models/Setting');

exports.evaluatePrompt = async (promptText) => {
  const apiKeySetting = await Setting.findOne({ key: 'openrouter_api_key' });
  if (!apiKeySetting || !apiKeySetting.value) {
    throw new Error('OpenRouter API Key not configured in Admin Settings.');
  }

  const modelSetting = await Setting.findOne({ key: 'openrouter_model' });
  const model = modelSetting?.value || 'meta-llama/llama-3-8b-instruct:free';

  const systemPrompt = `You are a strict, senior prompt engineering evaluator. 
Evaluate the user's prompt. 
Provide a JSON response strictly with the following schema, and NOTHING else:
{
  "score": <overall score 0-100>,
  "clarity": <clarity score 0-100>,
  "specificity": <specificity score 0-100>,
  "constraints": <constraints score 0-100>,
  "feedback": [
    { "type": "positive" | "improvement" | "warning", "title": "<short title>", "desc": "<description>" }
  ],
  "optimized": "<An optimized, better version of the user's prompt>"
}`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKeySetting.value}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://teem01.com',
      'X-Title': 'Teem01 Prompt Evaluator'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: promptText }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenRouter API Error:', errorText);
    throw new Error('Failed to evaluate prompt via OpenRouter');
  }

  const data = await response.json();
  let resultText = data.choices[0].message.content;
  
  try {
    return JSON.parse(resultText);
  } catch (e) {
    // Attempt to extract JSON from markdown if wrapped
    const jsonMatch = resultText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    console.error('Raw result:', resultText);
    throw new Error('Failed to parse AI evaluation response as JSON');
  }
};

exports.checkChallenge = async (userPrompt, targetOutput) => {
  const apiKeySetting = await Setting.findOne({ key: 'openrouter_api_key' });
  if (!apiKeySetting || !apiKeySetting.value) {
    throw new Error('OpenRouter API Key not configured in Admin Settings.');
  }

  const modelSetting = await Setting.findOne({ key: 'openrouter_model' });
  const model = modelSetting?.value || 'meta-llama/llama-3-8b-instruct:free';

  const systemPrompt = `You are a challenge evaluator. The user is trying to write a prompt that generates exactly the Target Output.
Target Output:
${targetOutput}

Given the user's prompt, determine if it successfully instructs an AI to generate the exact Target Output. 
Provide a JSON response strictly with the following schema:
{
  "success": <boolean>,
  "score": <number 0-100 (100 if exact match, lower if partially matching)>,
  "feedback": "<Explain why it succeeded or failed>"
}`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKeySetting.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `User Prompt: ${userPrompt}` }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to evaluate challenge via OpenRouter');
  }

  const data = await response.json();
  let resultText = data.choices[0].message.content;
  
  try {
    return JSON.parse(resultText);
  } catch (e) {
    const jsonMatch = resultText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch) return JSON.parse(jsonMatch[1]);
    throw new Error('Failed to parse AI response as JSON');
  }
};
