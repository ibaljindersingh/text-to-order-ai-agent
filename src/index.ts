import { cloudEvent } from '@google-cloud/functions-framework';
import { StorageObjectData } from '@google/events/cloud/storage/v1/StorageObjectData';
import { CloudEvent } from '@google-cloud/functions-framework/build/src/functions';
import { Storage } from '@google-cloud/storage';
import OpenAI from "openai";
import fs from 'fs';


type GPTMessage = {
    role: "system" | "user" | "assistant";
    content: any; // Allow multimodal inputs
};

async function convertImageToBase64(filePath: string): Promise<string> {
  const imageBuffer = fs.readFileSync(filePath);
  return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
}
const apiKey=process.env.OPENAI_API_KEY;
// Initialize OpenAI and Cloud Storage clients
const storage = new Storage();
console.log("✅ Local ENV Test - OpenAI API Key:", apiKey ? "Loaded" : "Missing");

const openai = new OpenAI({
  apiKey: apiKey || "", // Fetch from GCP Secret Manager
});

cloudEvent('imageUploadTrigger', async (cloudEvent: CloudEvent<StorageObjectData>) => {
  const fileData = cloudEvent.data;
  if (!fileData || !fileData.bucket || !fileData.name) {
    console.error('Invalid Cloud Event: Missing bucket or file name.');
    return;
  }

  const bucketName = fileData.bucket;
  const fileName = fileData.name;
  console.log(`Processing image: ${fileName} from bucket: ${bucketName}`);

  try {
    // // Generate a signed URL for OpenAI API to access the image
    // const bucket = storage.bucket(bucketName);
    // const file = bucket.file(fileName);
    const filePath = `/tmp/${fileName}`;
    await storage.bucket(bucketName).file(fileName).download({ destination: filePath });

    const base64Image = await convertImageToBase64(filePath);
    // const signedUrl = await file.getSignedUrl({
    //   action: 'read',
    //   expires: Date.now() + 15 * 60 * 1000, // 15 min expiry
    // });

  //  console.log(`Image accessible via: ${signedUrl}`);
  console.log("✅ Image converted to Base64");

    // Prepare context for the LLM
    const messages: GPTMessage[] = [
        {
          role: "system",
          content: "Extract and structure the handwritten medicine list into JSON format. The output should contain fields as medicine_name, quantity, time_to_consume, before_or_after. "
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Extract structured details from this handwritten medicine list:" },
            { type: "image_url", image_url: { url: `${base64Image}` } }
          ]
        }
      ];

    // Send image to GPT-4 Vision
    
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 500
      });

    const structuredOrder = response.choices[0].message.content;
    console.log(`Structured Order Data:\n${structuredOrder}`);

  } catch (error) {
    console.error(`Error processing image ${fileName}:`, error);
  }
});
