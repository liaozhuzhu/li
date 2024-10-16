let isUsersProfile = document.querySelector('.profile-topcard-background-image-edit__icon') !== null;

const enhanceUserProfile = () => {
    let userProfileInformation = ""
    const headlineElement = document.querySelector('div.text-body-medium.break-words');
    const headlineText = headlineElement ? headlineElement.textContent.trim() : '';
    userProfileInformation += `Headline: ${headlineText} | `;
    // get all sections
    const sections = document.querySelectorAll('section[class^="artdeco-card pv-profile-card break-words"]');
    const importantSections = new Set(['About', 'Experience', 'Education', 'Skills', 'Featured', 'Licenses & certifications']);

    for (let section of sections) {
        const sectionTitle = section.querySelector('.pvs-header__title.text-heading-large');
        if (sectionTitle) {
            const innerSpan = sectionTitle.querySelector('span');
            let currSectionTitle = innerSpan ? innerSpan.textContent.trim() : '';

            // check if this is an important section
            if (importantSections.has(currSectionTitle)) {
                // here's tricky because each section has unique structures
                if (currSectionTitle == "Featured") {
                    let featuredItemsStringBuilder = ""
                    const allFeaturedItems = section.querySelectorAll('.pvs-media-content__preview');
                    for (let featuredItem of allFeaturedItems) {
                        let featuredItemTitle = featuredItem.querySelector('div.mb1 > div > div > div > div > span[aria-hidden="true"]').textContent.trim();
                        console.log(featuredItemTitle)
                        let featuredItemDescription = featuredItem.querySelector('div.eMKzYTnovCkOQaNEgZiBMAzoRyZWLkSNRU.text-body-small.break-words.display-flex.align-items-center').querySelector('div.QPriypoPxOFvmnjsoqRxkXeeNBXMwoasTM span[aria-hidden="true"]').textContent.trim()
                        featuredItemsStringBuilder += `${featuredItemTitle} - ${featuredItemDescription}, `
                    }
                    userProfileInformation += `${currSectionTitle}: ${featuredItemsStringBuilder} | `
                } else if (currSectionTitle == "Experience") {
                    let experienceItemsStringBuilder = "";
                    const allExperienceItems = section.querySelectorAll('div.display-flex.flex-column.align-self-center.full-width')
                    for (let experienceItem of allExperienceItems) {
                        const titleAndCompany = experienceItem.querySelectorAll('.visually-hidden')
                        const companyText = experienceItem.getElementsByClassName('pvs-list__item--with-top-padding AAemVmszRHbUwYWGyhHfzqPtOAlpOHIQdbsM');
                        let experienceTitle = titleAndCompany[0].textContent.trim()
                        let experienceCompany = titleAndCompany[1].textContent.split("·")[0].trim()
                        let experienceDescription = companyText[0] ? companyText[0].querySelector('span[aria-hidden="true"]').textContent.trim() : ''; // user may not have a description for thier experience
                        experienceItemsStringBuilder += `${experienceTitle} at ${experienceCompany} ${experienceDescription ? `with description "${experienceDescription}"`: ''}, `
                    }
                    userProfileInformation += `${currSectionTitle}: ${experienceItemsStringBuilder} | `
                } else if (currSectionTitle == "Education") {
                    let educationItemsStringBuilder = "";
                    const allEducationItems = section.getElementsByClassName('display-flex flex-column align-self-center full-width');
                    for (let educationTime of allEducationItems) {
                        console.log(educationTime);
                    }
                }
            }
        }
    }
    console.log(userProfileInformation)
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
                newSpan.textContent = 'Enhance With Fliee';

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