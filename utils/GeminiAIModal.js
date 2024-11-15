const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Check if the API key is available
if (!apiKey) {
  throw new Error("API Key is missing. Ensure NEXT_PUBLIC_GEMINI_API_KEY is set in your environment variables.");
}

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Define safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

// Define generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

let chatSession;

try {
  // Start a chat session
  chatSession = model.startChat({
    generationConfig,
    safetySettings,
  });
} catch (error) {
  console.error("Failed to initialize chat session:", error);
  throw error;
}

// Export the model and chat session for use in other files
module.exports = {
  model,
  chatSession,
};
