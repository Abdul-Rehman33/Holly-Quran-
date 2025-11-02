// Global variables
let themeToggle, htmlElement;
let hamburgerBtn, mobileNav, hamburgerIcon;

// Theme Toggle Functions
function updateToggleIcon(isDark) {
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");

    if (isDark) {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
    } else {
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
    }
}

function initializeTheme() {
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem("theme");

    // If we have a saved theme, apply it
    if (savedTheme) {
        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(savedTheme);
        document.body.classList.toggle("dark-mode", savedTheme === "dark");
        updateToggleIcon(savedTheme === "dark");
    } else {
        // If no saved theme, check system preference
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(prefersDark ? "dark" : "light");
        document.body.classList.toggle("dark-mode", prefersDark);
        updateToggleIcon(prefersDark);
    }
}

function setupThemeToggle() {
    themeToggle.addEventListener("click", () => {
        const isDark = htmlElement.classList.contains("dark");

        // Toggle the theme
        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(isDark ? "light" : "dark");
        document.body.classList.toggle("dark-mode", !isDark);

        // Save the preference
        localStorage.setItem("theme", isDark ? "light" : "dark");

        // Update the toggle icon
        updateToggleIcon(!isDark);
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    mobileNav.classList.toggle("open");
    hamburgerIcon.classList.toggle("active");

    // Toggle aria-expanded for accessibility
    const isOpen = mobileNav.classList.contains("open");
    hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

    // Add/remove overlay element
    if (isOpen) {
        createOverlay();
    } else {
        removeOverlay();
    }
}

function closeMobileMenu() {
    mobileNav.classList.remove("open");
    hamburgerIcon.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    removeOverlay();
}

function createOverlay() {
    let overlay = document.querySelector(".menu-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "menu-overlay active";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "10";
        document.body.appendChild(overlay);

        // Close menu when clicking on overlay
        overlay.addEventListener("click", closeMobileMenu);
    } else {
        overlay.classList.add("active");
    }
}

function removeOverlay() {
    const overlay = document.querySelector(".menu-overlay");
    if (overlay) {
        overlay.remove();
    }
}

function setupMobileMenu() {
    // Add click event listener to hamburger button if it exists
    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener("click", toggleMobileMenu);

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll("a");
        mobileNavLinks.forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (
                mobileNav.classList.contains("open") &&
                !mobileNav.contains(e.target) &&
                !hamburgerBtn.contains(e.target)
            ) {
                closeMobileMenu();
            }
        });

        // Close menu on window resize if screen becomes larger than mobile breakpoint
        window.addEventListener("resize", () => {
            if (
                window.innerWidth > 768 &&
                mobileNav.classList.contains("open")
            ) {
                closeMobileMenu();
            }
        });
    }
}

// Function to render Quran features using DOM manipulation
function renderQuranFeatures() {
    // Get the features container element
    const featuresContainer = document.getElementById("features-container");

    // Return early if the container doesn't exist (not on the homepage)
    if (!featuresContainer) return;

    // Define the features data
    const features = [
        {
            icon: "📖",
            title: "Divine Revelation",
            description:
                "The Quran is the literal word of Allah revealed to Prophet Muhammad ﷺ through Angel Jibreel over a period of 23 years.",
        },
        {
            icon: "🌍",
            title: "Universal Guidance",
            description:
                "The Quran provides comprehensive guidance for all aspects of human life, addressing individuals and societies across all times.",
        },
        {
            icon: "🔄",
            title: "Perfectly Preserved",
            description:
                "The Quran remains unchanged since its revelation, preserved in its original Arabic text, letter by letter.",
        },
        {
            icon: "💫",
            title: "Miraculous Nature",
            description:
                "The Quran's linguistic excellence, scientific accuracy, and prophetic information stand as evidence of its divine origin.",
        },
        {
            icon: "❤️",
            title: "Spiritual Healing",
            description:
                "The Quran provides comfort, peace, and healing for the hearts and minds of those who reflect upon its verses.",
        },
        {
            icon: "⚖️",
            title: "Comprehensive Law",
            description:
                "The Quran establishes principles of justice, ethics, and morality that form the foundation of Islamic law and society.",
        },
    ];

    // Loop through the features and create elements for each one
    features.forEach((feature) => {
        // Create the main feature div
        const featureDiv = document.createElement("div");
        featureDiv.className =
            "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300";

        // Create the icon div
        const iconDiv = document.createElement("div");
        iconDiv.className =
            "text-emerald-600 dark:text-emerald-400 text-4xl mb-4";
        iconDiv.textContent = feature.icon;

        // Create the title element
        const titleEl = document.createElement("h3");
        titleEl.className = "text-xl font-bold mb-2";
        titleEl.textContent = feature.title;

        // Create the description paragraph
        const descEl = document.createElement("p");
        descEl.className = "text-gray-600 dark:text-gray-300";
        descEl.textContent = feature.description;

        // Append all elements to the feature div
        featureDiv.appendChild(iconDiv);
        featureDiv.appendChild(titleEl);
        featureDiv.appendChild(descEl);

        // Add an animation effect when the feature comes into view
        featureDiv.style.opacity = "0";
        featureDiv.style.transform = "translateY(20px)";
        featureDiv.style.transition = "opacity 0.5s, transform 0.5s";

        // Append the feature div to the container
        featuresContainer.appendChild(featureDiv);
    });

    // Add fade-in animation for features as they come into view
    setTimeout(() => {
        const featureDivs = featuresContainer.querySelectorAll("div");
        featureDivs.forEach((div, index) => {
            setTimeout(() => {
                div.style.opacity = "1";
                div.style.transform = "translateY(0)";
            }, index * 150);
        });
    }, 100);
}

