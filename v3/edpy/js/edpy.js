'use strict';

var editor = ace.edit("epEditor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/edpy");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
});

var autocompleteSnippets = [];

// Set up language tools
// https://github.com/ajaxorg/ace/blob/7285dad33867771a688a96bbf2309f4e995a5b7d/lib/ace/ext/language_tools.js#L82
ace.require("ace/ext/language_tools");
var lang = ace.require("ace/lib/lang");
var languageTools = ace.require("ace/ext/language_tools");
var snippetManager = ace.require("ace/snippets").snippetManager;

const intMaxProgs = 5;
var msAutoSave = 5000;
var strUniqueID;
var blnIgnoreChange = false;
var idTabActive = '';

var blnDeviceCheck, browserInfo, isIOS;

const divCompiler = document.getElementById('epCompilerOutput');

let errorMarkerId = null;

const txtDocsSearch = document.getElementById('epDocsSearch');
const divDocsResults = document.getElementById('epDocsResults');

const divTabFiles = document.getElementById('tabFiles');
const htmlTab = '<div class="col tabFile"><span data-bs-toggle="tooltip" data-bs-placement="bottom" title="" class="tabFileTitle"></span> <button type="button" class="btn-close" aria-label="Close"></button></div>';

const spanFilename = document.getElementById('epFilename');
const spanSaveStatus = document.getElementById('epFilenameStatus');

const spanLineHelp = document.getElementById('epLineHelpHelp');

const eModLoading = document.getElementById('modLoading');
const modLoading = new bootstrap.Modal(eModLoading);

const eModLoad = document.getElementById('modLoad');
const modLoad = new bootstrap.Modal(eModLoad);

const eModBrowserCheck = document.getElementById('modBrowserCheck');
const modBrowserCheck = new bootstrap.Modal(eModBrowserCheck);

const eModSave = document.getElementById('modSave');
const modSave = new bootstrap.Modal(eModSave);
$('#modSave').draggable({
    handle: ".modal-header"
});

const eModAbout = document.getElementById('modAbout');
const modAbout = new bootstrap.Modal(eModAbout);
$('#modAbout').draggable({
    handle: ".modal-header"
});

const eModCookies = document.getElementById('modCookies');
const modCookies = new bootstrap.Modal(eModCookies);
$('#modCookies').draggable({
    handle: ".modal-header"
});

const eModProgram = document.getElementById('modProgram');
const modProgram = new bootstrap.Modal(eModProgram);
$('#modProgram').draggable({
    handle: ".modal-header"
});

const $modFlasher = $('#modFlasher').draggable({
    handle: '.modal-header'
});
const modProgramFlash = new bootstrap.Modal($modFlasher[0]);

const eModProgrammingMethod = document.getElementById('modProgrammingMethod');
const modProgrammingMethod = new bootstrap.Modal(eModProgrammingMethod);
$('#modProgrammingMethod').draggable({
    handle: ".modal-header"
});

const spanProgrammingMethod = document.getElementById('spanProgrammingMethod');
const aProgram = document.getElementById('aProgram');
const aProgramFlash = document.getElementById('aProgramFlash');
const slider = document.getElementById('rngFlasherSpeed');
const snapValues = [1, 2, 3, 4];
let snappedValue;

// Function to find the closest snap value
function findClosestSnap(value) {
    return snapValues.reduce((prev, curr) => {
        return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    });
}

// Event listener for slider input
slider.addEventListener('input', function() {
    snappedValue = findClosestSnap(parseInt(this.value));
    localStorage.setItem('mbaFlashSpeed', snappedValue);
});


const eModUSB = document.getElementById('modUSB');
const modUSB = new bootstrap.Modal(eModUSB);
$('#modUSB').draggable({
    handle: ".modal-header"
});
const clipboardUSB = new ClipboardJS('#usbExport');

const eModDocs = document.getElementById('modDocs');
const modDocs = new bootstrap.Modal(eModDocs);

const eModDocsTitle = document.getElementById('tempDocsTitle');
const eModDocsBody = document.getElementById('tempDocsBody');

const eModHelp = document.getElementById('modHelp');
const modHelp = new bootstrap.Modal(eModHelp);
$('#modHelp').draggable({
    handle: ".modal-header"
});

const eModConnection = document.getElementById('modConnection');
const modConnection = new bootstrap.Modal(eModConnection);
$('#modConnection').draggable({
    handle: ".modal-header"
});

const eModStatus = document.getElementById('modStatus');
const modStatus = new bootstrap.Modal(eModStatus);
$('#modStatus').draggable({
    handle: ".modal-header"
});

const eModFirmwareUpdate = document.getElementById('modFirmwareUpdate');
const modFirmwareUpdate = new bootstrap.Modal(eModFirmwareUpdate);
$('#modFirmwareUpdate').draggable({
    handle: ".modal-header"
});


const eModFirmwareError = document.getElementById('modFirmwareError');
const modFirmwareError = new bootstrap.Modal(eModFirmwareError);

const eModOutput = document.getElementById('modOutput');
const modOutput = new bootstrap.Modal(eModOutput);

const eModAlert = document.getElementById('modAlert');
const eModAlertTitle = document.getElementById('modAlertTitle');
const eModAlertBody = document.getElementById('modAlertBody');
const modAlert = new bootstrap.Modal(eModAlert);

const epProgramsList = document.getElementById('epProgramsList');

const divDocsDisplay = document.getElementById('epDocsDisplay');
const divDocsDisplayTitle = document.getElementById('epDocsDisplayTitle');
const divDocsDisplayTitleText = document.getElementById('epDocsDisplayTitleText');
const divDocsDisplayText = document.getElementById('epDocsDisplayText');

const inputFile = document.getElementById('modLoadFiles');

const divFileDrop = document.getElementById('epFileDrop');

var shareid = getQueryVariable('share');
var pathShare = './data/shares/';

let arrPrograms = [];

modLoading.show();

$(document).ready(function() {

    usbUpdateStatus('disconnected');
    document.getElementById('fuLatestFirmware').innerHTML = updateFirmwareVersion.substring(1);

    setupSnippets();

    docsSearcher('');

    populateDemos();


    if (localStorage.getItem('mbaFlashSpeed')) {
        slider.value = localStorage.getItem('mbaFlashSpeed');
    } else {
        slider.value = 1;
    }

    setTimeout(doLoadStorage, 1500);

    let browserInfo = edBrowserInfo.getBrowserDetails();
    isIOS = edBrowserInfo.isIOS();
    console.log('edBrowserInfo...');
    console.log('Browser Details:', browserInfo);
    console.log('isIOS:', isIOS);
    console.log('isWebUSB:', browserInfo.isWebUSB);

    blnDeviceCheck = true;

    // Check for settings in mbaProgrammingMethod localStorage
    if (localStorage.getItem('mbaProgrammingMethod')) {

        if (localStorage.getItem('mbaProgrammingMethod') == 'FLASH') {
            doUISetup('FLASH');
        } else {
            doUISetup('USB');
        }

    } else {

        if (isIOS) {
            doUISetup('FLASH');
        } else {
            doUISetup('USB');
            if (browserInfo.isWebUSB) {
                blnDeviceCheck = true;
            } else {
                blnDeviceCheck = false;
            }
        }

    }

    if (blnDeviceCheck) {

        if (localStorage.getItem('mbaProgrammingMethod')) {
            console.log('ui pref found in storage...');
            if (localStorage.getItem('mbaProgrammingMethod') == 'FLASH') {
                doUISetup('FLASH');
            } else {
                doUISetup('USB');
            }
        }

        setInterval(function() {
            saveStorage();
        }, msAutoSave);

    } else {

        modLoading.hide(); // THIS IS NOT WORKING...

        $('#modBrowserCheck .exBrowserDetected').html(browserInfo.name);
        modBrowserCheck.show();

    }

});


// SAVE TO STORAGE EVERY [msAutoSave] SECONDS
// setInterval( function() {
// 	if ( msAutoSave > 0 ) {
// 		saveStorage();
// 	}
// }, msAutoSave);



function doLoadStorage() {

    modLoading.hide();
    loadStorage();
    $('#epContainer').show();
    calculateHeights();

    if (shareid) {

        console.log(blnNewProgramOK());

        if (blnNewProgramOK()) {

            doLoadShare(shareid);
            removeQueryParamsFromUrl();

        } else {

            $(eModAlertTitle).html('Alert');
            $(eModAlertBody).html('You can only have ' + intMaxProgs + ' programs open at one time.<br><br>To load the shared program <strong>(' + shareid + ')</strong>, please close a program and refresh the page.');
            modAlert.show();

        }

    }

}


// LOAD FROM SHARE FOLDER
function doLoadShare(shareid) {

    console.log('doLoadShare...');
    pathShare = pathShare + shareid + '-v3.edpy';

    console.log(pathShare);

    doLoadShareFile(pathShare, function(data) {

        // blnIgnoreChange = true;
        addProgram(shareid, data);

    });

}



