const hostname = window.location.hostname;

let ENVIRONMENT;
let APP_NAME;

// Determine ENVIRONMENT
if (hostname.startsWith("dev.")) {
    ENVIRONMENT = "development";
} else if (hostname.startsWith("www.") && (hostname.endsWith("edblocksapp.com") || hostname.endsWith("edpyapp.com") || hostname.endsWith("edscratchapp.com"))) {
    ENVIRONMENT = "production";
} else {
    ENVIRONMENT = "unknown";
}

// Determine APP_NAME
if (hostname.includes("edblocksapp.com")) {
    APP_NAME = "edblocks";
} else if (hostname.includes("edpyapp.com")) {
    APP_NAME = "edpy";
} else if (hostname.includes("edscratchapp.com")) {
    APP_NAME = "edscratch";
} else {
    APP_NAME = "unknown";
}

console.log(`ENVIRONMENT: ${ENVIRONMENT}`);
console.log(`APP_NAME: ${APP_NAME}`);


/**
 * Tracks custom events in Google Analytics.
 * @param {string} eventName - The name of the event (e.g., 'error', 'button_click').
 * @param {string} category - The category of the event (e.g., 'JavaScript Error', 'User Interaction').
 * @param {string} label - Additional context or label for the event (e.g., error message, button ID).
 * @param {object} eventData - Additional event-specific data as key-value pairs.
 * @param {boolean} nonInteraction - Set to true if the event should not affect the bounce rate.
 */

function trackGAEvent(eventName, category, label, extraData = {}) {

    console.log

    if (ENVIRONMENT == 'unknown') {

        console.log('issue not reported to GA')

    } else {

        gtag('event', eventName, {
            event_category: category,
            event_label: label,
            app: APP_NAME,
            environment: ENVIRONMENT,
            ...extraData,
            non_interaction: true
        });

        console.log('issue reported');

    }

    // console.log(eventName);
    // console.log(category);
    // console.log(label);
    // console.log(extraData);

}

// Capture JavaScript errors
window.onerror = function(message, source, lineno, colno, error) {
    trackGAEvent('js_error', 'error', message, {

        error_detail: source + ':' + lineno + ':' + colno,

        // source: source,
        // line: lineno,
        // column: colno,

        error_stack: error ? error.stack : 'No stack trace'

    });
};

// Capture unhandled promise rejections
window.onunhandledrejection = function(event) {
    trackGAEvent('unhandled_promise', 'error', event.reason ? event.reason.message : 'Unknown promise rejection', {
        error_stack: event.reason ? event.reason.stack : 'No stack trace'
    });
};