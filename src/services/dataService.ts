// Mock veri servisi - gerçek bir uygulamada bu veriler API'den gelir
export const getSystemData = () => {
  return {
    clients: [
      { id: '1', name: 'Acme Şirketi', email: 'info@acme.com', status: 'active', projects: 3 },
      { id: '2', name: 'TechStart A.Ş.', email: 'contact@techstart.com', status: 'active', projects: 2 },
      { id: '3', name: 'Global Perakende', email: 'info@globalretail.com', status: 'active', projects: 4 },
      { id: '4', name: 'SağlıkPlus', email: 'info@healthplus.com', status: 'inactive', projects: 1 },
      { id: '5', name: 'Urban Giyim', email: 'contact@urbanclothing.com', status: 'active', projects: 2 },
      { id: '6', name: 'EkoDostu Ürünler', email: 'info@ecofriendly.com', status: 'active', projects: 3 },
      { id: '7', name: 'A Firması', email: 'info@afirmasi.com', status: 'active', projects: 2 },
      { id: '8', name: 'B Firması', email: 'info@bfirmasi.com', status: 'active', projects: 3 },
    ],
    projects: [
      { id: '1', name: 'Web Sitesi Yenileme', client: 'Acme Şirketi', status: 'in_progress', deadline: '2023-12-15' },
      { id: '2', name: 'Sosyal Medya Kampanyası', client: 'TechStart A.Ş.', status: 'completed', deadline: '2023-10-30' },
      { id: '3', name: 'E-ticaret Entegrasyonu', client: 'Global Perakende', status: 'in_progress', deadline: '2023-11-20' },
      { id: '4', name: 'Marka Kimliği Yenileme', client: 'Urban Giyim', status: 'planning', deadline: '2024-01-10' },
      { id: '5', name: 'SEO Optimizasyonu', client: 'EkoDostu Ürünler', status: 'in_progress', deadline: '2023-12-05' },
      { id: '6', name: 'Trendyol Panel Yönetimi', client: 'A Firması', status: 'in_progress', deadline: '2024-03-15' },
      { id: '7', name: 'Banner Tasarımı', client: 'A Firması', status: 'in_progress', deadline: '2024-02-20' },
      { id: '8', name: 'Trendyol Panel Yönetimi', client: 'B Firması', status: 'in_progress', deadline: '2024-03-30' },
      { id: '9', name: 'Meta Reklam Yönetimi', client: 'B Firması', status: 'in_progress', deadline: '2024-03-25' },
      { id: '10', name: 'Sosyal Medya Yönetimi', client: 'B Firması', status: 'in_progress', deadline: '2024-04-10' },
    ],
    tasks: [
      { id: '1', title: 'Logo Tasarımı', project: 'Marka Kimliği Yenileme', assignee: 'Ahmet Yılmaz', status: 'in_progress', priority: 'high' },
      { id: '2', title: 'İçerik Yazımı', project: 'Web Sitesi Yenileme', assignee: 'Zeynep Şahin', status: 'completed', priority: 'medium' },
      { id: '3', title: 'Sosyal Medya Görselleri', project: 'Sosyal Medya Kampanyası', assignee: 'Mehmet Kaya', status: 'in_progress', priority: 'medium' },
      { id: '4', title: 'Ürün Fotoğraf Çekimi', project: 'E-ticaret Entegrasyonu', assignee: 'Ayşe Demir', status: 'pending', priority: 'high' },
      { id: '5', title: 'Anahtar Kelime Araştırması', project: 'SEO Optimizasyonu', assignee: 'Zeynep Şahin', status: 'completed', priority: 'low' },
      { id: '6', title: 'Banner Tasarımı', project: 'Banner Tasarımı', assignee: 'Emirhan Pirgon', status: 'completed', priority: 'high' },
      { id: '7', title: 'Ürün Açıklamaları Optimizasyonu', project: 'Trendyol Panel Yönetimi', assignee: 'Mustafa Yılmaz', status: 'in_progress', priority: 'medium' },
      { id: '8', title: 'Ürün Görselleri Düzenleme', project: 'Trendyol Panel Yönetimi', assignee: 'Emirhan Pirgon', status: 'pending', priority: 'medium' },
      { id: '9', title: 'Kampanya Oluşturma', project: 'Trendyol Panel Yönetimi', assignee: 'Mustafa Yılmaz', status: 'pending', priority: 'high' },
      { id: '10', title: 'Meta Reklam Ayarları', project: 'Meta Reklam Yönetimi', assignee: 'Mehmet Kaya', status: 'completed', priority: 'high' },
      { id: '11', title: 'Hedef Kitle Analizi', project: 'Meta Reklam Yönetimi', assignee: 'Mehmet Kaya', status: 'in_progress', priority: 'medium' },
      { id: '12', title: 'İçerik Planı Oluşturma', project: 'Sosyal Medya Yönetimi', assignee: 'Mehmet Kaya', status: 'in_progress', priority: 'medium' },
      { id: '13', title: 'Görsel Tasarımlar', project: 'Sosyal Medya Yönetimi', assignee: 'Emirhan Pirgon', status: 'pending', priority: 'medium' },
    ],
    finances: {
      monthlyRevenue: 107250,
      outstandingInvoices: 40000,
      paidInvoices: 67250,
      expenses: 31200,
      profit: 76050,
      revenueByMonth: [
        { month: 'Oca', revenue: 45000 },
        { month: 'Şub', revenue: 82000 },
        { month: 'Mar', revenue: 88000 },
        { month: 'Nis', revenue: 91000 },
        { month: 'May', revenue: 95000 },
        { month: 'Haz', revenue: 107000 },
      ],
      clientInvoices: [
        { id: 'INV001', client: 'A Firması', amount: 15000, date: '2024-02-04', status: 'paid', description: 'Şubat 2024 Hizmet Bedeli' },
        { id: 'INV002', client: 'B Firması', amount: 25000, date: '2024-02-20', status: 'paid', description: 'Şubat 2024 Hizmet Bedeli' },
      ]
    },
    team: [
      { id: '1', name: 'Ahmet Yılmaz', role: 'Grafik Tasarımcı', email: 'ahmet@agency.com', projects: 3 },
      { id: '2', name: 'Zeynep Şahin', role: 'İçerik Uzmanı', email: 'zeynep@agency.com', projects: 4 },
      { id: '3', name: 'Mehmet Kaya', role: 'Sosyal Medya Uzmanı', email: 'mehmet@agency.com', projects: 5 },
      { id: '4', name: 'Ayşe Demir', role: 'Fotoğrafçı', email: 'ayse@agency.com', projects: 2 },
      { id: '5', name: 'Can Yıldız', role: 'Web Geliştirici', email: 'can@agency.com', projects: 3 },
      { id: '6', name: 'Emirhan Pirgon', role: 'Grafik Tasarımcı', email: 'emirhan@agency.com', projects: 4 },
      { id: '7', name: 'Mustafa Yılmaz', role: 'E-ticaret Uzmanı', email: 'mustafa@agency.com', projects: 3 },
    ],
    statistics: {
      activeClients: 26,
      activeProjects: 19,
      pendingTasks: 48,
      completedProjects: 10,
      projectStatusData: [
        { name: 'Zamanında', value: 14, color: '#10B981' },
        { name: 'Riskli', value: 3, color: '#F59E0B' },
        { name: 'Gecikmeli', value: 2, color: '#EF4444' },
        { name: 'Tamamlandı', value: 10, color: '#6366F1' },
      ]
    }
  };
};

