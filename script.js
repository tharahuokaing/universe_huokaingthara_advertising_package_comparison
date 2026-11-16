document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("langToggleBtn");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const billingSwitch = document.getElementById("billingSwitch");
    const diffToggle = document.getElementById("diffToggle");
    const tierFilter = document.getElementById("tierFilter");
    const durationRange = document.getElementById("durationRange");
    const pickButtons = document.querySelectorAll(".pick-btn");
    const toast = document.getElementById("selectionToast");
    const toastMessage = document.getElementById("toastMessage");
    const htmlRoot = document.documentElement;

    let currentLang = "both"; // 'km', 'en', or 'both'

    // 1. Language Toggle (Khmer / English / Both)
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            if (currentLang === "both") {
                currentLang = "km";
                document.querySelectorAll(".km").forEach(el => el.style.display = "inline-block");
                document.querySelectorAll(".en").forEach(el => el.style.display = "none");
                langToggleBtn.innerText = "🇰🇭 ភាសាខ្មែរ";
            } else if (currentLang === "km") {
                currentLang = "en";
                document.querySelectorAll(".km").forEach(el => el.style.display = "none");
                document.querySelectorAll(".en").forEach(el => el.style.display = "inline-block");
                langToggleBtn.innerText = "🇬🇧 English";
            } else {
                currentLang = "both";
                document.querySelectorAll(".km").forEach(el => el.style.display = "");
                document.querySelectorAll(".en").forEach(el => el.style.display = "");
                langToggleBtn.innerText = "🇰🇭 / EN";
            }
        });
    }

    // 2. Dark / Light Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme");
            if (currentTheme === "dark") {
                htmlRoot.setAttribute("data-theme", "light");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlRoot.setAttribute("data-theme", "dark");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // 3. Monthly vs. Annual (-20%) Billing Switch
    if (billingSwitch) {
        billingSwitch.addEventListener("change", (e) => {
            const isAnnual = e.target.checked;
            document.querySelectorAll(".price-val").forEach(el => {
                el.textContent = isAnnual ? el.getAttribute("data-y") : el.getAttribute("data-m");
            });
        });
    }

    // 4. Highlight Key Differences Toggle
    if (diffToggle) {
        diffToggle.addEventListener("change", (e) => {
            const active = e.target.checked;
            const dataRows = document.querySelectorAll("#comparisonMatrix tbody tr[data-diff]");
            dataRows.forEach(row => {
                const isDiff = row.getAttribute("data-diff") === "true";
                if (!active) {
                    row.classList.remove("diff-highlighted", "diff-dimmed");
                } else if (isDiff) {
                    row.classList.add("diff-highlighted");
                    row.classList.remove("diff-dimmed");
                } else {
                    row.classList.add("diff-dimmed");
                    row.classList.remove("diff-highlighted");
                }
            });
        });
    }

    // 5. Tier Column Comparison Filter
    if (tierFilter) {
        tierFilter.addEventListener("change", (e) => {
            const mode = e.target.value;
            const cols = {
                starter: document.querySelectorAll(".col-starter"),
                standard: document.querySelectorAll(".col-standard"),
                vip: document.querySelectorAll(".col-vip"),
                enterprise: document.querySelectorAll(".col-enterprise")
            };

            // Reset visibility
            Object.values(cols).forEach(nodeList => {
                nodeList.forEach(cell => cell.classList.remove("hidden-col"));
            });

            if (mode === "starter-standard") {
                cols.vip.forEach(c => c.classList.add("hidden-col"));
                cols.enterprise.forEach(c => c.classList.add("hidden-col"));
            } else if (mode === "standard-vip") {
                cols.starter.forEach(c => c.classList.add("hidden-col"));
                cols.enterprise.forEach(c => c.classList.add("hidden-col"));
            } else if (mode === "vip-enterprise") {
                cols.starter.forEach(c => c.classList.add("hidden-col"));
                cols.standard.forEach(c => c.classList.add("hidden-col"));
            }
        });
    }

    // 6. Interactive Reach Estimator Slider
    if (durationRange) {
        durationRange.addEventListener("input", (e) => {
            const months = parseInt(e.target.value, 10);
            document.getElementById("monthsLabel").textContent = `${months} Month${months > 1 ? "s" : ""}`;
            document.getElementById("estStarter").textContent = `${(months * 2).toFixed(1)}M Views`;
            document.getElementById("estStandard").textContent = `${(months * 10).toFixed(1)}M Views`;
            document.getElementById("estVip").textContent = `${(months * 25).toFixed(1)}M Views`;
            document.getElementById("estEnterprise").textContent = `${(months * 50).toFixed(1)}M+ Views`;
        });
    }

    // 7. Quick Tier Selection Toast Notification
    let toastTimer;
    pickButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tier = btn.getAttribute("data-tier");
            toastMessage.textContent = `Selected: ${tier} — Ready for checkout!`;
            toast.classList.remove("hidden");
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                toast.classList.add("hidden");
            }, 3500);
        });
    });
});