function removeQueryParamsFromUrl() {

    // Get the current URL
    let url = window.location.href;

    // Check if there are query parameters in the URL
    if (url.indexOf('?') !== -1) {
        // Remove query parameters by taking the URL before the '?' character
        url = url.substring(0, url.indexOf('?'));
        // Replace the current URL with the modified one (without query parameters)
        window.history.replaceState({}, document.title, url);
    }
}

function doLoadShareFile(pathShare, callback) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.error('Failed to load file: ' + pathShare);
            }
        }
    };
    xhr.open('GET', pathShare, true);
    xhr.send();

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}



// API XHR
function apiRequest(reqType, mbc) {

    clearCompileErrors();

    console.log('apiRequest...');

    var urlAPI = '';

    if (reqType == 'check') {
        urlAPI = apiBaseURL + 'ep/compile/ep_compile_usb_v3_check';
    } else {
        urlAPI = apiBaseURL + 'ep/compile/ep_compile_usb_v3';
    }

    console.log('urlAPI: ' + urlAPI);

    // NEED TO ADD BETTER ERROR HANDLING FOR NETWORK OUTAGES......
    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

    return new Promise(function(resolve, reject) {

        var timeStart = new Date().getTime();
        var timeEnd = 0;
        var timeTotal = 0;

        const xhr = new XMLHttpRequest();

        xhr.timeout = 60000; // one minute in milliseconds

        xhr.onreadystatechange = function(e) {

            //console.log( xhr );
            //console.log( e );

            if (xhr.readyState === 4) {

                if (xhr.status === 200) {

                    resolve(xhr.response);

                    timeEnd = new Date().getTime();
                    timeTotal = timeEnd - timeStart;
                    console.log("compile time: " + timeTotal);
                    console.log('------------');

                } else {

                    //console.log( xhr );
                    reject(xhr.status);
                    console.log('------------');

                }

            }
        }


        xhr.ontimeout = function() {

            console.log('timeout');
            reject('timeout');
            console.log('------------');

        }

        xhr.open('POST', urlAPI, true);
        xhr.send(mbc);

    });

}


// RETURN CODE
function getCode(typeMBC) {

    let code = '';
    if (typeMBC == 'starter') {
        //simple test code
        code = ["#-------------Setup----------------", "", "import Ed", "", "Ed.EdisonVersion = Ed.V2", "Ed.DistanceUnits = Ed.CM", "Ed.Tempo = Ed.TEMPO_MEDIUM", ""].join("\n");
    } else {
        //get MBC from editor	
        code = editor.getSession().getValue();
    }

    return code;

}


// WRITE ERROR TO COMPILER OUTPUT
function writeCompileErrors(strIn) {

    var htmlLine = '<div class="epCompilerOutputLine">';

    const pattern = /^ERR: file:(\d+)(?::(\d+))?:(.+)$/;

    var jsonError = JSON.parse(strIn);

    var maxBlinkCount = 1;

    if (jsonError['error'] == true) {

        var strError = (jsonError['messages']) + '';
        console.log(strError);

        const match = strError.match(pattern);

        if (match) {

            const lineNumber = match[1];
            const charPosition = match[2] || null; // Use null if char position is not present
            const errorMessage = match[3];

            htmlLine += '<div class="alert alert-danger">';
            if (charPosition) {
                htmlLine += '<span class="oi oi-danger"></span> Line: ' + lineNumber + ' Pos: ' + charPosition + ' - ' + errorMessage;
            } else {
                htmlLine += '<span class="oi oi-danger"></span> Line: ' + lineNumber + ' - ' + errorMessage;
            }
            htmlLine += '</div>';

            if (lineNumber >= 0) {

                highlightErrorLine(lineNumber);

                maxBlinkCount = 15;

                // if ( charPosition >= 0 ) {
                // 	editor.gotoLine(lineNumber, charPosition, true);	
                // } else {
                // 	editor.gotoLine(lineNumber, 0, true);
                // }

                // editor.scrollToLine(lineNumber, true, true, function () {});

            }


        } else {

            // console.log('Error string does not match the expected pattern.');
            htmlLine += '<div class="alert alert-warning">';
            htmlLine += '<span class="oi oi-warning"></span>' + strError;
            htmlLine += '</div>';

        }


    } else {

        maxBlinkCount = 5;

        htmlLine += '<div class="alert alert-success">';
        htmlLine += '<span class="oi oi-circle-check"></span> There are no errors in your code.';
        htmlLine += '</div>';

    }

    htmlLine += '</div>';

    $(divCompiler).html(htmlLine);

    var blinkCount = 0;

    // Function to toggle opacity
    function toggleOpacity() {

        var divAlert = $(divCompiler).find('div.alert').first();
        $(divAlert).css('opacity', $(divAlert).css('opacity') === '1' ? '0.5' : '1');

        blinkCount++;

        if (blinkCount === maxBlinkCount * 2) { // Multiplying by 2 as each blink consists of two opacity changes
            clearInterval(blinkInterval);
        }
    }

    // Set interval to toggle opacity every 500 milliseconds (adjust as needed)
    var blinkInterval = setInterval(toggleOpacity, 150);

}



function highlightErrorLine(lineNumber) {

    const session = editor.getSession();

    const Range = ace.require('ace/range').Range;
    errorMarkerId = session.addMarker(new Range(lineNumber - 1, 0, lineNumber - 1, 1), "error-line", "fullLine");

    // if ( charPosition >= 0 ) {
    // 	editor.gotoLine(lineNumber, charPosition, true);	
    // } else {
    // 	editor.gotoLine(lineNumber, 0, true);
    // }

    editor.scrollToLine(lineNumber, true, true, function() {});


}


function removeErrorHighlight() {

    const session = editor.getSession();

    // Remove the error marker if it exists
    if (errorMarkerId !== null) {
        session.removeMarker(errorMarkerId);
        errorMarkerId = null;

        // Remove the change event listener
        editor.off('change', removeErrorHighlight);
    }
}




// CLEAR COMPILER OUTPUT
function clearCompileErrors() {

    var divAlert = $(divCompiler).find('div.alert').first();
    $(divAlert).fadeOut(250, function() {
        $(this).remove();
    });

}


// ----
function docsSearcher(needle) {

    //console.log('searching for: %s', needle);
    //var re1 = new RegExp("\\b" + needle + "\\b", 'i');
    var re1 = new RegExp("" + needle + "", 'i');
    var matches = jsonDocs.filter(docMatcher(re1));

    docsDisplayResults(matches);

    let elements = document.querySelectorAll('.epDocPop');
    elements.forEach(function(element) {
        element.addEventListener('click', function(event) {

            var docName = $(this).data('docname');
            docsDisplayResult(docName);

        })
    })

}

// ----
function docMatcher(regexp) {

    return function(obj) {
        var found = false;
        Object.keys(obj).forEach(function(key) {
            if (!found) {
                if ((typeof obj[key] == 'string') && regexp.exec(obj[key])) {
                    found = true;
                }
            }
        });
        return found;
    };

}

// ----
function docsDisplayResults(matches) {


    matches.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    // console.log ( matches);

    var htmlOut = '';

    var htmlEdPyOut = '<li><span class="epDocSection">EdPy functions</span></li>';
    var htmlConstantsOut = '<li><span class="epDocSection">EdPy constants</span></li>';
    var htmlVariablesOut = '<li><span class="epDocSection">EdPy variables</span></li>';
    var htmlPythonOut = '<li><span class="epDocSection">Python</span></li>';

    if (matches.length > 0) {

        //console.log('found count: %s', matches.length);

        matches.forEach(function(match) {

            htmlOut += '<li><a class="epDocPop" data-docname="' + match['name'] + '">' + match['name'] + '</a></li>';

            if (match['type'] == 'edpy') {
                htmlEdPyOut += '<li><a class="epDocPop" data-docname="' + match['name'] + '">' + match['name'] + '</a></li>';
            }

            if (match['type'] == 'constant') {
                htmlConstantsOut += '<li><a class="epDocPop" data-docname="' + match['name'] + '">' + match['name'] + '</a></li>';
            }

            if (match['type'] == 'edpy variable') {
                htmlVariablesOut += '<li><a class="epDocPop" data-docname="' + match['name'] + '">' + match['name'] + '</a></li>';
            }

            if (match['type'] == 'python') {
                htmlPythonOut += '<li><a class="epDocPop" data-docname="' + match['name'] + '">' + match['name'] + '</a></li>';
            }

        });

    }

    htmlOut = '<ul id="epDocsResultsList">' + htmlEdPyOut + htmlConstantsOut + htmlVariablesOut + htmlPythonOut + '</ul>';

    $(epDocsResults).html(htmlOut);

}




