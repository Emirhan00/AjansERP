// Bu dosya, çevre değişkenlerinin doğru yüklenip yüklenmediğini test etmek için kullanılır
console.log('VITE_OPENAI_API_KEY:', import.meta.env.VITE_OPENAI_API_KEY ? 'Mevcut (ilk 10 karakter): ' + import.meta.env.VITE_OPENAI_API_KEY.substring(0, 10) + '...' : 'Eksik');
console.log('VITE_OPENAI_ORG_ID:', import.meta.env.VITE_OPENAI_ORG_ID ? 'Mevcut: ' + import.meta.env.VITE_OPENAI_ORG_ID : 'Eksik');

// Çevre değişkenlerinin tipini kontrol et
console.log('VITE_OPENAI_API_KEY tipi:', typeof import.meta.env.VITE_OPENAI_API_KEY);
console.log('VITE_OPENAI_ORG_ID tipi:', typeof import.meta.env.VITE_OPENAI_ORG_ID);

// Tüm çevre değişkenlerini göster
console.log('Tüm çevre değişkenleri:', import.meta.env);

export {}; // Bu dosya bir modül olarak işlenir 