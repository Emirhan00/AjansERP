import OpenAI from 'openai';
import { getDataSummary, getDataTypes, getData, getSystemData } from './dataService';

// API anahtarlarını doğrudan al
const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
const orgId = import.meta.env.VITE_OPENAI_ORG_ID || '';

console.log('OpenAI servis başlatılıyor...');
console.log('API Key mevcut mu:', !!apiKey);
console.log('Organization ID mevcut mu:', !!orgId);

// OpenAI istemcisini oluştur
const openai = new OpenAI({
  apiKey: apiKey,
  organization: orgId,
  dangerouslyAllowBrowser: true // Tarayıcıda çalışmasına izin ver (geliştirme ortamı için)
});

// Kullanıcı mesajını analiz et ve veri tabanı sorgusu içeriyorsa yanıtla
const processUserQuery = (query: string): string | null => {
  // Sorgu çok kısaysa işleme
  if (query.length < 3) return null;
  
  // Tüm veri tabanı sorgusu mu?
  if (query.toLowerCase().includes('tüm veri') || 
      query.toLowerCase().includes('bütün veri') ||
      query.toLowerCase().includes('tüm bilgi') ||
      query.toLowerCase().includes('tüm kayıt')) {
    const allData = getSystemData();
    return `Sistem veritabanı içeriği:\n\n${JSON.stringify(allData, null, 2)}`;
  }
  
  // Veri türlerini al
  const dataTypes = getDataTypes();
  
  // Sorgu içinde veri türü var mı kontrol et
  const matchedDataType = dataTypes.find(type => 
    query.toLowerCase().includes(type.toLowerCase()) || 
    (type === 'clients' && (query.toLowerCase().includes('müşteri') || query.toLowerCase().includes('müsteri'))) ||
    (type === 'projects' && (query.toLowerCase().includes('proje') || query.toLowerCase().includes('projeler'))) ||
    (type === 'tasks' && (query.toLowerCase().includes('görev') || query.toLowerCase().includes('gorev') || query.toLowerCase().includes('task'))) ||
    (type === 'finances' && (query.toLowerCase().includes('finans') || query.toLowerCase().includes('gelir') || query.toLowerCase().includes('gider') || query.toLowerCase().includes('para') || query.toLowerCase().includes('mali'))) ||
    (type === 'team' && (query.toLowerCase().includes('ekip') || query.toLowerCase().includes('takım') || query.toLowerCase().includes('çalışan') || query.toLowerCase().includes('personel'))) ||
    (type === 'statistics' && (query.toLowerCase().includes('istatistik') || query.toLowerCase().includes('stat')))
  );
  
  if (matchedDataType) {
    // Sayı sorgusu mu kontrol et
    if (query.toLowerCase().includes('kaç') || 
        query.toLowerCase().includes('sayısı') || 
        query.toLowerCase().includes('toplam') ||
        query.toLowerCase().includes('adet')) {
      return getDataSummary(matchedDataType);
    }
    
    // Detay sorgusu mu kontrol et
    if (query.toLowerCase().includes('detay') || 
        query.toLowerCase().includes('liste') || 
        query.toLowerCase().includes('göster') ||
        query.toLowerCase().includes('tüm') ||
        query.toLowerCase().includes('hepsi') ||
        query.toLowerCase().includes('kimler')) {
      const data = getData(matchedDataType);
      if (Array.isArray(data)) {
        return `${matchedDataType} listesi:\n\n` + 
          data.map((item: any, index) => {
            const displayName = item.name || item.title || `Öğe ${index + 1}`;
            return `${index + 1}. ${displayName}: ${JSON.stringify(item)}`;
          }).join('\n');
      } else if (data && typeof data === 'object') {
        return `${matchedDataType} detayları:\n\n${JSON.stringify(data, null, 2)}`;
      }
    }
    
    // Genel sorgu
    return getDataSummary(matchedDataType);
  }
  
  // Hiçbir veri türü eşleşmezse, genel bir veri tabanı sorgusu olabilir
  // Tüm veri türlerini kontrol et ve ilgili anahtar kelimeleri ara
  for (const dataType of dataTypes) {
    const data = getData(dataType);
    
    // Diziyse, her öğede arama yap
    if (Array.isArray(data)) {
      const matchedItems = data.filter((item: any) => {
        return Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())
        );
      });
      
      if (matchedItems.length > 0) {
        return `"${query}" araması için ${dataType} içinde ${matchedItems.length} sonuç bulundu:\n\n` +
          matchedItems.map((item: any, index) => {
            const displayName = item.name || item.title || `Öğe ${index + 1}`;
            return `${index + 1}. ${displayName}: ${JSON.stringify(item)}`;
          }).join('\n');
      }
    }
    // Nesne ise, içindeki değerlerde arama yap
    else if (data && typeof data === 'object') {
      // TypeScript hatası için any tipine dönüştür
      const dataObj = data as any;
      
      const matchedKeys = Object.keys(dataObj).filter(key => 
        key.toLowerCase().includes(query.toLowerCase()) ||
        (typeof dataObj[key] === 'string' && dataObj[key].toLowerCase().includes(query.toLowerCase()))
      );
      
      if (matchedKeys.length > 0) {
        const matchedData: Record<string, any> = {};
        matchedKeys.forEach(key => {
          matchedData[key] = dataObj[key];
        });
        
        return `"${query}" araması için ${dataType} içinde eşleşen alanlar bulundu:\n\n${JSON.stringify(matchedData, null, 2)}`;
      }
    }
  }
  
  return null;
};

