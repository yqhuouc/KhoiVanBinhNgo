
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAstrologyInsight = async (dob: string, time: string, gender: string, birthPlace: string) => {
  const ai = getAI();
  const prompt = `Bạn là một đại sư Tử Vi danh tiếng. Hãy lập lá số và luận giải chi tiết năm 2026 (Bính Ngọ) cho người sinh ngày ${dob}, giờ ${time}, giới tính ${gender}, tại ${birthPlace}. 
  Hãy phân tích sâu về các sao hạn, vận trình 12 tháng (rating từ 1-10) và lời khuyên hóa giải. Trả về JSON theo đúng schema.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overview: { type: Type.STRING },
          stars: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                effect: { type: Type.STRING },
                remedy: { type: Type.STRING }
              }
            }
          },
          monthlyLuck: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                month: { type: Type.NUMBER },
                insight: { type: Type.STRING },
                rating: { type: Type.NUMBER }
              }
            }
          },
          career: { type: Type.STRING },
          love: { type: Type.STRING },
          finance: { type: Type.STRING },
          health: { type: Type.STRING },
          advice: { type: Type.STRING }
        },
        required: ["overview", "stars", "monthlyLuck", "career", "love", "finance", "health", "advice"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getNumerologyInsight = async (fullName: string, commonName: string, dob: string) => {
  const ai = getAI();
  const prompt = `Bạn là chuyên gia Thần số học hàng đầu. Phân tích dựa trên tên khai sinh "${fullName}", tên thường gọi "${commonName}" và ngày sinh ${dob}. 
  Tính toán Số chủ đạo, Số linh hồn, Số biểu đạt và Năm cá nhân 2026. Luận giải chi tiết thách thức và định hướng nghề nghiệp. Trả về JSON.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          lifePathNumber: { type: Type.NUMBER },
          soulNumber: { type: Type.NUMBER },
          expressionNumber: { type: Type.NUMBER },
          personalYear2026: { type: Type.NUMBER },
          meaning: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
          careerGuidance: { type: Type.STRING },
          monthlyVibration: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                month: { type: Type.STRING },
                advice: { type: Type.STRING }
              }
            }
          }
        },
        required: ["lifePathNumber", "soulNumber", "expressionNumber", "personalYear2026", "meaning", "strengths", "challenges", "careerGuidance", "monthlyVibration"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getFengShuiInsight = async (year: string, houseDirection: string, mainConcern: string) => {
  const ai = getAI();
  const prompt = `Bạn là thầy phong thủy địa lý. Tư vấn cho gia chủ sinh năm ${year}, nhà hướng ${houseDirection}, đang quan tâm nhất về ${mainConcern}. 
  Tư vấn bố trí bàn làm việc, vật phẩm chiêu tài và cách kích hoạt năng lượng năm 2026. Trả về JSON.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          element: { type: Type.STRING },
          destinyType: { type: Type.STRING },
          luckyColors: { type: Type.ARRAY, items: { type: Type.STRING } },
          goodDirections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                direction: { type: Type.STRING },
                meaning: { type: Type.STRING }
              }
            }
          },
          deskSetup: { type: Type.STRING },
          wealthActivation: { type: Type.STRING },
          luckyItems: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                placement: { type: Type.STRING },
                purpose: { type: Type.STRING }
              }
            }
          },
          description: { type: Type.STRING }
        },
        required: ["element", "destinyType", "luckyColors", "goodDirections", "deskSetup", "wealthActivation", "luckyItems", "description"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getFortuneInsight = async () => {
  const ai = getAI();
  const prompt = `Bạn là một vị ẩn sĩ thông tuệ ẩn cư trên núi cao, chuyên gieo quẻ thánh linh ứng đầu năm 2026 (Bính Ngọ). 
  Hãy gieo một quẻ ngẫu nhiên hoàn toàn (ý trời quyết định quẻ này là Đại Cát, Trung Cát, hay thậm chí là Hạ Hung). 
  Người dùng không nói gì cả, họ chỉ thành tâm gieo quẻ. 
  
  Yêu cầu quẻ bao gồm:
  1. Tiêu đề quẻ trang trọng (Ví dụ: Quẻ số 24 - Địa Lôi Phục).
  2. Một bài thơ quẻ cổ điển (Thất ngôn hoặc Lục bát, giàu hình ảnh).
  3. Dịch thơ sang tiếng Việt hiện đại.
  4. Luận giải đầy đủ 4 phương diện:
     - Tổng quát (Vận thế chung).
     - Sự nghiệp & Tài lộc (Làm ăn, tiền bạc).
     - Tình duyên & Gia đạo (Hạnh phúc, con cái).
     - Sức khỏe & Bình an.
  5. Lời khuyên tu tâm dưỡng tính để hóa giải hoặc đón lộc.
  
  Hãy phản hồi bằng JSON.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          poem: { type: Type.STRING },
          translation: { type: Type.STRING },
          interpretation: {
            type: Type.OBJECT,
            properties: {
              general: { type: Type.STRING },
              career: { type: Type.STRING },
              love: { type: Type.STRING },
              health: { type: Type.STRING }
            }
          },
          advice: { type: Type.STRING }
        },
        required: ["title", "poem", "translation", "interpretation", "advice"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getPrayerResponse = async (wish: string) => {
  const ai = getAI();
  const prompt = `Một người dùng vừa thành tâm thắp hương và gửi lời nguyện cầu cho năm 2026: "${wish}".
  Hãy đóng vai một vị thần linh hoặc bậc bề trên từ từ ban lời linh ứng. 
  Lời ban phải mang tính khích lệ, an ủi, và đưa ra một thông điệp tâm linh ngắn gọn, sâu sắc.
  Trả về JSON theo schema: { "blessing": "lời chúc phúc dài 2 câu", "spiritAdvice": "lời khuyên tâm linh ngắn gọn", "luckySymbol": "một biểu tượng may mắn như 'Hoa Mai', 'Ánh Trăng', 'Ngọn Lửa'..." }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          blessing: { type: Type.STRING },
          spiritAdvice: { type: Type.STRING },
          luckySymbol: { type: Type.STRING }
        },
        required: ["blessing", "spiritAdvice", "luckySymbol"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