function docsDisplayResult(docName) {

    var found = jsonDocs.filter(function(item) {
        return item.name === docName;
    });

    var strTemp = '';

    var strBack = '<input type="button" value="Back" id="docsDisplayDocsCopyClose" class="btn btn-primary">';

    var strCompat = '<span class="compat">Edison compatibility: ';
    let arrCompat = JSON.parse(found[0].compat);
    for (let i = 0; i < arrCompat.length; i++) {

        strCompat = strCompat + '<span class="compat-version">V' + arrCompat[i] + '</span>';

        // console.log ( arrCompat[i] );

    }
    strCompat = strCompat + '</span>';

    strTemp = strTemp + found[0].html + strBack;

    let index = strTemp.indexOf("</h2>");
    if (index !== -1) {
        strTemp = strTemp.substring(0, index + 5) + strCompat + strTemp.substring(index + 5);
    }

    divDocsDisplayTitleText.innerHTML = found[0].name;

    divDocsDisplayText.innerHTML = strTemp;
    divDocsDisplay.style.display = 'block';
    divDocsResults.scrollTop = 0;

}


function addProgram(strProgramName, strProgramString) {

    let idProg = genProgramID();
    if (strProgramString == '') {
        strProgramString = getCode('starter');
    }

    arrPrograms.push({
        programID: idProg,
        programName: strProgramName,
        programString: strProgramString,
        programSaved: true
    });

    var newTab = $(htmlTab);
    $(divTabFiles).append(newTab);

    $('.tabFile').removeClass('tabActive');
    $(newTab).addClass('tabActive');
    $(newTab).find('.tabFileTitle').text(strProgramName);
    $(newTab).find('.tabFileTitle').attr('title', strProgramName);
    $(newTab).attr('id', idProg);

    editor.setValue(strProgramString);

    setSpanName(strProgramName);

    idTabActive = idProg;

    var selectionRange = editor.getSelectionRange();
    if (selectionRange) {
        // Set the selection range start and end to the same position
        selectionRange.setStart(selectionRange.start, 0);
        selectionRange.setEnd(selectionRange.start, 0);
        // Set the selection range in the editor
        editor.selection.setSelectionRange(selectionRange);
    }

    clearCompileErrors();

}


function setSpanName(strFilename) {

    $(spanFilename).text(strFilename);

}


function setTabName(strFilename) {

    var tab = document.getElementById(idTabActive);
    $(tab).find('.tabFileTitle').text(strFilename);

}


// Event Listeners
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// File upload
inputFile.addEventListener('change', handleFileSelect, false);

$('#epDocsDisplayTitle .btn-close').on('click', function(e) {
    e.stopPropagation();
    divDocsDisplay.style.display = 'none';
})

$('#epDocsDisplayText').on('click', function(e) {
    $(document).on("click", "#docsDisplayDocsCopyClose", function() {
        e.stopPropagation();
        divDocsDisplay.style.display = 'none';
        divDocsResults.scrollTop = 0;
    });
})

// Prevent the default behavior of the drop event on the entire document
document.addEventListener('drop', (e) => {
    e.preventDefault();
});

// Prevent the default behavior of the dragover event on the entire document
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Prevent the default behavior of the drop event
divFileDrop.addEventListener('dragover', (e) => {
    e.preventDefault();
    divFileDrop.style.borderColor = '#23527c';
    divFileDrop.style.color = '#23527c';
    divFileDrop.style.backgroundColor = '#c4d2e0';
});

// Reset the border color on drag leave
divFileDrop.addEventListener('dragleave', () => {
    divFileDrop.style.borderColor = '#337ab7';
    divFileDrop.style.color = '#337ab7';
    divFileDrop.style.backgroundColor = '#eeeeee';
});

// Handle the file drop
divFileDrop.addEventListener('drop', (e) => {

    e.preventDefault();
    divFileDrop.style.borderColor = '#337ab7';
    divFileDrop.style.color = '#337ab7';
    divFileDrop.style.backgroundColor = '#eeeeee';

    if (blnNewProgramOK()) {

        const file = e.dataTransfer.files[0];

        if (file) {

            if (file.type === 'text/plain' || file.name.endsWith('.edpy')) {

                const reader = new FileReader();

                reader.onload = (event) => {

                    var fileProgram = event.target.result;
                    var fileTitle = file.name;

                    fileTitle = fileTitle.split('.');
                    // title = title.replace(/^.*[\\\/]/, "");

                    blnIgnoreChange = true;
                    addProgram(fileTitle[0], fileProgram);

                };

                reader.readAsText(file);

            } else {

                console.log('BAD FILE TYPE');
                $(eModAlertTitle).html('Alert');
                $(eModAlertBody).html('Incorrect File type, please upload an EdPy save file (.edpy)');
                modAlert.show();

            }

        }


    } else {

        $(eModAlertTitle).html('Alert');
        $(eModAlertBody).html('You can only have ' + intMaxProgs + ' programs open at one time.');
        modAlert.show();

    }

});

// Initial calculation
window.addEventListener('load', calculateHeights);

// Recalculate on window resize
window.addEventListener('resize', calculateHeights);


$(document).on('click', '.btnDocs', function(e) {

    var docValue = $(this).data('docname');
    docsDisplayResult(docValue);

});


// TRY CATCH PAGE RELOAD AND SAVE LOCALY
window.onbeforeunload = function() {

    // saveStorage(); // NEED TO ADD A CHECK HERE 

};


// CATCH DOUBLE CLICK
spanFilename.addEventListener('dblclick', (e) => {

    //console.log (this);
    console.log(e.target);

});


// CATCH EDITOR CURSOR CHANGE
editor.session.selection.on('changeCursor', function(e) {

    var line = editor.getSelectionRange();

    if (line.end.column == line.start.column) {
        line.start.column = 0;
        line.end.column = 100;
    }

    var strCode = editor.session.getTextRange(line);
    doLineHelp(strCode);

});


// CATCH EDITOR TEXT CHANGE
editor.on('change', function(e) {

    removeErrorHighlight();

    if (blnIgnoreChange == true) {

        // console.log ( 'ignore editor change - triggered ny tab click' );
        if (e['action'] == 'remove') {
            blnIgnoreChange = true;
        } else {
            blnIgnoreChange = false;
        }

    } else {

        // Might need to renable this...
        // arrPrograms[ getProgramIndexByID( idTabActive ) ][ 'programSaved' ] = false;

        // alert ( 'dirty file...' );
        toggleSaveStatus('show');

    }

});


// CATCH CLICK ON TABS
$('#tabFiles').on('click', '.tabFile', function() {

    blnIgnoreChange = true;

    // highlight tab
    $('.tabFile').removeClass('tabActive');
    $(this).addClass('tabActive');

    // change title at top of page
    setSpanName($(this).find('.tabFileTitle').text());

    idTabActive = $(this).attr('id');

    // console.log ( 'idTabActive: ' + idTabActive );
    // console.log ( getProgramIndexByID( idTabActive ) );

    var code = arrPrograms[getProgramIndexByID(idTabActive)]['programString'];

    editor.setValue(code);

    if (arrPrograms[getProgramIndexByID(idTabActive)]['programSaved'] == false) {
        toggleSaveStatus('show');
    } else {
        toggleSaveStatus('hide');
    }

    saveStorage();

    clearCompileErrors();

});


// CATCH CLICK ON TABS CLOSE BUTTON
$('#tabFiles').on('click', '.btn-close', function(e) {

    e.stopPropagation();

    var tab = $(this).closest('.tabFile');
    var id = $(tab).attr('id');

    blnIgnoreChange = true;

    tab.remove();

    arrPrograms.splice(getProgramIndexByID(id), 1);

    if (arrPrograms.length > 0) {

        // TODO: Add functions to set closest tab top active
        //idTabActive = arrPrograms.length - 1;
        let setToThisIndex = 0;

        idTabActive = arrPrograms[setToThisIndex]['programID'];
        var code = arrPrograms[setToThisIndex]['programString'];
        editor.setValue(code);

        $('.tabFile').removeClass('tabActive');

        let eLive = document.getElementById(idTabActive);

        $(eLive).addClass('tabActive');

        setSpanName($(eLive).find('.tabFileTitle').text());


    } else {

        if (arrPrograms.length == 0) {
            loadDemo(edVersion);
        }

    }

    saveStorage();

    clearCompileErrors();

});


// HELP
$('#aHelp').on('click', function(e) {

    $('#modHelp span#spanHelpVersion').html(edVersion);
    modHelp.show();

});


// HELP - CONNECTION - CHECK
$('#btnHelpConnection').on('click', function(e) {

    modHelp.hide();
    modConnection.show();
    findAPI();

});

// CONNECTION - REFRESH
jQuery("#apiStatusRefresh").on("click", function(e) {

    findAPI();

});


// HELP - CONNECTION - STATUS
$('#btnHelpStatus').on('click', function(e) {

    modHelp.hide();

    modStatus.show();

    /// TODO 		 
    jQuery("#hubStatusConnectionStatus").html("not connected");

    jQuery("#hubStatusFirmwareVersion").html("");
    jQuery("#hubStatusFirmwareVersionHolder").hide();

    if (webUSBIsConnected()) {
        // alert('alreday connected...');
    }


});

// HUB STATUS - CLOSE
jQuery('#modalStatus').on('hidden.bs.modal', function(e) {

    jQuery('#hubStatusConnectionStatus').html('not connected');
    jQuery('#hubStatusConnectionStatus').removeClass('isConnected');
    jQuery('#hubStatusConnectionStatus').addClass('notConnected');
    jQuery('#hubStatusFirmwareVersion').html('');
    jQuery('#hubStatusFirmwareVersionHolder').hide();

});



