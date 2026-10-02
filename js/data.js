/* =====================================================
   SİTE İÇERİĞİ
   Kişisel bilgilerini, yeteneklerini ve projelerini
   sadece bu dosyadan düzenleyebilirsin.
===================================================== */

window.SITE = {
    name: "Ceylin Tuğba Acar",
    role: "Bilgisayar Mühendisliği Öğrencisi",
    location: "İzmit, Kocaeli",
    photo: "images/profile.jpg",         // Yoksa baş harf gösterilir
    cv: "CeylinTugbaAcar_CV.pdf",         // Boş bırakırsan "CV İndir" butonu gizlenir

    // Hero'da sırayla yazılıp silinen ifadeler
    typing: [
        "oyun geliştiriyorum.",
        "web güvenliği öğreniyorum.",
        "CTF'lerde pratik yapıyorum.",
        "veri analizi araçları yapıyorum.",
        "algoritmaları sıfırdan yazıyorum."
    ],

    social: {
        email: "ceylinnntugbacar@gmail.com",
        github: "https://github.com/ceylintacr",
        linkedin: "https://www.linkedin.com/in/ceylin-acar-16460734b/"
    },

    // Formspree (https://formspree.io) adresin varsa buraya yaz, örn. "https://formspree.io/f/abcdwxyz".
    // Boş bırakılırsa form, ziyaretçinin e-posta uygulamasını hazır mesajla açar.
    formEndpoint: "https://formspree.io/f/xppwgdvz",

    skills: [
        "C / C++",
        "C#",
        "Java",
        "Python",
        "JavaScript",
        "HTML & CSS",
        "SQL / SQLite",
        "Unity",
        ".NET / WPF",
        "Git & GitHub",
        "Web Güvenliği & XSS",
        "Penetration Testing"
    ],

    // category: "oyun" | "masaustu" | "veri" | "web"
    projects: [
        {
            title: "Sudoku — Dallanma Modu",
            category: "oyun",
            short: "Denemelerini ana tahtayı bozmadan yapabildiğin pastel temalı Sudoku.",
            description: "Klasik Sudoku deneyimini yenilikçi \"Dallanma (Branching)\" mekaniği ile birleştiren bir bulmaca oyunu. Oyuncu bir hücrede emin değilse yeni bir dal açar, tahminini orada dener; yanlışsa dalı atar, ana tahta hiç bozulmaz. Dokunmatik uyumlu, WebGL ve Android hedefli.",
            tech: ["Unity", "C#", "UI Toolkit"],
            image: "images/projects/sudoku.webp",
            github: "https://github.com/ceylintacr/Sudoku-Oyunu",
            demo: ""
        },
        {
            title: "Çürüyen Saltanat",
            category: "oyun",
            short: "Lanetli ölülere karşı kadim kulelerle savunma yaptığın kule savunma oyunu.",
            description: "Lanetli ölülere karşı son surları kadim kulelerle savunduğun bir kule savunma (tower defense) oyunu. Dalga sistemi, kule yerleştirme ve yükseltme mekanikleri, düşman yol bulma ve oyun ekonomisi Unity ile geliştirildi.",
            tech: ["Unity 2D", "C#", "Oyun Tasarımı"],
            image: "images/projects/tower-defense.webp",
            github: "https://github.com/ceylintacr/Tower-Defense",
            demo: ""
        },
        {
            title: "Şifre Gücü Analizcisi",
            category: "web",
            short: "Bir şifrenin gerçekte ne kadar güçlü olduğunu ölçen tarayıcı aracı.",
            description: "Klasik kontrollerin aksine şifredeki desenleri (yaygın kelimeler, yıllar, klavye dizileri, leet dönüşümleri) tespit edip gerçek entropiyi yeniden hesaplar ve farklı saldırı senaryolarında kırılma süresini tahmin eder. Şifre hiçbir yere gönderilmez; tüm analiz tarayıcıda yapılır.",
            tech: ["JavaScript", "HTML", "CSS"],
            image: "images/projects/password-analyzer.webp",
            github: "https://github.com/ceylintacr/password-strength-analyzer",
            demo: "https://ceylintacr.github.io/password-strength-analyzer/"
        },
        {
            title: "NoSQL → SQL Motoru",
            category: "veri",
            short: "Yapısı bilinmeyen JSON verisini normalize edilmiş SQL şemasına dönüştürür.",
            description: "Yapısı önceden bilinmeyen JSON (NoSQL) verilerini çalışma zamanında analiz eden, iç içe nesneleri ve dizileri tablolara ayırıp ilişkileri (yabancı anahtarlar) kuran ve normalize edilmiş ilişkisel bir SQL veritabanı üreten dinamik bir motor.",
            tech: ["Python", "SQL", "JSON"],
            image: "images/projects/nosql-sql.webp",
            github: "https://github.com/ceylintacr/NoSQL-to-SQL",
            demo: ""
        },
        {
            title: "Makale Graf Analizi",
            category: "masaustu",
            short: "Makale atıf grafı üzerinde h-index, betweenness ve k-core analizi.",
            description: "JSON tabanlı bir makale atıf grafını yükleyip görselleştiren; h-index, betweenness merkeziliği ve k-core ayrıştırması gibi graf algoritmalarını uygulayan C# / WPF masaüstü uygulaması.",
            tech: ["C#", "WPF", "Graf Algoritmaları"],
            image: "images/projects/graf-analizi.webp",
            github: "https://github.com/ceylintacr/Makale-Graf-Analizi",
            demo: ""
        },
        {
            title: "Market Tahmin Analizi",
            category: "veri",
            short: "KNN ve Karar Ağacı ile müşteri verisinden ürün kategorisi tahmini.",
            description: "KNN ve Karar Ağacı algoritmaları hiçbir kütüphane kullanılmadan sıfırdan yazıldı. Müşteri verilerinden ürün kategorisi tahmini yapan, nesne yönelimli mimariyle tasarlanmış bir Java makine öğrenmesi uygulaması.",
            tech: ["Java", "OOP", "Makine Öğrenmesi"],
            image: "images/projects/market-tahmin.webp",
            github: "https://github.com/ceylintacr/Market-Tahmin-Analizi",
            demo: ""
        },
        {
            title: "Lidar Geometrik Analiz",
            category: "veri",
            short: "2D LIDAR verisi üzerinde doğru tespiti ve geometrik analiz.",
            description: "2D LIDAR sensör verilerini işleyip RANSAC algoritmasıyla noktalardan doğru parçaları tespit eden, doğrular arasındaki açı ve kesişimleri hesaplayan geometrik analiz projesi.",
            tech: ["C", "C++", "RANSAC"],
            image: "images/projects/lidar.webp",
            github: "https://github.com/ceylintacr/Lidar-Geometrik-Analiz",
            demo: ""
        },
        {
            title: "Console Notepad",
            category: "masaustu",
            short: "C ile yazılmış, modüler mimarili konsol metin editörü.",
            description: "Dosya açma/kaydetme, dahili dosya gezgini ve geri al (undo) desteği sunan, modüler mimariye sahip konsol tabanlı bir metin editörü. Bellek yönetimi ve veri yapıları üzerine pratik.",
            tech: ["C", "Veri Yapıları"],
            image: "images/projects/console-notepad.webp",
            github: "https://github.com/ceylintacr/Console-Notepad",
            demo: ""
        }
    ],

    timeline: [
        {
            date: "Devam ediyor",
            title: "Sosyal Medya Ekibi",
            place: "Kocaeli Üniversitesi Bilgisayar Kulübü (KOUBK)"
        },
        {
            date: "Yaz 2026",
            title: "Staj",
            place: "Yapay Zeka · Kocaeli Üniversitesi Akıllı Sistemler Laboratuvarı"
        },
        {
            date: "09/2024 — Devam ediyor",
            title: "Lisans",
            place: "Bilgisayar Mühendisliği · Kocaeli Üniversitesi",
            text: "3. sınıf öğrencisi · GNO 3,37 / 4,00"
        },
        {
            date: "09/2020 — 06/2024",
            title: "Lise",
            place: "İzmir Bornova Anadolu Lisesi"
        }
    ]
};
