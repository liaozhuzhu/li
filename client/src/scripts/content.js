let isUsersProfile = document.querySelector('.profile-topcard-background-image-edit__icon') !== null;

const enhanceUserProfile = () => {
    let userProfileInformation = ""
    const headlineElement = document.querySelector('div.text-body-medium.break-words');
    const headlineText = headlineElement ? headlineElement.textContent.trim() : '';
    userProfileInformation += `Headline: ${headlineText} | `;
    // get all sections
    const sections = document.querySelectorAll('section[class^="artdeco-card pv-profile-card break-words"]');
    const importantSections = new Set(['About', 'Experience', 'Education', 'Featured', 'Organizations']);

    for (let section of sections) {
        const sectionTitle = section.querySelector('.pvs-header__title.text-heading-large');
        if (sectionTitle) {
            const innerSpan = sectionTitle.querySelector('span');
            let currSectionTitle = innerSpan ? innerSpan.textContent.trim() : '';

            // check if this is an important section
            if (importantSections.has(currSectionTitle)) {
                // here's tricky because each section has unique structures
                if (currSectionTitle == "About") {
                    let aboutText = section.querySelector('.display-flex.ph5.pv3').querySelector('span').textContent.trim();
                    userProfileInformation += `${currSectionTitle} Me: ${aboutText} | `
                }
                else if (currSectionTitle == "Featured") {
                    let featuredItemsStringBuilder = ""
                    const allFeaturedItems = section.querySelectorAll('.pvs-media-content__preview');
                    for (let featuredItem of allFeaturedItems) {
                        let featuredItemTitle = featuredItem.querySelector('div.mb1 > div > div > div > div > span[aria-hidden="true"]').textContent.trim();
                        let divCount = (featuredItem.querySelectorAll('div')).length
                        let featuredItemDescription = ""
                        try {
                            if (divCount == 9) { // no url for featured item
                                featuredItemDescription = featuredItem.querySelectorAll('div')[5].querySelector('div > div > div span[aria-hidden="true"]').textContent.trim()
                            } else {
                                featuredItemDescription = featuredItem.querySelectorAll('div')[7].querySelector('div > div > div span[aria-hidden="true"]').textContent.trim()
                            }
                        } catch (e) {
                            console.log("No description for this featured item")
                        }
                        featuredItemsStringBuilder += `Featured item is ${featuredItemTitle} ${featuredItemDescription ? `with description "${featuredItemDescription}"` : ''}, `
                    }
                    userProfileInformation += `${currSectionTitle}: ${featuredItemsStringBuilder} | `
                } else if (currSectionTitle == "Experience") {
                    let experienceItemsStringBuilder = "";
                    const allExperienceItems = section.querySelectorAll('div.display-flex.flex-column.align-self-center.full-width')
                    for (let experienceItem of allExperienceItems) {
                        const titleAndCompany = experienceItem.querySelectorAll('.visually-hidden')
                        let companyText = null;
                        if (experienceItem.children[1]) {
                            companyText = experienceItem.children[1];
                        }
                        let experienceTitle = titleAndCompany[0].textContent.trim()
                        let experienceCompany = titleAndCompany[1].textContent.split("·")[0].trim()
                        let experienceDescription = companyText ? companyText.querySelector('ul').querySelectorAll('li')[0].querySelector('span').textContent.trim() : ''; // user may not have a description for thier experience
                        experienceItemsStringBuilder += `${experienceTitle} at ${experienceCompany} ${experienceDescription ? `with description "${experienceDescription}"`: ''}, `
                    }
                    userProfileInformation += `${currSectionTitle}: ${experienceItemsStringBuilder} | `
                } else if (currSectionTitle == "Education") {
                    let educationItemsStringBuilder = "";
                    const allEducationItems = section.getElementsByClassName('display-flex flex-column align-self-center full-width');
                    for (let educationItem of allEducationItems) {
                        let schoolAndMajor = educationItem.children[0].querySelector('a')
                        let school = schoolAndMajor.querySelector('div').querySelector('span').textContent.trim()
                        let major = schoolAndMajor.querySelector('span > span').textContent.trim()
                        let description = educationItem.children[1] ? educationItem.children[1].querySelector('span').textContent.trim() : ''; // user may not have a description for thier education
                        educationItemsStringBuilder += `${major} at ${school} ${description ? `with description "${description}"`: ''}, `
                    }
                    userProfileInformation += `${currSectionTitle}: ${educationItemsStringBuilder} | `
                } else if (currSectionTitle == "Organizations") {
                    let organizationsStringBuilder = "";
                    const allOrganizations = section.querySelector('ul').children
                    for (let organizationItem of allOrganizations) {
                        let organization = (organizationItem.querySelector('span').textContent.trim());
                        organizationsStringBuilder += `${organization}, `
                    }
                    userProfileInformation += `${currSectionTitle}: ${organizationsStringBuilder} | `
                } 
            }
        }
    }
    userProfileInformation = userProfileInformation.slice(0, -5);
    console.log(userProfileInformation) // eventually pass this to the frontend
}

function updateButtonClass() {
    const newButton = document.getElementById('my-new-button');
    if (newButton) {
        if (window.innerWidth <= 991) {
            newButton.className = 'pvs-profile-actions__custom-action-scaled artdeco-button artdeco-button--2 artdeco-button--secondary ember-view';
        } else {
            newButton.className = 'artdeco-button artdeco-button--2 artdeco-button--secondary ember-view m0 mr2';
        }
    }
}

const initUserProfileFeatures = () => {
    console.log("USER PROFILE")
    const observer = new MutationObserver(() => {
        let outerDiv = document.querySelector('div.ph5.pb5');
        // const allElements = document.querySelectorAll('.pv-top-card-v2-ctas__custom');

        // let parentElement = null;
        // allElements.forEach(element => {
        //     const classNames = element.className.split(' ');
        //     // unjagpnntlSrovSTmcmuvLjynIApBMZbIlqG
        //     if (classNames.some(className => className.startsWith('mhdozUiuVxpsGMKIBPwcWskrxpWbmXxJDaw'))) {
        //         parentElement = element;
        //     }
        // });
        let buttonContainer = outerDiv.querySelector('div:nth-child(5)');

        if (buttonContainer) {
            if (!document.getElementById('my-new-button')) {
                const newButton = document.createElement('button');
                const newSpan = document.createElement('span');
                newButton.id = 'my-new-button';
                newButton.type = 'button';

                // Detect screen width and apply the appropriate class
                if (window.innerWidth <= 991) {  
                    newButton.className = 'pvs-profile-actions__custom-action-scaled artdeco-button artdeco-button--2 artdeco-button--secondary ember-view';
                } else { 
                    newButton.className = 'artdeco-button artdeco-button--2 artdeco-button--secondary ember-view m0 mr2';
                }

                newSpan.className = 'artdeco-button__text';
                newSpan.textContent = 'Tips From Fliee';

                buttonContainer.appendChild(newButton);
                newButton.appendChild(newSpan);
                newButton.addEventListener('click', () => {
                    enhanceUserProfile();
                });
            }
            window.addEventListener('resize', updateButtonClass);
            updateButtonClass();
        }
        else {
            console.log('Parent element not found in this iteration.');
        }
    });

    const targetNode = document.body;
    observer.observe(targetNode, {
        childList: true,
        subtree: true
    });
}

// check if we're on the user's profile or not
if (isUsersProfile) {
    initUserProfileFeatures();
} else {
    console.log("NOT USER PROFILE")
}