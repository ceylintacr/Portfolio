/* =====================================================
   SİTE İÇERİĞİ
   Kişisel bilgilerini, yeteneklerini ve projelerini
   sadece bu dosyadan düzenleyebilirsin.
   Çevrilecek metinler { tr: "...", en: "..." } şeklinde yazılır;
   iki dilde aynı olanlar düz metin olarak kalabilir.
===================================================== */

window.SITE = {
    name: "Ceylin Tuğba Acar",
    role: { tr: "Bilgisayar Mühendisliği Öğrencisi", en: "Computer Engineering Student" },
    location: "İzmit, Kocaeli",
    photo: "images/profile.jpg",         // Yoksa baş harf gösterilir
    cv: { tr: "CeylinTugbaAcar_CV.pdf", en: "CeylinTugbaAcar_CV_EN.pdf" },   // Boşsa "CV İndir" gizlenir

    // Hero'da sırayla yazılıp silinen ifadeler
    typing: {
        tr: [
            "oyun geliştiriyorum.",
            "web güvenliği öğreniyorum.",
            "CTF'lerde pratik yapıyorum.",
            "veri analizi araçları yapıyorum.",
            "algoritmaları sıfırdan yazıyorum."
        ],
        en: [
            "building games.",
            "learning web security.",
            "practicing in CTFs.",
            "building data analysis tools.",
            "writing algorithms from scratch."
        ]
    },

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
        { tr: "Web Güvenliği & XSS", en: "Web Security & XSS" },
        "Penetration Testing"
    ],

    // category: "oyun" | "masaustu" | "veri" | "web"
    projects: [
        {
            title: "VulnLab",
            category: "web",
            short: {
                tr: "SQL Injection, XSS ve IDOR gibi açıkları önce istismar edip sonra kapattığım eğitim laboratuvarı.",
                en: "A training lab where I exploit flaws like SQL Injection, XSS and IDOR, then fix them."
            },
            description: {
                tr: "Kasıtlı olarak güvenlik açıkları barındıran, eğitim amaçlı bir Flask uygulaması. Her seviyede bir zafiyet önce istismar ediliyor, ardından güvenli sürümü yazılıyor: SQL Injection'a karşı parametreli sorgular, XSS'e karşı otomatik HTML kaçışı, IDOR'a karşı sahiplik kontrolü ve zayıf şifre saklamaya karşı hash'leme. Güvenlik nedeniyle yalnızca yerel bilgisayarda çalışacak şekilde tasarlandı.",
                en: "A deliberately vulnerable Flask application built for learning. At each level a vulnerability is first exploited, then its secure version is written: parameterized queries against SQL Injection, automatic HTML escaping against XSS, ownership checks against IDOR and password hashing against weak password storage. For safety, it is designed to run only on the local machine."
            },
            tech: ["Python", "Flask", "SQLite", "OWASP"],
            image: "images/projects/vulnlab.webp",
            github: "https://github.com/ceylintacr/vulnlab-simulator",
            demo: ""
        },
        {
            title: "Sudoku",
            category: "oyun",
            short: {
                tr: "Denemelerini ana tahtayı bozmadan yapabildiğin pastel temalı Sudoku.",
                en: "A pastel Sudoku where you can test your guesses without touching the main board."
            },
            description: {
                tr: "Klasik Sudoku deneyimini yenilikçi \"Dallanma (Branching)\" mekaniği ile birleştiren bir bulmaca oyunu. Oyuncu bir hücrede emin değilse yeni bir dal açar, tahminini orada dener; yanlışsa dalı atar, ana tahta hiç bozulmaz. Dokunmatik uyumlu, WebGL ve Android hedefli.",
                en: "A puzzle game that combines classic Sudoku with an original \"Branching\" mechanic. When unsure about a cell, the player opens a new branch and tries the guess there; if it turns out wrong, the branch is discarded and the main board stays intact. Touch-friendly, targeting WebGL and Android."
            },
            tech: ["Unity", "C#", "UI Toolkit"],
            image: "images/projects/sudoku.webp",
            github: "https://github.com/ceylintacr/Sudoku-Oyunu",
            demo: ""
        },
        {
            title: "Çürüyen Saltanat",
            category: "oyun",
            short: {
                tr: "Lanetli ölülere karşı kadim kulelerle savunma yaptığın kule savunma oyunu.",
                en: "A tower defense game where ancient towers hold the walls against cursed undead."
            },
            description: {
                tr: "Lanetli ölülere karşı son surları kadim kulelerle savunduğun bir kule savunma (tower defense) oyunu. Dalga sistemi, kule yerleştirme ve yükseltme mekanikleri, düşman yol bulma ve oyun ekonomisi Unity ile geliştirildi.",
                en: "A tower defense game in which you defend the last walls against cursed undead with ancient towers. The wave system, tower placement and upgrades, enemy pathfinding and the in-game economy were built in Unity."
            },
            tech: ["Unity 2D", "C#", { tr: "Oyun Tasarımı", en: "Game Design" }],
            image: "images/projects/tower-defense.webp",
            github: "https://github.com/ceylintacr/Tower-Defense",
            demo: ""
        },
        {
            title: { tr: "Şifre Gücü Analizcisi", en: "Password Strength Analyzer" },
            category: "web",
            short: {
                tr: "Bir şifrenin gerçekte ne kadar güçlü olduğunu ölçen tarayıcı aracı.",
                en: "A browser tool that measures how strong a password really is."
            },
            description: {
                tr: "Klasik kontrollerin aksine şifredeki desenleri (yaygın kelimeler, yıllar, klavye dizileri, leet dönüşümleri) tespit edip gerçek entropiyi yeniden hesaplar ve farklı saldırı senaryolarında kırılma süresini tahmin eder. Şifre hiçbir yere gönderilmez; tüm analiz tarayıcıda yapılır.",
                en: "Unlike classic checks, it detects patterns in a password (common words, years, keyboard sequences, leet substitutions), recalculates its real entropy and estimates cracking time under different attack scenarios. The password never leaves the browser; all analysis runs locally."
            },
            tech: ["JavaScript", "HTML", "CSS"],
            image: "images/projects/password-analyzer.webp",
            github: "https://github.com/ceylintacr/password-strength-analyzer",
            demo: "https://ceylintacr.github.io/password-strength-analyzer/"
        },
        {
            title: { tr: "NoSQL → SQL Motoru", en: "NoSQL → SQL Engine" },
            category: "veri",
            short: {
                tr: "Yapısı bilinmeyen JSON verisini normalize edilmiş SQL şemasına dönüştürür.",
                en: "Turns JSON data of unknown structure into a normalized SQL schema."
            },
            description: {
                tr: "Yapısı önceden bilinmeyen JSON (NoSQL) verilerini çalışma zamanında analiz eden, iç içe nesneleri ve dizileri tablolara ayırıp ilişkileri (yabancı anahtarlar) kuran ve normalize edilmiş ilişkisel bir SQL veritabanı üreten dinamik bir motor.",
                en: "A dynamic engine that analyzes JSON (NoSQL) data of unknown structure at runtime, splits nested objects and arrays into tables, builds the relationships (foreign keys) and produces a normalized relational SQL database."
            },
            tech: ["Python", "SQL", "JSON"],
            image: "images/projects/nosql-sql.webp",
            github: "https://github.com/ceylintacr/NoSQL-to-SQL",
            demo: ""
        },
        {
            title: { tr: "Makale Graf Analizi", en: "Article Graph Analysis" },
            category: "masaustu",
            short: {
                tr: "Makale atıf grafı üzerinde h-index, betweenness ve k-core analizi.",
                en: "h-index, betweenness and k-core analysis on an article citation graph."
            },
            description: {
                tr: "JSON tabanlı bir makale atıf grafını yükleyip görselleştiren; h-index, betweenness merkeziliği ve k-core ayrıştırması gibi graf algoritmalarını uygulayan C# / WPF masaüstü uygulaması.",
                en: "A C# / WPF desktop application that loads and visualizes a JSON-based article citation graph and applies graph algorithms such as h-index, betweenness centrality and k-core decomposition."
            },
            tech: ["C#", "WPF", { tr: "Graf Algoritmaları", en: "Graph Algorithms" }],
            image: "images/projects/graf-analizi.webp",
            github: "https://github.com/ceylintacr/Makale-Graf-Analizi",
            demo: ""
        },
        {
            title: { tr: "Market Tahmin Analizi", en: "Market Prediction Analysis" },
            category: "veri",
            short: {
                tr: "KNN ve Karar Ağacı ile müşteri verisinden ürün kategorisi tahmini.",
                en: "Product category prediction from customer data with KNN and Decision Trees."
            },
            description: {
                tr: "KNN ve Karar Ağacı algoritmaları hiçbir kütüphane kullanılmadan sıfırdan yazıldı. Müşteri verilerinden ürün kategorisi tahmini yapan, nesne yönelimli mimariyle tasarlanmış bir Java makine öğrenmesi uygulaması.",
                en: "KNN and Decision Tree algorithms written from scratch without any libraries. A Java machine learning application with an object-oriented design that predicts product categories from customer data."
            },
            tech: ["Java", "OOP", { tr: "Makine Öğrenmesi", en: "Machine Learning" }],
            image: "images/projects/market-tahmin.webp",
            github: "https://github.com/ceylintacr/Market-Tahmin-Analizi",
            demo: ""
        },
        {
            title: { tr: "Lidar Geometrik Analiz", en: "Lidar Geometric Analysis" },
            category: "veri",
            short: {
                tr: "2D LIDAR verisi üzerinde doğru tespiti ve geometrik analiz.",
                en: "Line detection and geometric analysis on 2D LIDAR data."
            },
            description: {
                tr: "2D LIDAR sensör verilerini işleyip RANSAC algoritmasıyla noktalardan doğru parçaları tespit eden, doğrular arasındaki açı ve kesişimleri hesaplayan geometrik analiz projesi.",
                en: "A geometric analysis project that processes 2D LIDAR sensor data, detects line segments from points with the RANSAC algorithm and calculates the angles and intersections between them."
            },
            tech: ["C", "C++", "RANSAC"],
            image: "images/projects/lidar.webp",
            github: "https://github.com/ceylintacr/Lidar-Geometrik-Analiz",
            demo: ""
        },
        {
            title: "Console Notepad",
            category: "masaustu",
            short: {
                tr: "C ile yazılmış, modüler mimarili konsol metin editörü.",
                en: "A console text editor with a modular architecture, written in C."
            },
            description: {
                tr: "Dosya açma/kaydetme, dahili dosya gezgini ve geri al (undo) desteği sunan, modüler mimariye sahip konsol tabanlı bir metin editörü. Bellek yönetimi ve veri yapıları üzerine pratik.",
                en: "A console-based text editor with a modular architecture, offering file open/save, a built-in file browser and undo support. Practice in memory management and data structures."
            },
            tech: ["C", { tr: "Veri Yapıları", en: "Data Structures" }],
            image: "images/projects/console-notepad.webp",
            github: "https://github.com/ceylintacr/Console-Notepad",
            demo: ""
        }
    ],

    timeline: [
        {
            date: { tr: "Devam ediyor", en: "Present" },
            title: { tr: "Sosyal Medya Ekibi", en: "Social Media Team" },
            place: { tr: "Kocaeli Üniversitesi Bilgisayar Kulübü (KOUBK)", en: "Kocaeli University Computer Club (KOUBK)" }
        },
        {
            date: { tr: "Yaz 2026", en: "Summer 2026" },
            title: { tr: "Staj", en: "Internship" },
            place: {
                tr: "Yapay Zeka · Kocaeli Üniversitesi Akıllı Sistemler Laboratuvarı",
                en: "Artificial Intelligence · Kocaeli University Intelligent Systems Laboratory"
            }
        },
        {
            date: { tr: "09/2024 — Devam ediyor", en: "09/2024 — Present" },
            title: { tr: "Lisans", en: "Bachelor's Degree" },
            place: { tr: "Bilgisayar Mühendisliği · Kocaeli Üniversitesi", en: "Computer Engineering · Kocaeli University" },
            text: { tr: "3. sınıf öğrencisi · GNO 3,37 / 4,00", en: "3rd-year student · GPA 3.37 / 4.00" }
        },
        {
            date: "09/2020 — 06/2024",
            title: { tr: "Lise", en: "High School" },
            place: { tr: "İzmir Bornova Anadolu Lisesi", en: "İzmir Bornova Anatolian High School" }
        }
    ]
};
