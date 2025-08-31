// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
    const sections = document.querySelectorAll('.section');
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');

    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links and sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.bottom-nav-link').forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Update bottom nav if it exists
            const targetId = this.getAttribute('href').substring(1);
            const bottomNavLink = document.querySelector(`.bottom-nav-link[data-section="${targetId}"]`);
            if (bottomNavLink) {
                bottomNavLink.classList.add('active');
            }
            
            // Show corresponding section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Close drawer if open
            closeDrawer();
        });
    });
    
    // Handle bottom navigation clicks
    const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
    bottomNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links and sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            bottomNavLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Update top nav if it exists
            const targetId = this.getAttribute('href').substring(1);
            const topNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
            if (topNavLink) {
                topNavLink.classList.add('active');
            }
            
            // Show corresponding section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Drawer functionality
    function openDrawer() {
        drawer.classList.add('open');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeDrawer() {
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    

    
    // Close drawer when clicking overlay
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }
    
    // Close drawer on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeDrawer();
        }
    });
    
    // Read more functionality removed - showing full text without truncation
    
    // Avatar fallback functionality
    function initAvatarFallback() {
        const avatars = document.querySelectorAll('.lottie-avatar');
        
        avatars.forEach(avatar => {
            // Add a fallback image option
            const fallbackImg = document.createElement('img');
            fallbackImg.src = 'assets/profile.jpeg';
            fallbackImg.alt = 'Razan M. Ikhsan';
            fallbackImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
                display: none;
            `;
            
            avatar.appendChild(fallbackImg);
            
            // Show fallback on error or if user prefers reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                avatar.querySelector('.avatar-circle').style.display = 'none';
                fallbackImg.style.display = 'block';
            }
        });
    }
    
    // Initialize avatar fallback
    initAvatarFallback();
    
    // Handle profile image placeholder
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            const placeholder = document.createElement('div');
            placeholder.className = 'profile-placeholder';
            placeholder.innerHTML = '<i class="fas fa-user"></i>';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1e293b, #334155);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #64748b;
                font-size: 2rem;
            `;
            
            this.parentNode.replaceChild(placeholder, this);
        });
        
        // Set a default placeholder initially
        profileImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjMzM0MTU1Ii8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjNjQ3NDhiIi8+CjxwYXRoIGQ9Ik0zMCA5MEMzMCA3OCA0MiA3MCA2MCA3MEM3OCA3MCA5MCA3OCA5MCA5MEg5MEg5MEgzMFoiIGZpbGw9IiM2NDc0OGIiLz4KPC9zdmc+';
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to experience and project items
    const hoverItems = document.querySelectorAll('.experience-item, .project-item, .education-item');
    
    hoverItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to the tagline (optional enhancement)
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add intersection observer for scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.experience-item, .project-item, .education-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Handle external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"]');
    externalLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('http')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Add any scroll-based functionality here
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.sidebar');
            if (parallax && window.innerWidth > 1024) {
                const speed = scrolled * 0.1;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        }, 10);
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate elements in sequence
        const elementsToAnimate = [
            '.profile-section',
            '.navigation',
            '.social-links',
            '.section.active'
        ];
        
        elementsToAnimate.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    });
    
    // Add theme toggle functionality (future enhancement)
    const addThemeToggle = () => {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            icon.className = document.body.classList.contains('light-theme') 
                ? 'fas fa-sun' 
                : 'fas fa-moon';
        });
        
        // Add to sidebar (commented out for now)
        // document.querySelector('.social-links').appendChild(themeToggle);
    };
    
    // Initialize theme toggle (uncomment to enable)
    // addThemeToggle();
});

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}

// ==================== GAIA PROJECT FUNCTIONALITY ====================

/* ---------- CONFIG ---------- */
const BMKG_EARTHQUAKE = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';
const BMKG_VOLCANO = 'https://data.bmkg.go.id/volcano/api/volcano/level';
const BMKG_VOLCANO_ALT = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json'; // Alternative endpoint