// HUB STATUS - CONNECTION
jQuery("#btnStatusHubConnect").on("click", async function(e) {

    await webUSBEnsureConnected();

    var strFirmwareVersion;

    console.log(webUSBIsConnected());

    if (webUSBIsConnected()) {

        jQuery("#hubStatusConnectionStatus").html("connected");
        jQuery("#hubStatusConnectionStatus").addClass("isConnected");
        jQuery("#hubStatusConnectionStatus").removeClass("notConnected");

        strFirmwareVersion = await getEV3FirmwareVersion();

        console.log(strFirmwareVersion);

        let variant_str = "?";
        if (strFirmwareVersion[0] == EV3_VARIANT_CODE_BOOTLOADER) {
            variant_str = "bootloader mode";
        } else if (strFirmwareVersion[0] == EV3_VARIANT_CODE_APPLICATION_FACTORY) {
            variant_str = "factory application mode";
        } else if (strFirmwareVersion[0] == EV3_VARIANT_CODE_APPLICATION_USER) {
            variant_str = "user application mode";
        }

        var strHTML = variant_str + '<br>' + 'firmware = ' + strFirmwareVersion[2] + '<br>' + 'boot = ' + strFirmwareVersion[1];

        strHTML += '<br></br>';

        var blnUpdateAvailable = false;

        if (updateFirmwareVersion != strFirmwareVersion[2]) {
            strHTML += 'A firmware update (' + updateFirmwareVersion + ') is available.<br>';
            blnUpdateAvailable = true;
        }

        if (updateBootloaderVersion != strFirmwareVersion[1]) {
            strHTML += 'A boot update (' + updateBootloaderVersion + ') is available.<br>';
            blnUpdateAvailable = true;
        }

        if (blnUpdateAvailable) {
            strHTML += '<div style="padding-top:10px;"><button  id="btnPopFirmwareUpdate" type="button" class="btn btn-primary btn-sm">Update Firmware</button></div>';
        } else {
            strHTML += 'Your Edison is up to date.';
        }

        jQuery("#hubStatusFirmwareVersion").html(strHTML);
        jQuery("#hubStatusFirmwareVersionHolder").fadeIn(500);

    }

});




$('.aHelpBack').on('click', function(e) {

    modProgrammingMethod.hide();
    modOutput.hide();
    modConnection.hide();
    modStatus.hide();
    modHelp.show();

});


// $( '.epDocPop' ).on('click', function(e) {
// 	//console.log (this);
// 	//console.log  ( $(this).data('docid') ) ;
// 	var docID = $(this).data('docid');
// 	docsDisplayResult ( docID );
// });


$('#aNew').on('click', function(e) {

    if (blnNewProgramOK()) {

        blnIgnoreChange = true;

        editor.setValue('');
        loadDemo(edVersion);

        clearCompileErrors();


    } else {

        $(eModAlertTitle).html('Alert');
        $(eModAlertBody).html('You can only have ' + intMaxProgs + ' programs open at one time.');
        modAlert.show();

    }

});


$('#aLoad').on('click', function(e) {

    modLoad.show();

});


$('#aSave,#aSaveAlt').on('click', function(e) {

    // console.log( 'save...' );
    $("#modSave #txtProgramName").val($(spanFilename).text());
    modSave.show();

});

$('#aSaveStorage').on('click', function(e) {

    saveStorage();
    console.table(arrPrograms);

});


$('#aMenu').on('click', function(e) {

    e.preventDefault();
    // console.log( 'menu...' );

});

$('#aAbout').on('click', function(e) {

    modAbout.show();

});


$('#aCookies').on('click', function(e) {

    modCookies.show();

});


$('#epProgramsList').on('click', '.btnDemoProgramLoad', function(e) {

    if (blnNewProgramOK()) {

        blnIgnoreChange = true;

        // console.log('load demo...');
        // var demoID = jQuery(this).closest('.divDemoProgramHolder').data('id');
        var demoID = $(this).data("id");
        //var demoTitle = jQuery(this).closest('.divDemoProgramHolder').data('title');				
        loadDemo(demoID);

    } else {

        // modDemos.hide();
        $(eModAlertTitle).html('Alert');
        $(eModAlertBody).html('You can only have ' + intMaxProgs + ' programs open at one time.');
        modAlert.show();

    }

});


$(epDocsSearch).on('input', function(e) {
    var needle = $(epDocsSearch).val();
    docsSearcher(needle);
});

$('#aCheckCode').click(async function() {

    var code = getCode();
    var arrResponse = await apiRequest('check', code);

    arrResponse = JSON.parse(arrResponse);
    // console.log ( arrResponse['message'] );

    writeCompileErrors(arrResponse['message']);

});


$('#aProgram').click(async function() {

    console.log('program edison...');

    await testForUIDCheck();

    await webUSBEnsureConnected();

    var version = await getEV3FirmwareVersion();

    if (version[0] != EV3_VARIANT_CODE_BOOTLOADER) {

        if (version[2].startsWith(updateFirmwareVersion)) {

            // correct version so call api

            await webUSBCommandStopUserProgram();

            var code = getCode();
            var arrResponse = await apiRequest('program', code);
            arrResponse = JSON.parse(arrResponse);

            if (arrResponse.compile == false) {

                writeCompileErrors(arrResponse['message']);

            } else {

                var hexString = arrResponse.hex;
                var sendData = processAPIHexString(hexString);
                webUSBCommandPutUserProgram(sendData);

                modProgram.show();

                var strUpdateRequired = 'OK! The program has loaded to your Edison.';
                programOutput(strUpdateRequired, 'clear', 'success');

                setTimeout(function() {
                    modProgram.hide();
                }, 3000);

            }

        } else {

            if (!version[1].startsWith(updateBootloaderVersion)) {

                // bootLoader version error - link to modal					

                modProgram.show();

                var strUpdateRequired = '<p>To program your Edison you will need to update the firmware to the latest version: ' + updateFirmwareVersion + '.</p><button type="button" onclick="gotoFirmwareUpdate();" class="btn btn-primary btn-sm">Update firmware</button>';
                programOutput(strUpdateRequired, 'clear', 'info');
                // $('#divProgrammingMessage').html( 'To program your Edison you will need to update the firmware to the latest version: '  + updateFirmwareVersion + '.</p><button type="button" onclick="gotoFirmwareUpdate();" class="btn btn-primary btn-sm">Update firmware</button>' );				

            } else {

                // just the firmware is Incorrect, tell the user and start a download

                modProgram.show();

                programOutput('Firmware updated required. Updating now...', 'clear', 'info');

                //Set Edison to boot
                await webUSBCommandReset(1);

                var firmware;

                getFileFromServer(urlUpdateFirmware).then(async fileContent => {

                    if (fileContent) {

                        firmware = new Uint8Array(fileContent);

                        if (await programEV3Firmware(firmware, true)) {
                            // Switch back to application.
                            await webUSBCommandReset(1);
                        }

                        programOutput('Firmware updated.', 'append', 'info');

                        // pythontoAPI();

                        var code = getCode();
                        var arrResponse = await apiRequest('program', code);
                        arrResponse = JSON.parse(arrResponse);
                        if (arrResponse.compile == false) {

                            writeCompileErrors(arrResponse['message']);

                        } else {

                            var hexString = arrResponse.hex;

                            var sendData = processAPIHexString(hexString);

                            webUSBCommandPutUserProgram(sendData);

                            setTimeout(function() {
                                programOutput('OK! The program has loaded to your Edison.', 'append', 'success');
                            }, 1000);

                        }


                    } else {

                        console.log('Failed to download file.');

                    }
                });
            }
        }

    } else {

        modProgram.show();
        programOutput('<p>To program your Edison you will need to update the firmware to the latest version: ' + updateFirmwareVersion + '.</p><button type="button" onclick="gotoFirmwareUpdate();" class="btn btn-primary btn-sm">Update firmware</button>', 'clear', 'info');

    }

});


function programOutput(strIn, strMode, strType) {

    if (strMode == 'clear') {
        jQuery('#divProgrammingMessage').html('');
    }

    var strOut = '<div class="' + strType + '">' + strIn + '</div>';

    jQuery(strOut).hide().appendTo("#divProgrammingMessage").fadeIn(1000);

    jQuery(strOut).Loadingdotdotdot({
        'speed': 150,
        'maxDots': 3,
        'word': strOut
    });

    setTimeout(function() {

        jQuery(strOut).Loadingdotdotdot("Stop");

    }, 5000);

}




async function testForUIDCheck() {

    strUniqueID = await getEdisonV3UID();

    if (strUniqueID != '') {

        checkUID(strUniqueID);

        // if ( sessionStorage.getItem( 'ep3SentData' ) != 'true' ) {

        // console.log ('Data not sent so sending for this session...');

        let strFirmwareVersion = await getEV3FirmwareVersion();
        // console.log ( strFirmwareVersion );

        let versionBootloader = strFirmwareVersion[1]
        let versionFirmware = strFirmwareVersion[2];

        let strUsage = await getPersistentData();
        console.log("strUsage");
        console.log(strUsage);

        logUsageData(strUniqueID, versionBootloader, versionFirmware, strUsage);

        // }

    }

}




