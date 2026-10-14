# Ceylin Tuğba Acar — Kişisel Portfolyo

🔗 **https://ceylinacar.vercel.app**

Saf HTML, CSS ve JavaScript ile yazılmış, framework gerektirmeyen kişisel portfolyo sitesi.

## Özellikler

- Koyu tema, lavanta ve nane yeşili vurgular; terminal tarzı logo ve `// başlık` etiketleri
- Açılışta "karakter seçme" ekranı gibi dönen platformda 3D karakter: 360° dönüş videosundan çıkarılan 60 karelik sprite (`images/turntable.webp`), fareyle ya da dokunarak sürüklenip çevrilebilir
- Filtrelenebilir proje kartları ve proje detay penceresi
- Türkçe / İngilizce dil desteği (tercih hatırlanır; `?lang=en` ile doğrudan İngilizce açılır)
- Koyu tema varsayılan, isteğe bağlı açık tema (tercih hatırlanır)
- Formspree ile çalışan iletişim formu, TR ve EN CV
- Animasyonlar Emil Kowalski'nin ilkelerine göre: kısa, amaçlı, `transform`/`opacity`; "hareketi azalt" ayarına uyar
- Mobil uyumlu, erişilebilir (klavye, odak, ekran okuyucu), 404 sayfası

## İçeriği düzenleme

Bütün kişisel bilgiler **`js/data.js`** dosyasında (çevrilecek metinler `{ tr: "...", en: "..." }` şeklinde), arayüz metinleri **`js/i18n.js`** dosyasında: isim, rol, sosyal bağlantılar,
yetenekler, projeler ve zaman çizelgesi. Kod yazmadan sadece bu dosyayı düzenlemen yeterli.

| Ne | Nereye |
|---|---|
| 3D karakter | `images/turntable.webp` (10×6 kare sprite) |
| Oturan avatar | `images/avatar.webp` (şeffaf arka plan) |
| CV | Kök klasördeki `CeylinTugbaAcar_CV.pdf` (TR) ve `CeylinTugbaAcar_CV_EN.pdf` (EN) |
| Proje görseli | `images/projects/` içine koy, projenin `image` alanına yolunu yaz |
| Hakkımda yazıları | `js/i18n.js` içindeki `about1`–`about3` |

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
