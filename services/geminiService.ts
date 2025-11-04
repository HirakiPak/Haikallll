import { GoogleGenAI, Type } from "@google/genai";
import { Build, ChatMessage, CompatibilityReport } from '../types';
import { ALL_COMPONENTS } from '../data/components';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function formatBuildForPrompt(build: Build): string {
    return Object.values(build)
        .map(c => c ? `- ${c.type}: ${c.name} (${c.brand}) - Specs: ${JSON.stringify(c.specs)}` : '')
        .filter(Boolean)
        .join('\n');
}

export const analyzeCompatibility = async (build: Build): Promise<CompatibilityReport> => {
    if (Object.keys(build).length < 2) {
        return {
            isCompatible: true,
            issues: [],
            recommendations: [],
            overallAssessment: "Pilih setidaknya dua komponen untuk menganalisis kompatibilitas."
        };
    }

    const prompt = `
        Analisis kompatibilitas komponen PC berikut. Berikan laporan terperinci dalam Bahasa Indonesia.
        Komponen:
        ${formatBuildForPrompt(build)}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isCompatible: { type: Type.BOOLEAN },
                        issues: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    component1: { type: Type.STRING },
                                    component2: { type: Type.STRING },
                                    issue: { type: Type.STRING },
                                },
                                required: ["component1", "component2", "issue"],
                            },
                        },
                        recommendations: {
                           type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    componentToReplace: { type: Type.STRING },
                                    recommendation: { type: Type.STRING },
                                    reason: { type: Type.STRING },
                                },
                                required: ["componentToReplace", "recommendation", "reason"],
                            },
                        },
                        overallAssessment: { type: Type.STRING },
                    },
                    required: ["isCompatible", "issues", "recommendations", "overallAssessment"],
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as CompatibilityReport;
    } catch (error) {
        console.error("Error analyzing compatibility with Gemini:", error);
        throw new Error("Gagal mendapatkan analisis kompatibilitas dari AI.");
    }
};

export const getAiAssistantResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    const componentDatabaseString = JSON.stringify(ALL_COMPONENTS, null, 2);
    const systemInstruction = `Anda adalah seorang ahli perakit PC AI yang ramah dan membantu. Basis pengetahuan Anda adalah data JSON komponen yang tersedia berikut ini. Jawab pertanyaan berdasarkan data ini. Jika pengguna bertanya tentang komponen yang tidak ada dalam daftar, sebutkan bahwa Anda tidak memiliki informasi tentang itu tetapi dapat menjawab berdasarkan pengetahuan umum. Jawablah selalu dalam Bahasa Indonesia. Jadilah ringkas dan membantu.
    
    Database Komponen:
    ${componentDatabaseString}
    `;

    // The first message is a greeting from the model, which we don't need to send back.
    // The Gemini API also requires the conversation to start with a 'user' role.
    const conversationHistory = history.slice(1);

    const contents = [
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      {
        role: 'user' as const,
        parts: [{ text: newMessage }],
      },
    ];

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
                systemInstruction,
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error getting AI assistant response:", error);
        return "Maaf, saya mengalami galat. Silakan coba lagi.";
    }
};