// Function to render Surahs grid using DOM manipulation
function renderSurahs() {
    // Get the Surahs container element
    const surahsContainer = document.getElementById("surahs-container");

    // Return early if the container doesn't exist (not on the surahs page)
    if (!surahsContainer) return;

    // Define the surahs data
    const surahs = [
        {
            number: 1,
            name: "Surah Al-Fatiha",
            translation: "The Opening",
            arabic: "سورة الفاتحة",
            urdu: "آغاز",
            verses: 7,
            link: "surah-fatiha.html",
        },
        {
            number: 112,
            name: "Surah Al-Ikhlas",
            translation: "The Sincerity",
            arabic: "سورة الإخلاص",
            urdu: "خالص",
            verses: 4,
            link: "surah-ikhlas.html",
        },
        {
            number: 113,
            name: "Surah Al-Falaq",
            translation: "The Daybreak",
            arabic: "سورة الفلق",
            urdu: "سویرا",
            verses: 5,
            link: "surah-falaq.html",
        },
        {
            number: 114,
            name: "Surah An-Nas",
            translation: "The Mankind",
            arabic: "سورة الناس",
            urdu: "انسانوں",
            verses: 6,
            link: "surah-nas.html",
        },
    ];

    // Loop through the surahs and create elements for each one
    surahs.forEach((surah) => {
        // Create the main surah link element
        const surahLink = document.createElement("a");
        surahLink.href = surah.link;
        surahLink.className =
            "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300";

        // Create header with number and verses count
        const header = document.createElement("div");
        header.className = "flex justify-between items-center mb-4";

        const numberSpan = document.createElement("span");
        numberSpan.className =
            "bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold";
        numberSpan.textContent = surah.number;

        const versesSpan = document.createElement("span");
        versesSpan.className = "text-gray-500 dark:text-gray-400";
        versesSpan.textContent = `${surah.verses} Verses`;

        header.appendChild(numberSpan);
        header.appendChild(versesSpan);

        // Create title elements
        const titleEl = document.createElement("h2");
        titleEl.className = "text-2xl font-bold mb-2";
        titleEl.textContent = surah.name;

        const translationEl = document.createElement("p");
        translationEl.className = "text-gray-600 dark:text-gray-300 mb-4";
        translationEl.textContent = surah.translation;

        // Create Arabic and Urdu text elements
        const arabicEl = document.createElement("div");
        arabicEl.className = "arabic text-right text-2xl mb-2";
        arabicEl.textContent = surah.arabic;

        const urduEl = document.createElement("div");
        urduEl.className = "urdu text-right text-lg";
        urduEl.textContent = surah.urdu;

        // Append all elements to the surah link
        surahLink.appendChild(header);
        surahLink.appendChild(titleEl);
        surahLink.appendChild(translationEl);
        surahLink.appendChild(arabicEl);
        surahLink.appendChild(urduEl);

        // Add animation effect
        surahLink.style.opacity = "0";
        surahLink.style.transform = "translateY(20px)";
        surahLink.style.transition = "opacity 0.5s, transform 0.5s";

        // Append the surah link to the container
        surahsContainer.appendChild(surahLink);
    });

    // Add fade-in animation for surahs as they come into view
    setTimeout(() => {
        const surahLinks = surahsContainer.querySelectorAll("a");
        surahLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = "1";
                link.style.transform = "translateY(0)";
            }, index * 150);
        });
    }, 100);
}