// Belirli bir veri türü için veri getir
export const getData = (dataType: string) => {
  const allData = getSystemData();
  return allData[dataType as keyof typeof allData] || null;
};

// Belirli bir veri türü için sayım getir
export const getCount = (dataType: string) => {
  const data = getData(dataType);
  return Array.isArray(data) ? data.length : 0;
};

// Veri türlerini getir
export const getDataTypes = () => {
  return Object.keys(getSystemData());
};

// Veri hakkında özet bilgi getir
export const getDataSummary = (dataType: string) => {
  const data = getData(dataType);
  
  if (!data) return `${dataType} hakkında bilgi bulunamadı.`;
  
  if (dataType === 'clients') {
    return `Sistemde toplam ${getCount('clients')} müşteri bulunmaktadır. Aktif müşteri sayısı: ${
      (data as any[]).filter(client => client.status === 'active').length
    }.`;
  }
  
  if (dataType === 'projects') {
    return `Sistemde toplam ${getCount('projects')} proje bulunmaktadır. Devam eden proje sayısı: ${
      (data as any[]).filter(project => project.status === 'in_progress').length
    }.`;
  }
  
  if (dataType === 'tasks') {
    return `Sistemde toplam ${getCount('tasks')} görev bulunmaktadır. Tamamlanan görev sayısı: ${
      (data as any[]).filter(task => task.status === 'completed').length
    }.`;
  }
  
  if (dataType === 'finances') {
    const finances = data as any;
    return `Aylık gelir: ₺${finances.monthlyRevenue}. Toplam kâr: ₺${finances.profit}. Ödenmemiş faturalar: ₺${finances.outstandingInvoices}.`;
  }
  
  if (dataType === 'team') {
    return `Sistemde toplam ${getCount('team')} ekip üyesi bulunmaktadır.`;
  }
  
  if (dataType === 'statistics') {
    const stats = data as any;
    return `Aktif müşteri sayısı: ${stats.activeClients}. Aktif proje sayısı: ${stats.activeProjects}. Bekleyen görev sayısı: ${stats.pendingTasks}.`;
  }
  
  return `${dataType} için ${Array.isArray(data) ? data.length : 1} kayıt bulunmaktadır.`;
}; 