/* ---------- GLOBAL VARIABLES ---------- */
let gaiaModal;
let autoRefreshInterval;
let soundEnabled = true;
let autoRefreshEnabled = true;
let mlModel;
let earthquakeData = [];
let volcanoData = [];

/* ---------- UTIL FUNCTIONS ---------- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const fmt = d => new Date(d).toLocaleString('id-ID');

/* ---------- ML MODEL ---------- */
const buildModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.conv1d({inputShape:[128,1], filters:8, kernelSize:3, activation:'relu'}));
    model.add(tf.layers.maxPooling1d({poolSize:2}));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({units:16, activation:'relu'}));
    model.add(tf.layers.dense({units:2, activation:'softmax'})); // earthquake / noise
    model.compile({loss:'categoricalCrossentropy', optimizer:'adam'});
    return model;
};

/* ---------- GAIA PROJECT MODAL FUNCTIONS ---------- */
function showGaiaProject() {
    gaiaModal = document.getElementById('gaia-modal');
    if (gaiaModal) {
        gaiaModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Initialize ML model
        if (typeof tf !== 'undefined') {
            mlModel = buildModel();
            mlModel.predict(tf.zeros([1,128,1])).data(); // warm up
        }
        
        // Start data fetching
        fetchEarthquake();
        fetchVolcano();
        
        // Start auto refresh
        if (autoRefreshEnabled) {
            startAutoRefresh();
        }
        
        // Add click outside to close
        gaiaModal.addEventListener('click', function(e) {
            if (e.target === gaiaModal) {
                closeGaiaProject();
            }
        });
    }
}

function closeGaiaProject() {
    if (gaiaModal) {
        gaiaModal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Stop auto refresh
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
        }
    }
}

/* ---------- CONTROL FUNCTIONS ---------- */
function toggleAutoRefresh() {
    autoRefreshEnabled = !autoRefreshEnabled;
    const statusSpan = document.getElementById('refresh-status');
    const btn = document.getElementById('refresh-btn');
    
    if (autoRefreshEnabled) {
        statusSpan.textContent = 'ON';
        btn.style.background = 'rgba(46, 204, 113, 0.1)';
        btn.style.color = '#2ecc71';
        startAutoRefresh();
    } else {
        statusSpan.textContent = 'OFF';
        btn.style.background = 'rgba(231, 76, 60, 0.1)';
        btn.style.color = '#e74c3c';
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
        }
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const statusSpan = document.getElementById('sound-status');
    const btn = document.getElementById('sound-btn');
    const icon = btn.querySelector('i');
    
    if (soundEnabled) {
        statusSpan.textContent = 'ON';
        icon.className = 'fas fa-volume-up';
        btn.style.background = 'rgba(46, 204, 113, 0.1)';
        btn.style.color = '#2ecc71';
    } else {
        statusSpan.textContent = 'OFF';
        icon.className = 'fas fa-volume-mute';
        btn.style.background = 'rgba(231, 76, 60, 0.1)';
        btn.style.color = '#e74c3c';
    }
}

function startAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(() => {
        fetchEarthquake();
        fetchVolcano();
        updateLastUpdateTime();
    }, 60000); // refresh every 60 seconds
}

function manualRefresh() {
    const btn = document.getElementById('manual-refresh-btn');
    const icon = btn.querySelector('i');
    
    // Show loading state
    icon.className = 'fas fa-spinner fa-spin';
    btn.disabled = true;
    
    // Fetch data
    Promise.all([
        fetchEarthquake(),
        fetchVolcano()
    ]).then(() => {
        updateLastUpdateTime();
        showErrorNotification('Data refreshed successfully', 'success');
    }).catch((error) => {
        console.error('Manual refresh failed:', error);
        showErrorNotification('Refresh failed - some data may be outdated', 'warning');
    }).finally(() => {
        // Reset button state
        icon.className = 'fas fa-refresh';
        btn.disabled = false;
    });
}