// FIRMWARE ERROR FIX
function doFirmwareError() {

    console.log('doFirmwareError...');
    modFirmwareError.show();

    // jQuery('.modal').modal('hide');
    // jQuery('#modalFirmwareError').modal();

}

jQuery('#btnFixFirmware').click(function() {

    modFirmwareError.hide();
    gotoFirmwareUpdate();

});

jQuery('#btnFixFirmwareCancel').click(function() {

    jQuery('#divFixFirmwareCancelConfirm').show();
    jQuery('#btnFixFirmwareCancel').hide();
    jQuery('#btnFixFirmwareCancelConfirm').show();

});

jQuery('#btnFixFirmwareCancel').click(function() {

    jQuery('#divFixFirmwareCancelConfirm').show();
    jQuery('#btnFixFirmwareCancel').hide();
    jQuery('#btnFixFirmwareCancelConfirm').show();

});

jQuery('#btnFixFirmwareCancelConfirm').click(function() {

    // jQuery('#modalFirmwareError').modal('hide');
    modFirmwareError.hide();

    jQuery('#divFixFirmwareCancelConfirm').hide();
    jQuery('#btnFixFirmwareCancel').show();
    jQuery('#btnFixFirmwareCancelConfirm').hide();

});

jQuery('#modalFirmwareError').on('hidden.bs.modal', function(e) {

    jQuery('#divFixFirmwareCancelConfirm').hide();
    jQuery('#divFixFirmwareCancelConfirm').hide();
    jQuery('#btnFixFirmwareCancel').show();
    jQuery('#btnFixFirmwareCancelConfirm').hide();

});





$(eModProgram).on('hidden.bs.modal', function(e) {

    $('#btnLoadingWav').show();
    $('#btnPlayWav').hide();

});


$(eModSave).on('hidden.bs.modal', function(e) {

    $('#divProgramNameMessageLocal').hide();

});


$(eModLoad).on('hidden.bs.modal', function(e) {

    $('#btnLoadingWav').show();
    $('#btnPlayWav').hide();

});


// LOAD FROM LOCAL STORAGE
function loadStorage() {

    var storedPrograms = localStorage.getItem('ep3Programs');

    if (storedPrograms) {

        storedPrograms = JSON.parse(storedPrograms);

        storedPrograms.forEach(function(item, index) {

            console.log('loading program from storage: ' + storedPrograms[index].programName);
            addProgram(storedPrograms[index].programName, storedPrograms[index].programString);

        });

    } else {

        loadDemo(edVersion);

    }

    console.log('------------');

}

// USB CONTROLS
$('#aUSB').on('click', function(e) {

    modUSB.show();
    // console.log ('readUsbLoop:' + readUsbLoop);

});

// USB CONTROLS - Clear
jQuery('#usbClear').on('click', function(e) {

    // e.preventDefault();
    // jQuery('#fromUSBdata').val('');

    e.preventDefault();
    jQuery('#fromUSBdata').val('');
    webUSBUserData = [];

});



// USB CONTROLS - Copy from clipboard
clipboardUSB.on('success', function(e) {

    jQuery('#usbExport').prop('value', 'Copied!');
    setTimeout(function() {
        jQuery('#usbExport').prop('value', 'Copy to clipboard');
    }, 1000);
    e.clearSelection();

});


// USB CONTROLS - Send
jQuery('#usbSend').on('click', function(e) {

    console.log('usbSend...');
    e.preventDefault();

    var usbNum = document.getElementById('SendUSBData');
    var n = usbNum.value;
    console.log(n);

    webUSBCommandUserData(n);

});

// USB CONTROLS - Run
jQuery('#usbRun').on('click', function(e) {

    console.log('usbRun...');
    e.preventDefault();
    webUSBEnsureConnected();

});




function usbUpdateStatus(status) {

    switch (status) {

        case 'connected':
            // jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="yellow" /></svg><span>PENDING</span>');
            jQuery("#usbStatus").html('<mark class="alert alert-success"><span class="bi bi-circle-fill"></span>CONNECTED</mark>');
            // jQuery("#usbStatus").html('<mark class="alert alert-success">CONNECTED</mark>');
            break;

        case 'disconnected':
            // jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="yellow" /></svg><span>PENDING</span>');
            // jQuery("#usbStatus").html('<span>Disconnected</span>');
            jQuery("#usbStatus").html('<mark class="alert alert-light"><span class="bi bi-circle"></span>DISCONNECTED</mark>');
            break;

        case 1:
            //jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="green" /></svg><span>RUNNING</span>');
            jQuery("#usbStatus").html('<span>RUNNING</span>');
            break;

        default:
            // jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="yellow" /></svg><span>WAITING</span>');
            // jQuery("#usbStatus").html('...');
            jQuery("#usbStatus").html('<mark class="alert alert-light"><span class="bi bi-circle-fill"></span>DISCONNECTED</mark>');

    }

}




// LOAD A DEMO PROGRAM FROM ID
function loadDemo(demoID) {

    console.log('loadDemo:' + demoID);

    if ((demoID == '1') || (demoID == '2') || (demoID == '3')) {
        demoID = '00' + demoID;
    }

    var found = jsonDemos.filter(function(item) {
        return item.id === demoID;
    });
    var code = found[0]['code'];
    var title = found[0]['title'];

    //$( spanFilename ).html( title );
    //editor.setValue( code );
    //console.log( title );

    addProgram(title, code);

    // modDemos.hide();

}

// SAVE TO LOCAL STORAGE
function saveStorage() {

    arrPrograms[getProgramIndexByID(idTabActive)]['programString'] = getCode();
    localStorage.setItem('ep3Programs', JSON.stringify(arrPrograms));
    console.log('Saved: ' + idTabActive);

}


// SAVE
$("#btnSaveLocal").on("click", function(e) {

    var strProgramName = jQuery("#modSave #txtProgramName").val();

    strProgramName = fileNameClean(strProgramName);

    var strContent = getCode();

    var isValidResult = fileNameIsValid(strProgramName);

    if (isValidResult) {

        console.log('filename error');

        var displayDiv = '#divProgramNameMessageLocal';
        nameDisplayMessage(displayDiv, isValidResult, 'alert-warning', 'show');

    } else {

        $('#btnSaveLocal').prop('disabled', true);

        var displayDiv = "#divProgramNameMessageLocal";
        nameDisplayMessage(displayDiv, 'OK! Your program is being saved. The download of your program should begin soon.', 'alert-success', 'show');

        setTimeout(function() {

            var strFilename = strProgramName;

            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "_download.php");

            //form.setAttribute("enctype", "application/json");
            //form.setAttribute("enctype", "application/x-www-form-urlencoded");
            //form.setAttribute("enctype", "multipart/form-data");

            form.style.display = 'none';

            var filenameField = document.createElement("input");
            filenameField.setAttribute("name", "fn");
            filenameField.setAttribute("value", strFilename);
            form.appendChild(filenameField);

            var versionField = document.createElement("input");
            versionField.setAttribute("name", "v");
            versionField.setAttribute("value", edVersion);
            form.appendChild(versionField);

            var contentField = document.createElement("textarea");
            contentField.setAttribute("name", "content");
            contentField.value = strContent;
            form.appendChild(contentField);

            form.setAttribute("target", "_blank");

            document.body.appendChild(form); // Not entirely sure if this is necessary

            form.submit();

            modSave.hide();

            $('#btnSaveLocal').prop('disabled', false);

            setSpanName(strFilename);

            setTabName(strFilename);

            toggleSaveStatus('hide');

            arrPrograms[getProgramIndexByID(idTabActive)]['programName'] = strFilename;
            arrPrograms[getProgramIndexByID(idTabActive)]['programString'] = strContent;
            arrPrograms[getProgramIndexByID(idTabActive)]['programSaved'] = true;


        }, 2500);

        saveStorage();

        // window.dataLayer.push({
        // 	'event': 'analyticsEvent',
        // 	'analyticsCategory': 'Program',
        // 	'analyticsAction': 'Click',
        // 	'analyticsLabel': 'Save - Local',
        // 	'analyticsValue': 1
        // });

    }

});



// CLEAN FILE NAME
function fileNameClean(strInFileName) {

    var strProgramName = strInFileName.replace(/(<([^>]+)>)/ig, "");
    strProgramName = strProgramName.trim();
    strProgramName = strProgramName.replace(/^\.+/g, '');
    return strProgramName;

}


// CHECK FILE NAME
function fileNameIsValid(strFN) {

    var strReturn = null;
    strFN = strFN.trim();

    if (strFN == '') {
        strReturn = 'Please enter a name for your program. You need to name the program in order to save it.';
    } else if (strFN.length > 254) {
        strReturn = 'Whoops. There\'s a problem with that program name. Program names can be a maximum of 255 characters long.';
    }

    return strReturn;

}

