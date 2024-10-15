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
            let currSection = innerSpan ? innerSpan.textContent.trim() : '';

            // check if this is an important section
            if (importantSections.has(currSection)) {
                // here's tricky because each section has unique structures
                if (currSection == "Featured") {
                    let featuredItemsStringBuilder = ""
                    const allFeaturedItems = section.querySelectorAll('.pvs-media-content__preview');
                    for (let featuredItem of allFeaturedItems) {
                        // console.log(featuredItem)
                        let featuredItemTitle = featuredItem.querySelector('div.mb1').querySelector('div.QPriypoPxOFvmnjsoqRxkXeeNBXMwoasTM span[aria-hidden="true"]').textContent.trim()
                        let featuredItemDescription = featuredItem.querySelector('div.eMKzYTnovCkOQaNEgZiBMAzoRyZWLkSNRU.text-body-small.break-words.display-flex.align-items-center').querySelector('div.QPriypoPxOFvmnjsoqRxkXeeNBXMwoasTM span[aria-hidden="true"]').textContent.trim()
                        featuredItemsStringBuilder += `${featuredItemTitle} - ${featuredItemDescription}, `
                    }
                    userProfileInformation += `${currSection}: ${featuredItemsStringBuilder} | `
                } console.log(userProfileInformation)
            }
        }
    }

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
        const allElements = document.querySelectorAll('.pv-top-card-v2-ctas__custom');

        let parentElement = null;
        allElements.forEach(element => {
            const classNames = element.className.split(' ');
            if (classNames.some(className => className.startsWith('unjagpnntlSrovSTmcmuvLjynIApBMZbIlqG'))) {
                parentElement = element;
            }
        });

        if (parentElement) {
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

                parentElement.appendChild(newButton);
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