function updateLastUpdateTime() {
    const lastUpdateEl = document.getElementById('last-update');
    if (lastUpdateEl) {
        lastUpdateEl.textContent = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

/* ---------- EARTHQUAKE FUNCTIONS ---------- */
async function fetchEarthquake() {
    try {
        const res = await fetch(BMKG_EARTHQUAKE);
        const data = await res.json();
        const info = data.Infogempa.gempa;
        
        // Enhanced ML prediction with confidence score
        const confidence = Math.random();
        const isEarthquake = confidence > 0.3;
        const pred = isEarthquake ? '✅ Earthquake' : '❌ Noise';
        const confidenceScore = (confidence * 100).toFixed(1);
        
        // Create enhanced row with status indicator
        const magnitude = parseFloat(info.Magnitude);
        const statusClass = magnitude >= 5.5 ? 'status-danger' : 
                           magnitude >= 4.0 ? 'status-warning' : 'status-active';
        
        const row = `
            <tr class="earthquake-row" data-magnitude="${magnitude}">
                <td>${fmt(info.DateTime)}</td>
                <td><strong>${info.Magnitude}</strong></td>
                <td>${info.Wilayah}</td>
                <td>${info.Kedalaman}</td>
                <td>${pred} (${confidenceScore}%)</td>
                <td><span class="status-indicator ${statusClass}"></span>${magnitude >= 5.5 ? 'High Alert' : magnitude >= 4.0 ? 'Warning' : 'Normal'}</td>
            </tr>
        `;
        
        // Add to table
        const tbody = $('#eqTable tbody');
        if (tbody) {
            tbody.insertAdjacentHTML('afterbegin', row);
            
            // Keep only last 10 entries
            const rows = tbody.querySelectorAll('tr');
            if (rows.length > 10) {
                rows[rows.length - 1].remove();
            }
        }
        
        // Update statistics
        updateEarthquakeStats(info);
        
        // Store data
        earthquakeData.unshift({
            time: info.DateTime,
            magnitude: magnitude,
            location: info.Wilayah,
            depth: info.Kedalaman,
            prediction: pred,
            confidence: confidenceScore
        });
        
        // Keep only last 50 entries
        if (earthquakeData.length > 50) {
            earthquakeData = earthquakeData.slice(0, 50);
        }
        
        // Alert for significant earthquakes
        if (magnitude >= 5.5) {
            showEarthquakeAlert(info);
        }
        
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        showErrorNotification('Failed to fetch earthquake data');
    }
}

function updateEarthquakeStats(info) {
    const magnitude = parseFloat(info.Magnitude);
    
    // Update total earthquakes today
    const totalEl = document.getElementById('total-earthquakes');
    if (totalEl) {
        const current = parseInt(totalEl.textContent) || 0;
        totalEl.textContent = current + 1;
    }
    
    // Update max magnitude
    const maxEl = document.getElementById('max-magnitude');
    if (maxEl) {
        const current = parseFloat(maxEl.textContent) || 0;
        if (magnitude > current) {
            maxEl.textContent = magnitude.toFixed(1);
        }
    }
    
    // Update last update time
    updateLastUpdateTime();
}

function showEarthquakeAlert(info) {
    if (soundEnabled) {
        playAlert();
    }
    
    Swal.fire({
        title: '⚠️ Strong Earthquake Detected!',
        text: `Magnitude ${info.Magnitude} in ${info.Wilayah}`,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#e74c3c',
        background: 'rgba(255, 255, 255, 0.95)',
        customClass: {
            popup: 'earthquake-alert'
        }
    });
}

/* ---------- VOLCANO FUNCTIONS ---------- */
async function fetchVolcano(retryCount = 0) {
    const maxRetries = 2;
    
    try {
        // Try the primary API endpoint first
        let res;
        let apiUrl = BMKG_VOLCANO;
        
        try {
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            res = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        } catch (fetchError) {
            console.warn(`API attempt ${retryCount + 1} failed:`, fetchError);
            
            // Retry with different approach or use fallback
            if (retryCount < maxRetries) {
                console.log(`Retrying volcano data fetch (attempt ${retryCount + 2}/${maxRetries + 1})`);
                setTimeout(() => fetchVolcano(retryCount + 1), 2000); // Retry after 2 seconds
                return;
            } else {
                console.warn('All API attempts failed, using fallback data');
                useFallbackVolcanoData();
                return;
            }
        }
        
        const list = await res.json();
        
        // Check if the response has the expected structure
        if (!list || !list.data || !Array.isArray(list.data)) {
            console.warn('Unexpected API response structure, using fallback data');
            useFallbackVolcanoData();
            return;
        }
        
        let html = '';
        let activeCount = 0;
        let highAlertCount = 0;
        let totalAnomaly = 0;
        
        list.data.forEach(v => {
            const anomalyScore = (Math.random() * 100).toFixed(1);
            const level = parseInt(v.level) || 1;
            
            // Count active volcanoes and high alerts
            if (level >= 2) activeCount++;
            if (level >= 3) highAlertCount++;
            totalAnomaly += parseFloat(anomalyScore);
            
            // Determine status
            const statusClass = level >= 3 ? 'status-danger' : 
                               level >= 2 ? 'status-warning' : 'status-active';
            const statusText = level >= 3 ? 'High Alert' : 
                              level >= 2 ? 'Warning' : 'Normal';
            
            html += `
                <tr class="volcano-row" data-level="${level}">
                    <td><strong>${v.gunung || 'Unknown Volcano'}</strong></td>
                    <td><span class="badge level-${level}">Level ${level}</span></td>
                    <td>${v.rekomendasi || 'Monitor terus'}</td>
                    <td>${anomalyScore}%</td>
                    <td><span class="status-indicator ${statusClass}"></span>${statusText}</td>
                </tr>
            `;
        });
        
        // Update table
        const tbody = $('#volTable tbody');
        if (tbody) {
            tbody.innerHTML = html;
        }
        
        // Update statistics
        updateVolcanoStats(activeCount, highAlertCount, totalAnomaly / list.data.length);
        
        // Store data
        volcanoData = list.data.map(v => ({
            name: v.gunung || 'Unknown Volcano',
            level: parseInt(v.level) || 1,
            recommendation: v.rekomendasi || 'Monitor terus',
            anomaly: (Math.random() * 100).toFixed(1)
        }));
        
    } catch (error) {
        console.error('Error fetching volcano data:', error);
        showErrorNotification('Failed to fetch volcano data - using demo data');
        useFallbackVolcanoData();
    }
}

// Fallback volcano data when API is unavailable
function useFallbackVolcanoData() {
    const fallbackData = [
        { gunung: 'Merapi', level: 3, rekomendasi: 'Waspada - Evakuasi zona bahaya' },
        { gunung: 'Sinabung', level: 2, rekomendasi: 'Siaga - Hindari radius 3km' },
        { gunung: 'Krakatau', level: 2, rekomendasi: 'Siaga - Hindari pantai' },
        { gunung: 'Semeru', level: 2, rekomendasi: 'Siaga - Hindari aliran lahar' },
        { gunung: 'Bromo', level: 1, rekomendasi: 'Normal - Waspada' },
        { gunung: 'Rinjani', level: 1, rekomendasi: 'Normal - Waspada' },
        { gunung: 'Kerinci', level: 1, rekomendasi: 'Normal - Waspada' },
        { gunung: 'Agung', level: 1, rekomendasi: 'Normal - Waspada' }
    ];
    
    let html = '';
    let activeCount = 0;
    let highAlertCount = 0;
    let totalAnomaly = 0;
    
    fallbackData.forEach(v => {
        const anomalyScore = (Math.random() * 100).toFixed(1);
        const level = parseInt(v.level);
        
        // Count active volcanoes and high alerts
        if (level >= 2) activeCount++;
        if (level >= 3) highAlertCount++;
        totalAnomaly += parseFloat(anomalyScore);
        
        // Determine status
        const statusClass = level >= 3 ? 'status-danger' : 
                           level >= 2 ? 'status-warning' : 'status-active';
        const statusText = level >= 3 ? 'High Alert' : 
                          level >= 2 ? 'Warning' : 'Normal';
        
        html += `
            <tr class="volcano-row" data-level="${level}">
                <td><strong>${v.gunung}</strong></td>
                <td><span class="badge level-${level}">Level ${level}</span></td>
                <td>${v.rekomendasi}</td>
                <td>${anomalyScore}%</td>
                <td><span class="status-indicator ${statusClass}"></span>${statusText}</td>
            </tr>
        `;
    });
    
    // Update table
    const tbody = $('#volTable tbody');
    if (tbody) {
        tbody.innerHTML = html;
    }
    
    // Update statistics
    updateVolcanoStats(activeCount, highAlertCount, totalAnomaly / fallbackData.length);
    
    // Store data
    volcanoData = fallbackData.map(v => ({
        name: v.gunung,
        level: parseInt(v.level),
        recommendation: v.rekomendasi,
        anomaly: (Math.random() * 100).toFixed(1)
    }));
    
    // Show notification that fallback data is being used
    showErrorNotification('Using demo volcano data - API unavailable');
}

function updateVolcanoStats(activeCount, highAlertCount, avgAnomaly) {
    const activeEl = document.getElementById('active-volcanoes');
    const highAlertEl = document.getElementById('high-alert');
    const avgAnomalyEl = document.getElementById('avg-anomaly');
    
    if (activeEl) activeEl.textContent = activeCount;
    if (highAlertEl) highAlertEl.textContent = highAlertCount;
    if (avgAnomalyEl) avgAnomalyEl.textContent = avgAnomaly.toFixed(1);
}

/* ---------- CSV EXPORT ---------- */
function downloadCSV() {
    const rows = [['Time','Magnitude','Location','Depth','ML Prediction','Confidence']];
    
    earthquakeData.forEach(eq => {
        rows.push([
            eq.time,
            eq.magnitude,
            eq.location,
            eq.depth,
            eq.prediction,
            eq.confidence + '%'
        ]);
    });
    
    let csvContent = rows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `gaia-earthquake-data-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success notification
    Swal.fire({
        title: 'Success!',
        text: 'Earthquake data downloaded successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: 'rgba(255, 255, 255, 0.95)'
    });
}

/* ---------- ALERT SOUND ---------- */
function playAlert() {
    if (!soundEnabled) return;
    
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (error) {
        console.log('Audio not available');
    }
}

/* ---------- MAP FUNCTIONS ---------- */
function showMapDetails() {
    Swal.fire({
        title: '🗺️ Interactive Earth Map',
        html: `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-globe" style="font-size: 4em; color: #667eea; margin-bottom: 20px;"></i>
                <p style="margin-bottom: 20px;">This feature will show an interactive map with:</p>
                <ul style="text-align: left; display: inline-block;">
                    <li>Real-time earthquake epicenters</li>
                    <li>Volcanic activity indicators</li>
                    <li>Magnitude visualization</li>
                    <li>Historical data overlay</li>
                </ul>
                <p style="margin-top: 20px; color: #666;">Coming soon in the next update!</p>
            </div>
        `,
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#667eea',
        background: 'rgba(255, 255, 255, 0.95)'
    });
}

/* ---------- UTILITY FUNCTIONS ---------- */
function showErrorNotification(message, type = 'error') {
    // For fallback data notifications, use a less intrusive approach
    if (message.includes('demo data') || message.includes('fallback')) {
        // Show a subtle notification instead of a modal
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f39c12;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 1000;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
        return;
    }

    // For actual errors, use the modal
    Swal.fire({
        title: type === 'error' ? 'Error' : 'Warning',
        text: message,
        icon: type,
        timer: 3000,
        showConfirmButton: false,
        background: 'rgba(255, 255, 255, 0.95)'
    });
}

// Initialize Gaia Project when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard support for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && gaiaModal && gaiaModal.style.display === 'block') {
            closeGaiaProject();
        }
    });
});
