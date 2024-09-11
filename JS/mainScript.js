
$(document).ready(function () {
    $(".extra").hide();

    $(".toggle-button").click(function () {
        var extraRows = $(this).closest(".filter-genre").find(".extra");
        var icon = $(this).find("i");

        extraRows.slideToggle();
        icon.toggleClass("fa-angle-down fa-angle-up");
    });

    $(".toggle-button-1").click(function () {
        var extraRows = $(this).closest(".filter-genre").find(".extra");
        var icon = $(this).find("i");

        extraRows.slideToggle();
        icon.toggleClass("fa-angle-down fa-angle-up");
    });
});




$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('header-scrolled');
        } else {
            $('.header').removeClass('header-scrolled');
        }
    });
});


$(document).ready(function () {
    // Hide extra rows initially
    $(".extra").hide();

    // Toggle extra rows and icon
    $(".toggle-button, .toggle-button-1").click(function () {
        var extraRows = $(this).closest(".filter-genre").find(".extra");
        var icon = $(this).find("i");
        extraRows.slideToggle();
        icon.toggleClass("fa-angle-down fa-angle-up");
    });

    // Change header class on scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('header-scrolled');
        } else {
            $('.header').removeClass('header-scrolled');
        }
    });

    // Load stored companies from localStorage
    const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];

    // Append each company to the right-bar
    storedCompanies.forEach((company, index) => {
        const newCompanyElement = `
            <div class="company" data-company="${company.name}" data-tags="${company.tags}" data-location="${company.location}" data-size="${company.size}" data-kind="${company.kind}" data-exp="${company.exp}">
                <div class="Com-details">
                    <div><img src="../Media/team-building.png" alt=""></div>
                    <h1 class="underline">${company.name}</h1>
                </div>
                <div class="summary">
                <h3 class="Summary">Description:</h3>
                </div>
                <p>${company.description}</p>
                <ul class="tag">
                    <li class="innertag">${company.tags}</li>
                    <li class="innertag">${company.location}</li>
                    <button id="btnn">+</button>

                    <button onclick="viewDetails(${index})">View Details</button>
                </ul>
            </div>
        `;
        $('.right-bar').append(newCompanyElement);
    });

    // Event listeners for checkboxes
    const techFilters = document.querySelectorAll('.company-filter-tech');
    const typeFilters = document.querySelectorAll('.company-filter-type');
    const radioFilters = document.querySelectorAll('input[name="location-filter"]');
    const radiokindFilters = document.querySelectorAll('input[name="kind-filter"]');
    const jobs = document.querySelectorAll('.company');
    const rangeFilters = document.getElementById('company-filter-size');
    const rangeValue = document.getElementById('range-value');
    const rangeExp = document.getElementById('range-exp');
    const rangeExperience = document.getElementById("company-filter-experience");

    const discreteValues = ["All sizes", "1-5", "5-15", "15-50", "50-100", "100+"];
    const discreteExp = ["Experience", "Fresher", "1+", "5+"];

    // Update range value display
    rangeFilters.addEventListener('input', () => {
        const value = rangeFilters.value;
        rangeValue.textContent = discreteValues[parseInt(value) + 1]; // Adjust index for display
        filterJobs(); // Call filterJobs whenever range changes
    });

    rangeExperience.addEventListener('input', () => {
        const exp = rangeExperience.value;
        rangeExp.textContent = discreteExp[parseInt(exp) + 1]; // Use the correct array and value
        filterJobs();
    });

    // Add event listeners to other filters
    techFilters.forEach(filter => {
        filter.addEventListener('change', filterJobs);
    });
    typeFilters.forEach(filter => {
        filter.addEventListener('change', filterJobs);
    });
    radioFilters.forEach(radio => {
        radio.addEventListener('change', filterJobs);
    });
    radiokindFilters.forEach(radio => {
        radio.addEventListener('change', filterJobs);
    });

    function filterJobs() {
        const activeTechFilters = Array.from(techFilters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);
        const activeTypeFilters = Array.from(typeFilters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);
        const activeRadioFilter = document.querySelector('input[name="location-filter"]:checked')?.value;
        const activeRadioKindFilter = document.querySelector('input[name="kind-filter"]:checked')?.value;

        const selectedSize = parseInt(rangeFilters.value, 10);
        const selectedExp = parseInt(rangeExperience.value, 10);

        jobs.forEach(job => {
            const jobCompany = job.getAttribute('data-company');
            const jobTags = job.getAttribute('data-tags').split(',');
            const jobLocation = job.getAttribute('data-location');
            const jobKind = job.getAttribute('data-kind');
            const jobSize = parseInt(job.getAttribute('data-size'), 10); // Ensure jobSize is an integer
            const jobExp = job.getAttribute('data-exp');

            const matchesTechFilters = activeTechFilters.length === 0 || activeTechFilters.some(filter => jobCompany.includes(filter) || jobTags.includes(filter));
            const matchesTypeFilters = activeTypeFilters.length === 0 || activeTypeFilters.some(filter => jobTags.includes(filter));
            const matchesRadioFilter = !activeRadioFilter || jobLocation === activeRadioFilter;
            const matchesRadioKindFilter = !activeRadioKindFilter || jobKind === activeRadioKindFilter;
            const matchesSizeFilter = (selectedSize === -1) || // -1 represents "All sizes"
                (selectedSize === 0 && jobSize >= 1 && jobSize <= 5) ||
                (selectedSize === 1 && jobSize > 5 && jobSize <= 15) ||
                (selectedSize === 2 && jobSize > 15 && jobSize <= 50) ||
                (selectedSize === 3 && jobSize > 50 && jobSize <= 100) ||
                (selectedSize === 4 && jobSize > 100);

            const matchesExpFilter = (selectedExp === -1) || // -1 represents "All experience levels"
                (selectedExp === 0 && jobExp < 1) ||
                (selectedExp === 1 && jobExp >= 1 && jobExp < 5) ||
                (selectedExp === 2 && jobExp >= 5);

            if (matchesTechFilters && matchesTypeFilters && matchesRadioFilter && matchesSizeFilter && matchesRadioKindFilter && matchesExpFilter) {
                job.style.display = 'block';
            } else {
                job.style.display = 'none';
            }
        });
    }

    const btnn = document.getElementById("btnn");
    const toggleItems = document.querySelectorAll(".toggle-item");
    let value = true;

    btnn.addEventListener('click', () => {
        toggleItems.forEach(item => {
            item.style.display = value ? "none" : "block";
        });
        value = !value; // Toggle the value
    });

    // Initial call to display all jobs
    filterJobs();
});

// Function to view details of a company
function viewDetails(index) {
    localStorage.setItem('selectedCompanyIndex', index);
    window.location.href = '/HTML/Tocompany.html';
}