// Function to render Featured Translations using DOM manipulation
function renderFeaturedTranslations() {
    // Get the featured translations container element
    const translationsContainer = document.getElementById("translations-container");
    
    // Return early if the container doesn't exist (not on the translations page)
    if (!translationsContainer) return;
    
    // Define the translations data
    const translations = [
        {
            name: "Surah Al-Fatiha Translation",
            chapter: 1,
            verses: 7,
            description: "Read the complete Urdu translation of Surah Al-Fatiha (The Opening).",
            link: "surah-fatiha.html"
        },
        {
            name: "Surah Al-Ikhlas Translation",
            chapter: 112,
            verses: 4,
            description: "Read the complete Urdu translation of Surah Al-Ikhlas (The Sincerity).",
            link: "surah-ikhlas.html"
        },
        {
            name: "Surah Al-Falaq Translation",
            chapter: 113,
            verses: 5,
            description: "Read the complete Urdu translation of Surah Al-Falaq (The Daybreak).",
            link: "surah-falaq.html"
        },
        {
            name: "Surah An-Nas Translation",
            chapter: 114,
            verses: 6,
            description: "Read the complete Urdu translation of Surah An-Nas (The Mankind).",
            link: "surah-nas.html"
        }
    ];
    
    // Loop through the translations and create elements for each one
    translations.forEach((translation) => {
        // Create the main translation link element
        const translationLink = document.createElement("a");
        translationLink.href = translation.link;
        translationLink.className = "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300";
        
        // Create the title element
        const titleEl = document.createElement("h3");
        titleEl.className = "text-xl font-bold mb-4";
        titleEl.textContent = translation.name;
        
        // Create chapter and verses count element
        const infoDiv = document.createElement("div");
        infoDiv.className = "flex justify-between items-center mb-4";
        
        const chapterSpan = document.createElement("span");
        chapterSpan.className = "text-emerald-600 dark:text-emerald-400";
        chapterSpan.textContent = `Chapter ${translation.chapter}`;
        
        const versesSpan = document.createElement("span");
        versesSpan.className = "text-gray-500 dark:text-gray-400";
        versesSpan.textContent = `${translation.verses} Verses`;
        
        infoDiv.appendChild(chapterSpan);
        infoDiv.appendChild(versesSpan);
        
        // Create description paragraph
        const descEl = document.createElement("p");
        descEl.className = "text-gray-600 dark:text-gray-300 mb-4";
        descEl.textContent = translation.description;
        
        // Create "View Translation" text
        const viewTranslationDiv = document.createElement("div");
        viewTranslationDiv.className = "text-emerald-600 dark:text-emerald-400 font-medium";
        viewTranslationDiv.textContent = "View Translation →";
        
        // Append all elements to the translation link
        translationLink.appendChild(titleEl);
        translationLink.appendChild(infoDiv);
        translationLink.appendChild(descEl);
        translationLink.appendChild(viewTranslationDiv);
        
        // Add animation effect
        translationLink.style.opacity = "0";
        translationLink.style.transform = "translateY(20px)";
        translationLink.style.transition = "opacity 0.5s, transform 0.5s";
        
        // Append the translation link to the container
        translationsContainer.appendChild(translationLink);
    });
    
    // Add fade-in animation for translations as they come into view
    setTimeout(() => {
        const translationLinks = translationsContainer.querySelectorAll("a");
        translationLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = "1";
                link.style.transform = "translateY(0)";
            }, index * 150);
        });
    }, 100);
}

// Main initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize theme-related elements
    themeToggle = document.getElementById("theme-toggle");
    htmlElement = document.documentElement;

    // Initialize mobile menu elements
    hamburgerBtn = document.getElementById("hamburger-btn");
    mobileNav = document.getElementById("mobile-nav");
    hamburgerIcon = hamburgerBtn?.querySelector(".hamburger-icon");

    // Initialize theme
    initializeTheme();

    // Setup theme toggle functionality
    setupThemeToggle();

    // Setup mobile menu functionality
    setupMobileMenu();

    // Render features using DOM manipulation
    renderQuranFeatures();

    // Render surahs using DOM manipulation
    renderSurahs();

    // Render featured translations using DOM manipulation
    renderFeaturedTranslations();
});