// 
function nameDisplayMessage(displayDiv, displayMessage, displayType, displayBehaviour) {

    console.log('nameDisplayMessage...');

    $(displayDiv).hide();
    $(displayDiv).html(displayMessage);
    $(displayDiv).removeClass("alert-warning alert-success").addClass(displayType);
    $(displayDiv).slideDown(200);
    if (displayBehaviour == 'hide') {
        setTimeout(function() {
            $(displayDiv).slideUp(200)
        }, 3000);
    }
}


// 
function handleFileSelect(evt) {

    var files = evt.target.files;

    var Modalerror = document.getElementById("modLoadWarning");
    var ButtonUpload = document.getElementById("btnLoad");

    for (var i = 0, f; f = files[i]; i++) {

        var reader = new FileReader();

        reader.onload = (function(theFile) {

            return function(e) {

                var title = theFile.name;

                console.log(title);

                title = title.split('.');

                if (title[title.length - 1] == 'edpy') {

                    var noError = true;

                    try {

                        // console.log ( 'UPLOAD.........' );
                        // console.log ( e.target.result );

                        localStorage.setItem('ep3UploadPN', title[0]);
                        localStorage.setItem('ep3UploadPS', e.target.result);

                    } catch {

                        // alert("Incorrect file data, please upload an Invention Engine blocks save file (.edpy)");

                        noError = false;

                        /*var xml_text='<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="event_Start" id="}A_v`14$6amsK;Jm!`00" x="336" y="108" deletable="false" movable="false"></block></xml>'
                        var xml = Blockly.Xml.textToDom(xml_text);
                        Blockly.Xml.domToWorkspace(xml, workspace);
                        workspace.clearUndo();*/

                    } finally {

                        if (noError) {

                            console.log('no error - ready to load');
                            ButtonUpload.disabled = false;
                            Modalerror.innerHTML = "<div class='alert alert-success'><strong>Ready to load program:</strong> " + title[0] + "</div>";

                        }

                    }

                } else {
                    alert("Lorem - Incorrect File type, please upload an EdPy save file (.edpy)");
                }

            };

        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
}


// LOAD LOCAL UPLOAD
$("#btnLoad").on("click", function(e) {

    //e.preventDefault();

    var txtFile = modLoadBtnPress();

    if (txtFile) {

        txtFile = txtFile.replace(/^.*[\\\/]/, "");
        txtFile = txtFile.replace(".edpy", "");

        // localStorage.setItem("ep3Programstring", "");
        // localStorage.setItem("ep3UploadPN", txtFile);

        // localStorage.setItem( 'ep3UploadPN', title );
        // localStorage.setItem( 'ep3UploadPS', e.target.result );

        modLoad.hide();

        // window.dataLayer.push({
        // 	'event': 'analyticsEvent',
        // 	'analyticsCategory': 'Program',
        // 	'analyticsAction': 'Click',
        // 	'analyticsLabel': 'Load Saved - Local',
        // 	'analyticsValue': 1
        // });

    }

});


// 
function modLoadBtnPress() {

    var strProgramName = localStorage.getItem('ep3UploadPN');
    var strProgramString = localStorage.getItem('ep3UploadPS');

    try {

        blnIgnoreChange = true;

        addProgram(strProgramName, strProgramString);

        localStorage.setItem('ep3UploadPN', '');
        localStorage.setItem('ep3UploadPS', '');

        return inputFile.value;

    } catch {

        alert('Error...');
        return false;

    }


}


function findAPI() {

    jQuery("#apiStatusOutput").html("");
    jQuery("<div id='divServerResult'></span>Server: <span id='spanServerResultLocation'></span></div>").hide().appendTo("#apiStatusOutput").fadeIn(500);
    jQuery("#spanServerResultLocation").Loadingdotdotdot({
        "speed": 150,
        "maxDots": 3,
        "word": "searching"
    });

    jQuery.ajax({
        url: apiBaseURL,
        type: "post",
        dataType: "html",
        success: function(data) {
            setTimeout(
                function() {
                    jQuery("#spanServerResultLocation").Loadingdotdotdot("Stop");
                    jQuery("#spanServerResultLocation").addClass("spanServerResultLocationSuccess");
                    jQuery("#spanServerResultLocation").html(data);
                    setTimeout(
                        function() {
                            testAPI();
                        }, 1000);
                }, 1000);
        },
        error: function(data) {
            jQuery("#spanServerResultLocation").Loadingdotdotdot("Stop");
            jQuery("#spanServerResultLocation").addClass("spanServerResultLocationError");
            jQuery("#spanServerResultLocation").html("NO SERVER FOUND");
        }
    });
}


function testAPI() {

    var mbc = [

        '#-------------Setup----------------',
        'import Ed',
        'Ed.EdisonVersion = Ed.V3',
        'Ed.DistanceUnits = Ed.CM',
        'Ed.Tempo = Ed.TEMPO_MEDIUM',
        '#--------Your code below-----------',
        '# Test 11: Beep',
        'Ed.PlayBeep()',
        'Ed.TimeWait(1000, Ed.TIME_MILLISECONDS)',
        ''

    ].join('\n');

    jQuery("<div id='divCompileResult'></span>Compile Test: <span id='spanCompileResultDetails'></span></div>").hide().appendTo("#apiStatusOutput").fadeIn(500);

    jQuery("#spanCompileResultDetails").Loadingdotdotdot({
        "speed": 150,
        "maxDots": 3,
        "word": "working"
    });

    var timeStart = new Date().getTime();
    var timeEnd = 0;
    var timeTotal = 0;

    var request = new XMLHttpRequest();

    request.onload = function(e) {

        try {

            var response = JSON.parse(this.responseText);

            console.log(response);

            if (response.error) {

                jQuery("#spanCompileResultDetails").Loadingdotdotdot("Stop");
                jQuery("#spanCompileResultDetails").addClass("spanServerResultLocationError");
                jQuery("#spanCompileResultDetails").html("compile error<br>");
                jQuery("#spanCompileResultDetails").append(this.responseText);


            } else {

                timeEnd = new Date().getTime();
                timeTotal = timeEnd - timeStart;
                jQuery("#spanCompileResultDetails").Loadingdotdotdot("Stop");
                jQuery("#spanCompileResultDetails").addClass("spanServerResultLocationSuccess");
                jQuery("#spanCompileResultDetails").html("compile complete in " + timeTotal + "ms");

            }

        } catch (e) {

            console.log('in catch...');
            console.log(e);

            jQuery("#spanCompileResultDetails").Loadingdotdotdot("Stop");
            jQuery("#spanCompileResultDetails").addClass("spanServerResultLocationError");
            jQuery("#spanCompileResultDetails").html("compile error<br>");
            jQuery("#spanCompileResultDetails").append(this.responseText);

        }
    };

    request.onerror = function() {

        jQuery("#spanCompileResultDetails").Loadingdotdotdot("Stop");
        jQuery("#spanCompileResultDetails").addClass("spanServerResultLocationError");
        jQuery("#spanCompileResultDetails").html("compile error<br>");
        jQuery("#spanCompileResultDetails").append(this.responseText);

    };

    // var gaClientId = '';
    //var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
    //if (ga) {
    //   ga(function() {
    //      gaClientId = ga.getAll()[0].get('clientId');
    //      console.log (gaClientId);
    //   });
    //}

    //request.open("POST", testURL + "ie/compile?v=1&mcid=" + gaClientId, true);

    var urlAPI = '';
    // urlAPI = apiBaseURL + 'ep/compile/ep_compile_usb_v3';
    urlAPI = apiBaseURL + 'ep/compile/usb';
    if (strCompiler) {
        urlAPI = urlAPI + '?strCompiler=' + strCompiler;
    }

    request.open("POST", urlAPI, true);
    request.send(mbc);

    // request.open("POST", apiBaseURL + "ep/compile/usb", true);	
    // request.send(mbc);

}


// CHECK NUMBER OF OPEN PROGRAMS
function blnNewProgramOK() {

    if (arrPrograms.length < intMaxProgs) {
        return true;
    } else {
        return false;
    }

}

// CHECK VERSION OF PROGRAM
function intProgramVersion() {

    var programVersion = 3;

    var code = arrPrograms[getProgramIndexByID(idTabActive)]['programString'];

    var regex_v1 = new RegExp('Ed.EdisonVersion = Ed.V1');
    var regex_v2 = new RegExp('Ed.EdisonVersion = Ed.V2');
    var regex_v3 = new RegExp('Ed.EdisonVersion = Ed.V3');

    if (regex_v1.test(code)) {
        programVersion = 1;
    }

    if (regex_v2.test(code)) {
        programVersion = 2;
    }

    if (regex_v3.test(code)) {
        programVersion = 3;
    }

    // alert (programVersion);

    return programVersion;

}


// GENERATE A PROGRAM ID BASED ON TIME
function genProgramID() {

    var ID = new Date().valueOf();

    arrPrograms.forEach(function(item, index) {
        if (item['programID'] == ID) {
            ID = ID + 1000000011;
        }
    });

    return ID;

}


//
function getProgramIndexByID(progID) {

    var indReturn;

    arrPrograms.forEach(function(item, index) {
        if (item['programID'] == progID) {
            indReturn = index;
        }
    });

    //console.log ( 'getProgramIndexByID: ' + progID + ' --- index: ' +  indReturn );

    return indReturn;

}


//
function toggleSaveStatus(status) {

    if (status == 'show') {
        $(spanSaveStatus).show();
    } else {
        $(spanSaveStatus).hide();
    }

}


function populateDemos() {

    var htmlModalOut = '';
    var htmlListOut = '';

    for (const key in jsonDemos) {

        if ((jsonDemos[key]['id'] != '001') && (jsonDemos[key]['id'] != '002') && (jsonDemos[key]['id'] != '003')) {

            if (parseInt(edVersion) == parseInt(jsonDemos[key]['version'])) {

                htmlModalOut += '<div class="row align-items-center h-100 divDemoProgramHolder" data-id="' + jsonDemos[key]['id'] + '" data-title="' + jsonDemos[key]['title'] + '">';

                htmlModalOut += '<div class="col-9">';
                htmlModalOut += '<div class="divDemoProgram">';
                htmlModalOut += '<span class="spanDemoProgramName">' + jsonDemos[key]['title'] + '</span>';
                htmlModalOut += '<span class="spanDemoProgramDesc">' + jsonDemos[key]['description'] + '</span>';
                htmlModalOut += '</div>';
                htmlModalOut += '</div>';

                htmlModalOut += '<div class="col-3">';
                htmlModalOut += '<button type="button" class="btn btn-primary btn-sm btnDemoProgramLoad">Load program</button>';
                htmlModalOut += '</div>';

                htmlModalOut += '</div>';

                htmlListOut += '<li><a class="btnDemoProgramLoad"  data-id="' + jsonDemos[key]['id'] + '" data-title="' + jsonDemos[key]['title'] + '">' + jsonDemos[key]['title'] + '</a></li>';

            }

        }

    }

    // htmlModalOut = '<div id="divDemoProgramList"><div class="container h-100">' + htmlModalOut + '</div></div>';
    // $( modDemosList ).html( htmlModalOut );	

    htmlListOut = '<ul id="epDocsResultsList">' + htmlListOut + '</ul>';
    $(epProgramsList).html(htmlListOut);

}






// CLEAR REMOTE CODES
jQuery("#btnClearRemoteCodes").on("click", async function(e) {

    console.log('btnClearRemoteCodes');

    jQuery('#btnClearRemoteCodes').prop('disabled', true);

    const result = await webUSBCommandPutPersistentData(88, new Uint8Array(64));

    console.log(result);

    let strResult = '';

    if (result == 'OK') {
        // strResult = '<mark class="alert alert-warning"><span class="oi oi-warning"></span>Remote codes have been cleared.</mark>';
        strResult = '<span style="color:#28a745; margin-left: 15px;"><span class="oi oi-check"></span> Remote codes have been cleared.</span>';
    } else {
        strResult = '<span style="color:#dc3545; margin-left: 15px;"><span class="oi oi-alert"></span> An error has occurred.</span>';
        jQuery('#btnClearRemoteCodes').prop('disabled', false);
    }

    jQuery('#divClearRemoteCodesOutput').html(strResult).fadeIn(400, function() {

        setTimeout(function() {
            jQuery('#divClearRemoteCodesOutput').fadeOut(400);
            jQuery('#btnClearRemoteCodes').prop('disabled', false);
        }, 5000);

    });


});


jQuery('#modalHelp').on('hidden.bs.modal', function(e) {

    jQuery('#btnClearRemoteCodes').prop('disabled', false);

});





// ----------------------------------------------------------
// FIRMWARE
// ----------------------------------------------------------

// POP FIRMWARE UPDATE MODAL
jQuery("#aPopFirmwareUpdate").on("click", function(e) {

    fuButtonStatus("start");
    modFirmwareUpdate.show();

});


// CLOSE FIRMWARE UPDATE MODAL
jQuery("#modalFirmwareUpdate").on("hidden.bs.modal", function(e) {

    fuFeebackCardClear();
    fuButtonStatus("start");

});

// RUN FIRMWARE UPDATE
jQuery('#btnFUHubConnect').click(function() {

    prepareEdisonAndSendFirmware();

});


// RE-RUN FIRMWARE UPDATE
jQuery('#btnFUHubReconnect').click(function() {

    prepareEdisonAndSendFirmware();

});

function fuFeebackCardPrepend(strLineEntry, strType) {

    jQuery('#fuStatusHolder div.card-body').prepend('<div class="card-body-line card-body-line-' + strType + '">' + strLineEntry + '</div>');
    jQuery('#fuStatusHolder div.card-body div.card-body-line').css('opacity', '0.6');
    jQuery('div.card-body div.card-body-line:first-of-type').css('opacity', '1');

}

function fuFeebackCardAppend(strLineEntry, strType) {

    jQuery('#fuStatusHolder div.card-body').append('<div class="card-body-line card-body-line-' + strType + '">' + strLineEntry + '</div>');
    jQuery('#fuStatusHolder div.card-body div.card-body-line').css('opacity', '0.6');
    jQuery('div.card-body div.card-body-line:last-of-type').css('opacity', '1');

}

function fuFeebackCardClear() {

    jQuery("#fuStatusHolder div.card-body").html("");

}

function fuButtonStatus(strStatus) {

    console.log('fuButtonStatus:' + strStatus);

    var arrIconClasses = ['rotate', 'oi-chevron-right', 'oi-cog', 'oi-check'];

    switch (strStatus) {

        case "start":

            fuFeebackCardClear();
            fuFeebackCardAppend('Ready...', 'prompt');

            jQuery("#btnFUHubConnect").show();
            jQuery("#btnFUHubConnect").prop("disabled", false);
            // jQuery("#btnFUHubConnect span.oi").removeClass(arrIconClasses).addClass("oi-chevron-right");
            jQuery("#btnFUHubConnect span.oi").removeClass(arrIconClasses).addClass("oi-chevron-right");

            // jQuery("#btnFUHubReconnect").prop("disabled", true);
            jQuery("#btnFUHubReconnect").hide();
            //jQuery("#btnFUHubReconnect span.oi").removeClass(arrIconClasses).addClass("oi-chevron-right");
            jQuery("#btnFUHubReconnect span.oi").removeClass(arrIconClasses).addClass("oi-chevron-right");

            break;

        default:
            // code block

    }

}

function usbUpdateStatus(status) {

    switch (status) {

        case 'connected':
            // jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="yellow" /></svg><span>PENDING</span>');
            jQuery("#usbStatus").html('<mark class="alert alert-success"><span class="bi bi-circle-fill"></span>CONNECTED</mark>');
            // jQuery("#usbStatus").html('<mark class="alert alert-success">CONNECTED</mark>');
            break;

        case 'disconnected':
            // jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="yellow" /></svg><span>PENDING</span>');
            // jQuery("#usbStatus").html('<span>Disconnected</span>');
            jQuery("#usbStatus").html('<mark class="alert alert-light"><span class="bi bi-circle"></span>DISCONNECTED</mark>');
            break;

        case 1:
            //jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="green" /></svg><span>RUNNING</span>');
            jQuery("#usbStatus").html('<span>RUNNING</span>');
            break;

        default:
            // jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="yellow" /></svg><span>WAITING</span>');
            // jQuery("#usbStatus").html('...');
            jQuery("#usbStatus").html('<mark class="alert alert-light"><span class="bi bi-circle-fill"></span>DISCONNECTED</mark>');

    }

}

function fuFeebackCardAppend(strLineEntry, strType) {

    jQuery('#fuStatusHolder div.card-body').append('<div class="card-body-line card-body-line-' + strType + '">' + strLineEntry + '</div>');
    jQuery('#fuStatusHolder div.card-body div.card-body-line').css('opacity', '0.6');
    jQuery('div.card-body div.card-body-line:last-of-type').css('opacity', '1');

}

function gotoFirmwareUpdate() {

    modProgram.hide();
    fuButtonStatus("start");
    modFirmwareUpdate.show();

};


function isDirty() {

    var isDirty = false;
    arrPrograms.forEach(function(item, index) {
        if (item['programSaved'] == false) {
            isDirty = true;
        }
    });
    return isDirty;

}


function processAPIHexString(inputHexStr) {

    var progSize = inputHexStr.length / 2;
    var userProgData = new Uint8Array(progSize);
    var i, j;
    j = 0;
    for (i = 0; i < inputHexStr.length; i = i + 2) {
        var numString = "0x" + inputHexStr.substring(i, i + 2);
        var numData = parseInt(numString);
        userProgData[j] = numData;
        j++;
    }
    console.log(userProgData);
    if (progSize > 2048) {

        // alert("CODE TO BIG");
        // programOutput('Lorem: CODE TO BIG', 'append', 'error');	  
        // jQuery('#modalProgramming').modal();

        return;

    }

    return userProgData;

}

function isPositiveInteger(value) {

    // Check if the value is a number
    if (typeof value !== 'number') {
        return false;
    }

    // Check if the value is an integer
    if (!Number.isInteger(value)) {
        return false;
    }

    // Check if the value is positive
    if (value <= 0) {
        return false;
    }

    return true;

}


// CHECK UID
async function checkUID(uid) {

    // console.log('checkUID...');
    // console.log('uid: ' + uid);

    const data = {
        act: 'check',
        uid: uid,
        nce: 'KGUs^986itugk)'
    }

    // console.log(data);

    jQuery.ajax({
        url: "_ute.php",
        type: "post",
        data: data,
        success: function(response) {
            console.log(response);
        },
        error: function(response) {
            console.log(response);
        }
    });

}


// LOG COMPILE
async function logUsageData(uid, bl, fw, ud) {

    // console.log('logUsageData...');
    // console.log( ud );
    // console.log('uid: ' + uid);

    const data = {
        act: 'log',
        uid: uid,
        bl: bl,
        fw: fw,
        ud: JSON.stringify(ud), // Convert ud to a JSON string
        note: '',
        nce: 'KGUIFToilygkui8(*^986itugk)'
    };

    jQuery.ajax({
        url: "_ute.php",
        type: "POST",
        data: data,
        success: function(response) {
            console.log(response);
            sessionStorage.setItem('ep3SentData', 'true');
        },
        error: function(response) {
            console.log(response);
        }
    });


    // const data = {
    // 	act: 'log',
    // 	uid: uid,
    // 	bl: bl,
    // 	fw: fw,
    // 	ud: ud,
    // 	note: '',
    // 	nce: 'KGUIFToilygkui8(*^986itugk)'
    // }

    // jQuery.ajax({
    // 	url: "_ute.php",
    // 	type: "post",
    // 	//dataType: "json",
    // 	data: data,
    // 	success: function (response) {
    // 		console.log (response);
    // 		sessionStorage.setItem( 'ep3SentData', 'true' );
    // 	},
    // 	error: function (response) {
    // 		console.log (response);
    // 	}
    // });

}

function calculateHeights() {

    let epContainerHeight = document.getElementById('epContainer').offsetHeight;
    let epHeaderHeight = document.getElementById('epHeader').offsetHeight;
    let epBody = document.getElementById('epBody');

    epBody.style.height = (epContainerHeight - epHeaderHeight) + 'px';
    document.getElementById('epBodyLeft').style.height = (epContainerHeight - epHeaderHeight) + 'px';
    document.getElementById('epBodyMiddle').style.height = (epContainerHeight - epHeaderHeight) + 'px';
    document.getElementById('epBodyRight').style.height = (epContainerHeight - epHeaderHeight) + 'px';


    // Left
    // ---
    document.getElementById('epLineHelp').style.height = '150px';
    document.getElementById('epDocs').style.height = (

        epContainerHeight -
        document.getElementById('epHeader').offsetHeight -
        document.getElementById('epLineHelp').offsetHeight

    ) + 'px';

    document.getElementById('epDocsResults').style.height = (

        epContainerHeight -
        document.getElementById('epHeader').offsetHeight -
        document.getElementById('epDocsTitle').offsetHeight -
        document.getElementById('epDocsSearch').offsetHeight -
        document.getElementById('epLineHelp').offsetHeight

    ) + 'px';

    document.getElementById('epDocsDisplayText').style.height = (

        epContainerHeight -
        document.getElementById('epHeader').offsetHeight -
        document.getElementById('epDocsTitle').offsetHeight -
        document.getElementById('epLineHelp').offsetHeight

    ) + 'px';

    // Right
    // ---
    document.getElementById('epCompiler').style.height = '150px';
    document.getElementById('epEditor').style.height = (

        epContainerHeight -
        document.getElementById('epHeader').offsetHeight -
        document.getElementById('tabFilesHolder').offsetHeight -
        document.getElementById('epCompiler').offsetHeight

    ) + 'px';

}



function setupSnippets() {

    // pop funcs
    for (var i in jsonFunctions) {
        var item = jsonFunctions[i];
        autocompleteSnippets.push({
            tabTrigger: item.name ? item.name : null,
            content: item.name ? item.name : null,
            help: item.description ? item.description : null,
            hasDoc: item.hasDoc ? item.hasDoc : null,
        });
    }

    // pop classes
    for (var i in jsonClasses) {

        // Class member data		
        var item = jsonClasses[i];

        // Variables			
        var tabTrigger = '';
        var content = '';
        var title = '';

        var className = 'Ed';

        if (item.isFunc) {
            tabTrigger = className + "." + item.name + "()";
            content = className + "." + item.name + "(";
            title = className + "." + item.name + "(";
            if (item.parameters) {
                content += item.parameters;
                title += item.parametersDisplay;
            }
            content += ")";
            title += ")";

        } else {

            tabTrigger = className + "." + item.name;
            content = tabTrigger;
            title = tabTrigger;

        }

        // Add to autocomplete list.		
        autocompleteSnippets.push({
            tabTrigger: tabTrigger,
            content: content,
            title: title,
            help: item.description ? item.description : null,
            hasDoc: item.hasDoc ? item.hasDoc : null,
        });

    }

    var customSnippetCompleter = {

        getCompletions: function(editor, session, pos, prefix, callback) {

            var completions = [];

            var snippetMap = snippetManager.snippetMap;

            var snippets = snippetMap['edpy'];

            for (var i = snippets.length; i--;) {

                var s = snippets[i];

                // console.log(s);
                // console.log(s.name);
                // console.log(s.tabTrigger);

                var caption = s.name || s.tabTrigger;

                if (!caption) {

                    continue;

                } else {

                    completions.push({
                        caption: caption,
                        help: s.help,
                        hasDoc: s.hasDoc,
                        snippet: s.content,
                        name: s.title,
                        meta: "Edison",
                        type: "snippet",
                    });
                }
            }

            callback(null, completions);

        },

        getDocTooltip: function(item) {

            if (item.type == "snippet" && !item.docHTML) {

                var hasDoc = item.hasDoc ? "<button data-docname=" + item.caption + " data-title='" + item.caption + "' class='btn btn-light btnDocs'>View Documentation</button>" : "";
                item.docHTML = '<p>' + lang.escapeHTML(item.caption) + '<hr>' + lang.escapeHTML(item.help) + '</p>' + hasDoc;

            }

        }

    };

    editor.completers = [customSnippetCompleter];
    snippetManager.register(autocompleteSnippets, 'edpy');

}







// PROGRAMMING TYPE
$('#btnProgrammingMethod').on('click', function(e) {
    modHelp.hide();
    modProgrammingMethod.show();
});

// PROGRAMMING TYPE - CHANGE - USB
$('#btnChangeUSBMethod').on("click", function(e) {

    //    console.log ('btnChangeUSBMethod');
    localStorage.setItem('mbaProgrammingMethod', 'USB');

    doUISetup('USB');

});


// PROGRAMMING TYPE - CHANGE - FLASH
$('#btnChangeFlashMethod').on("click", function(e) {

    //    console.log ('btnChangeFlashMethod');
    localStorage.setItem('mbaProgrammingMethod', 'FLASH');

    doUISetup('FLASH');

});




function doUISetup(layout) {

    console.log('doUISetup: ' + layout);

    if (layout == 'FLASH') {

        aProgram.style.display = 'none';
        aProgramFlash.style.display = 'block';

    }

    if (layout == 'USB') {

        aProgram.style.display = 'block';
        aProgramFlash.style.display = 'none';

    }

    var strOut = '<div>Currently using <strong>' + layout + '</strong> method.</div>';
    $(spanProgrammingMethod).empty();
    $(spanProgrammingMethod).html(strOut).hide().fadeIn();

}


// POP FLASH PROGRAMMING

jQuery(aProgramFlash).click(function() {

    console.log('aProgramFlash');

    // var strError = checkBeforeFlash();
    var strError = '';

    if (strError) {

        console.log(strError);

        // Need to rework the Flasher modal to include error handling

        // programOutput( strError, 'clear', 'error' );
        // jQuery('#modalProgramming').modal();

    } else {

        //   jQuery("#modalFlasher").modal();

        modProgramFlash.show();

    }

});




// jQuery('#modalFlasher').on('hidden.bs.modal', function (e) {

//    console.log ('closed...');
//    flasherStop();

//  });


// RUN FLASH PROGRAMMING
jQuery('#btnFlasherRun').click(function() {
    // jQuery(aProgramFlash).click(function() {

    console.log('start flash...');

    let flasherSpeed = 0;
    let flasherLevel = 0;

    switch (slider.value) {

        case '1':
            flasherSpeed = 30;
            flasherLevel = 2;
            break;
        case '2':
            flasherSpeed = 30;
            flasherLevel = 4;
            break;
        case '3':
            flasherSpeed = 60;
            flasherLevel = 2;
            break;
        case '4':
            flasherSpeed = 60;
            flasherLevel = 4;
            break;

    }

    flasherProgram(flasherSpeed, flasherLevel);

});

jQuery('#btnFlasherStop').click(function() {

    console.log('flasher stopped...');
    flasherStop();

});