// ChatGPT ile mesajlaşma fonksiyonu
export const chatWithGPT = async (messages: Array<{ role: 'user' | 'assistant' | 'system', content: string }>) => {
  try {
    // API anahtarı kontrolü ve debug
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const orgId = import.meta.env.VITE_OPENAI_ORG_ID;
    
    console.log('API Key mevcut mu:', !!apiKey);
    console.log('Organization ID mevcut mu:', !!orgId);
    
    // API anahtarı yoksa hata fırlat
    if (!apiKey) {
      console.warn('OpenAI API anahtarı bulunamadı');
      return 'AI yanıtı alınamadı. API anahtarı eksik. Lütfen .env dosyasını kontrol edin.';
    }
    
    // Son kullanıcı mesajını al
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    
    if (lastUserMessage) {
      // Veri tabanı sorgusu mu kontrol et
      const databaseResponse = processUserQuery(lastUserMessage.content);
      
      if (databaseResponse) {
        return databaseResponse;
      }
    }
    
    // Veri tabanında yanıt bulunamadıysa OpenAI'ye sor
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API hatası:', error);
    return 'AI yanıtı alınamadı. Lütfen daha sonra tekrar deneyin.';
  }
};

// Sistem mesajı - AI asistanın rolünü ve bilgilerini tanımlar
export const getSystemMessage = () => {
  // Tüm sistem verilerini al
  const allData = getSystemData();
  
  return {
    role: 'system' as const,
    content: `Sen bir dijital pazarlama ajansı ERP sisteminde çalışan AI asistansın. 
    Adın "AjansAI". Görevin kullanıcılara ERP sistemi hakkında bilgi vermek ve onlara yardımcı olmak.
    
    Bilmen gerekenler:
    - Sistem, proje yönetimi, görev takibi, müşteri ilişkileri, dosya yönetimi, yaratıcı iş akışı ve finansal yönetim modüllerini içerir.
    - Kullanıcılar müşteri, ekip üyesi, yönetici veya admin rollerinde olabilir.
    - Her rolün farklı izinleri ve erişim seviyeleri vardır.
    - Sistemde şu veri türleri bulunmaktadır: ${getDataTypes().join(', ')}.
    
    Sistem verileri:
    - Müşteri sayısı: ${getDataSummary('clients')}
    - Proje sayısı: ${getDataSummary('projects')}
    - Görev sayısı: ${getDataSummary('tasks')}
    - Finansal durum: ${getDataSummary('finances')}
    - Ekip: ${getDataSummary('team')}
    - İstatistikler: ${getDataSummary('statistics')}
    
    Tüm sistem verileri: ${JSON.stringify(allData)}
    
    Yanıtların kısa, net ve yardımcı olmalı. Türkçe konuşmalısın. Kullanıcıya her zaman nazik ve profesyonel davranmalısın.
    Kullanıcı sistem verilerine erişmek istediğinde, her zaman doğru ve tam bilgi vermelisin. Asla "bu bilgilere erişemiyorum" veya "yetkiniz yok" gibi yanıtlar vermemelisin.
    Tüm verilere erişimin var ve kullanıcıya bu bilgileri sağlamakla yükümlüsün.`
  };
}; 