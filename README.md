# Ceylin Tuğba Acar — Kişisel Portfolyo

🔗 **https://ceylinacar.vercel.app**

Saf HTML, CSS ve JavaScript ile yazılmış, framework gerektirmeyen kişisel portfolyo sitesi.

## Özellikler

- Açık / koyu tema (tercih hatırlanır, sistem temasına uyar)
- Yazı makinesi efektli hero, mıknatıs butonlar, 3D eğilen proje kartları
- Kategoriye göre filtrelenebilen projeler ve detay penceresi (modal)
- Yetenekler ve eğitim/deneyim zaman çizelgesi
- Formspree ile çalışan iletişim formu
- Kaydırma ilerleme çubuğu, aktif menü bağlantısı, başa dön butonu
- Mobil uyumlu menü, erişilebilirlik (klavye, odak, azaltılmış hareket), 404 sayfası

## İçeriği düzenleme

Bütün kişisel bilgiler **`js/data.js`** dosyasında: isim, rol, sosyal bağlantılar,
yetenekler, projeler ve zaman çizelgesi. Kod yazmadan sadece bu dosyayı düzenlemen yeterli.

| Ne | Nereye |
|---|---|
| Profil fotoğrafı | `images/profile.jpg` (kare, en az 600×600 px) |
| CV | Kök klasördeki `CeylinTugbaAcar_CV.pdf` dosyasını değiştir |
| Proje görseli | `images/projects/` içine koy, projenin `image` alanına yolunu yaz |
| Hakkımda yazıları | `index.html` içindeki `#about` bölümü |

## Yerelde çalıştırma

```bash
python -m http.server 8080
```

Ardından tarayıcıda `http://localhost:8080` adresini aç.

## Yayınlama

**Vercel:** Klasörü GitHub'a gönder → vercel.com → *Add New Project* → depoyu seç → *Deploy*.
Ayar gerekmez (Framework: *Other*).

**GitHub Pages:** Depo ayarları → *Pages* → *Deploy from a branch* → `main` / root.

## İletişim formu

Form mesajları Formspree üzerinden e-posta olarak gelir. Adres `data.js` içindeki
`formEndpoint` alanında; boş bırakılırsa form ziyaretçinin e-posta uygulamasını açar.
