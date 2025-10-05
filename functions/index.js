require('dotenv').config();
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const cors = require("cors")({ 
  origin: [
    'http://localhost:5173',
    'https://code63006.github.io'
  ],
  credentials: true
});

const { DocumentProcessorServiceClient } = require("@google-cloud/documentai");
const { VertexAI } = require("@google-cloud/vertexai");
const { Translate } = require("@google-cloud/translate").v2;
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Firebase Admin with service account
const serviceAccount = require('./service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Document AI client
const documentAiClient = new DocumentProcessorServiceClient({
  credentials: serviceAccount
});

// Initialize Vertex AI client
const vertexAiClient = new VertexAI({
  project: serviceAccount.project_id,
  location: "us-central1",
  credentials: serviceAccount
});

// Initialize Translate client
const translateClient = new Translate({
  projectId: serviceAccount.project_id,
  credentials: serviceAccount
});

// Initialize Gemini AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

exports.processDocument = functions.region('us-central1').https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    console.log('Received document processing request');

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!req.headers.authorization?.startsWith('Bearer ')) {
      console.error('No Firebase ID token provided');
      return res.status(403).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      // Verify Firebase auth
      const idToken = req.headers.authorization.split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('Authenticated user:', decodedToken.uid);

      // Get request data
      const { fileContent, mimeType } = req.body;
      if (!fileContent || !mimeType) {
        return res.status(400).json({ error: "Missing fileContent or mimeType" });
      }

      // Process with Document AI
      console.log('Processing document with Document AI...');
      // Use environment variables for processor configuration
      const projectId = process.env.PROJECT_ID || 'sample-firebase-ai-app-5a13c';
      const location = process.env.PROCESSOR_LOCATION || 'us';
      const processorId = process.env.PROCESSOR_ID || '1c79cb44aea4b240';
      
      const processorName = `projects/${projectId}/locations/${location}/processors/${processorId}`;
      console.log('Using Document AI processor:', processorName);
      
      const [result] = await documentAiClient.processDocument({
        name: processorName,
        rawDocument: {
          content: fileContent,
          mimeType: mimeType
        }
      });

      if (!result?.document) {
        throw new Error('No document data received from Document AI');
      }

      console.log('Document processed successfully');
      return res.status(200).json({
        text: result.document.text,
        confidence: result.document.textChanges?.[0]?.confidence || 1.0
      });

    } catch (error) {
      console.error('Error processing document:', error);
      
      // Handle specific Document AI errors
      if (error.message.includes('UNAUTHENTICATED')) {
        console.error('Document AI authentication failed:', error);
        return res.status(401).json({
          error: 'Authentication failed with Google Cloud',
          details: error.message,
          action: 'Please verify the service account credentials'
        });
      } else if (error.message.includes('NOT_FOUND')) {
        console.error('Document AI processor not found:', error);
        return res.status(404).json({
          error: 'Document AI processor not found',
          details: error.message,
          action: 'Please verify the processor ID and configuration'
        });
      } else if (error.message.includes('PERMISSION_DENIED')) {
        console.error('Document AI permission denied:', error);
        return res.status(403).json({
          error: 'Permission denied for Document AI',
          details: error.message,
          action: 'Please verify the service account permissions'
        });
      }

      return res.status(500).json({
        error: 'Document processing failed',
        details: error.message
      });
    }
  });
});

exports.generateContent = functions.region('us-central1').https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Missing prompt in request body" });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      return res.status(200).json({ response: text });
    } catch (error) {
      console.error("Error generating content:", error);
      return res.status(500).json({
        error: 'Content generation failed',
        details: error.message
      });
    }
  });
});

exports.translateText = functions.region('us-central1').https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const { text, targetLanguage } = req.body;
      if (!text || !targetLanguage) {
        return res.status(400).json({ error: "Missing text or targetLanguage in request body" });
      }

      const [translation] = await translateClient.translate(text, targetLanguage);
      return res.status(200).json({ translatedText: translation });
    } catch (error) {
      console.error("Error translating text:", error);
      return res.status(500).json({
        error: 'Translation failed',
        details: error.message
      });
    }
  });
});