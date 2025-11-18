"use strict";
var lineHelpDistanceUnits = "Ed.CM",
    lineHelpTempoUnits = "Ed.TEMPO_MEDIUM",
    unitsLastChecked = (new Date).getTime(),
    unitCheckInterval = 500;
const unitTypes = {
        distance: 0,
        time: 1,
        tempo: 2
    },
    edClassLineHelp = {
        constants: {
            "Ed.FORWARD": {
                val: "drives forward for"
            },
            "Ed.BACKWARD": {
                val: "drives backward for"
            },
            "Ed.FORWARD_RIGHT": {
                val: "drives forward to the right for",
                units: "degrees"
            },
            "Ed.BACKWARD_RIGHT": {
                val: "drives backward to the right for",
                units: "degrees"
            },
            "Ed.FORWARD_LEFT": {
                val: "drives forward to the left for",
                units: "degrees"
            },
            "Ed.BACKWARD_LEFT": {
                val: "drives backward to the left for",
                units: "degrees"
            },
            "Ed.SPIN_RIGHT": {
                val: "spins clockwise for",
                units: "degrees"
            },
            "Ed.SPIN_LEFT": {
                val: "spins counter-clockwise for",
                units: "degrees"
            },
            "Ed.STOP": {
                val: "comes to an immediate stop, ignoring the duration of"
            },
            "Ed.SPEED_1": {
                val: 1
            },
            "Ed.SPEED_2": {
                val: 2
            },
            "Ed.SPEED_3": {
                val: 3
            },
            "Ed.SPEED_4": {
                val: 4
            },
            "Ed.SPEED_5": {
                val: 5
            },
            "Ed.SPEED_6": {
                val: 6
            },
            "Ed.SPEED_7": {
                val: 7
            },
            "Ed.SPEED_8": {
                val: 8
            },
            "Ed.SPEED_9": {
                val: 9
            },
            "Ed.SPEED_10": {
                val: 10
            },
            "Ed.SPEED_FULL": {
                val: "full"
            },
            "Ed.DISTANCE_UNLIMITED": {
                val: "no distance, sets Edisons motors to move and ignores the distance type of",
                units: ""
            },
            "Ed.MOTOR_LEFT": {
                val: "left"
            },
            "Ed.MOTOR_RIGHT": {
                val: "right"
            },
            "Ed.TIME_SECONDS": {
                val: "seconds"
            },
            "Ed.TIME_MILLISECONDS": {
                val: "milliseconds"
            },
            "Ed.ON": {
                val: "on"
            },
            "Ed.OFF": {
                val: "off"
            },
            "Ed.NOTE_A_6": {
                val: "A (low)"
            },
            "Ed.NOTE_A_SHARP_6": {
                val: "A sharp (low)"
            },
            "Ed.NOTE_A_7": {
                val: "A"
            },
            "Ed.NOTE_A_SHARP_7": {
                val: "A sharp"
            },
            "Ed.NOTE_B_6": {
                val: "B (low)"
            },
            "Ed.NOTE_B_7": {
                val: "B"
            },
            "Ed.NOTE_C_7": {
                val: "C"
            },
            "Ed.NOTE_C_SHARP_7": {
                val: "C sharp"
            },
            "Ed.NOTE_C_8": {
                val: "C (high)"
            },
            "Ed.NOTE_D_7": {
                val: "D"
            },
            "Ed.NOTE_D_SHARP_7": {
                val: "D sharp"
            },
            "Ed.NOTE_E_7": {
                val: "E"
            },
            "Ed.NOTE_F_7": {
                val: "F"
            },
            "Ed.NOTE_F_SHARP_7": {
                val: "F sharp"
            },
            "Ed.NOTE_G_7": {
                val: "G"
            },
            "Ed.NOTE_G_SHARP_7": {
                val: "G sharp"
            },
            "Ed.NOTE_REST": {
                val: "rest"
            },
            "Ed.NOTE_SIXTEENTH": {
                val: "sixteenth"
            },
            "Ed.NOTE_EIGHTH": {
                val: "eighth"
            },
            "Ed.NOTE_QUARTER": {
                val: "quarter"
            },
            "Ed.NOTE_HALF": {
                val: "half"
            },
            "Ed.NOTE_WHOLE": {
                val: "whole"
            },
            "Ed.OBSTACLE_NONE": {
                val: "no obstacle"
            },
            "Ed.OBSTACLE_DETECTED": {
                val: "obstacle detected"
            },
            "Ed.OBSTACLE_RIGHT": {
                val: "obstacle on the right"
            },
            "Ed.OBSTACLE_LEFT": {
                val: "obstacle on the left"
            },
            "Ed.OBSTACLE_AHEAD": {
                val: "obstacle straight ahead"
            },
            "Ed.LINE_ON_BLACK": {
                val: "on black"
            },
            "Ed.LINE_ON_WHITE": {
                val: "on white"
            },
            "Ed.KEYPAD_NONE": {
                val: "no buttons pressed"
            },
            "Ed.KEYPAD_TRIANGLE": {
                val: "triangle button pressed"
            },
            "Ed.KEYPAD_ROUND": {
                val: "round button pressed"
            },
            "Ed.CLAP_NOT_DETECTED": {
                val: "no clap detected"
            },
            "Ed.CLAP_DETECTED": {
                val: "clap detected"
            },
            "Ed.DRIVE_STRAINED": {
                val: "strained"
            },
            "Ed.DRIVE_NO_STRAIN": {
                val: "not strained"
            },
            "Ed.MUSIC_FINISHED": {
                val: "not playing a tune"
            },
            "Ed.MUSIC_NOT_FINISHED": {
                val: "playing a tune"
            },
            "Ed.REMOTE_CODE_0": {
                val: "code 0"
            },
            "Ed.REMOTE_CODE_1": {
                val: "code 1"
            },
            "Ed.REMOTE_CODE_2": {
                val: "code 2"
            },
            "Ed.REMOTE_CODE_3": {
                val: "code 3"
            },
            "Ed.REMOTE_CODE_4": {
                val: "code 4"
            },
            "Ed.REMOTE_CODE_5": {
                val: "code 5"
            },
            "Ed.REMOTE_CODE_6": {
                val: "code 6"
            },
            "Ed.REMOTE_CODE_7": {
                val: "code 7"
            },
            "Ed.EVENT_TIMER_FINISHED": {
                val: "the countdown timer has finished"
            },
            "Ed.EVENT_REMOTE_CODE": {
                val: "a remote control code is received"
            },
            "Ed.EVENT_IR_DATA": {
                val: "IR data from another Edison is received"
            },
            "Ed.EVENT_CLAP_DETECTED": {
                val: "a clap has been detected"
            },
            "Ed.EVENT_OBSTACLE_ANY": {
                val: "any obstacle is detected"
            },
            "Ed.EVENT_OBSTACLE_LEFT": {
                val: "an obstacle is detected on the left"
            },
            "Ed.EVENT_OBSTACLE_RIGHT": {
                val: "an obstacle is detected on the right"
            },
            "Ed.EVENT_OBSTACLE_AHEAD": {
                val: "an obstacle is detected straight ahead"
            },
            "Ed.EVENT_DRIVE_STRAIN": {
                val: "motor strain has been detected"
            },
            "Ed.EVENT_KEYPAD_TRIANGLE": {
                val: "the triangle button has been pressed"
            },
            "Ed.EVENT_KEYPAD_ROUND": {
                val: "the round button has been pressed"
            },
            "Ed.EVENT_LINE_TRACKER_ON_WHITE": {
                val: "the line tracker has detected white"
            },
            "Ed.EVENT_LINE_TRACKER_ON_BLACK": {
                val: "the line tracker has detected black"
            },
            "Ed.EVENT_LINE_TRACKER_SURFACE_CHANGE": {
                val: "the line tracker has detected a change"
            },
            "Ed.EVENT_TUNE_FINISHED": {
                val: "a note or tune string has finished playing"
            },
            "Ed.CM": {
                val: {
                    singular: "cm",
                    plural: "cms"
                }
            },
            "Ed.INCH": {
                val: {
                    singular: "inch",
                    plural: "inches"
                }
            },
            "Ed.TIME": {
                val: {
                    singular: "millisecond",
                    plural: "milliseconds"
                }
            },
            "Ed.V1": {
                val: "Edison V1.0"
            },
            "Ed.V2": {
                val: "Edison V2.0"
            },
            "Ed.TEMPO_VERY_SLOW": {
                val: "very slow"
            },
            "Ed.TEMPO_SLOW": {
                val: "slow"
            },
            "Ed.TEMPO_MEDIUM": {
                val: "medium"
            },
            "Ed.TEMPO_FAST": {
                val: "fast"
            },
            "Ed.TEMPO_VERY_FAST": {
                val: "very fast"
            },
            "Ed.DistanceUnits": "The motor distance/duration units",
            "Ed.Tempo": "The music tempo",
            "Ed.EdisonVersion": "Current version of Edison"
        },
        variables: {
            "Ed.DistanceUnits": "The motor distance/duration units",
            "Ed.Tempo": "The music tempo",
            "Ed.EdisonVersion": "Current version of Edison"
        },
        functions: {
            "Ed.PlayBeep": {
                val: "Plays a beep sound."
            },
            "Ed.Drive": {
                val: "Edison {0} {2} {3} at speed {1}.",
                requireNumeric: [2],
                units: unitTypes.distance,
                formatParamCount: 3,
                includeUnits: !0
            },
            "Ed.LeftLed": {
                val: "Turns Edison's left LED {0}",
                formatParamCount: 1
            },
            "Ed.RightLed": {
                val: "Turns Edison's right LED {0}",
                formatParamCount: 1
            },
            "Ed.ObstacleDetectionBeam": {
                val: "Turns Edison's Obstacle Detection {0}",
                formatParamCount: 1
            },
            "Ed.LineTrackerLed": {
                val: "Turns Edison's line tracker {0}",
                formatParamCount: 1
            },
            "Ed.SendIRData": {
                val: "Sends other Edisons the message {0} via infrared light",
                formatParamCount: 1
            },
            "Ed.StartCountDown": {
                val: "Edison starts counting down from {0} {1}",
                formatParamCount: 2
            },
            "Ed.TimeWait": {
                val: "Edison waits {0} {1}",
                formatParamCount: 1,
                requireNumeric: [0],
                units: unitTypes.time,
                includeUnits: !0
            },
            "Ed.RegisterEventHandler": {
                val: "Stops the main program and jumps to {1} when {0}",
                formatParamCount: 2
            },
            "Ed.PlayMyBeep": {
                val: "Plays a beep at {0} Hz",
                formatParamCount: 1
            },
            "Ed.PlayTone": {
                val: "Plays a {1} {0} at a {2} pace",
                units: unitTypes.tempo,
                formatParamCount: 2,
                includeUnits: !0
            },
            "Ed.PlayTune": {
                val: "Plays the tune {0} at a {1} pace",
                units: unitTypes.tempo,
                formatParamCount: 1,
                includeUnits: !0
            },
            "Ed.DriveLeftMotor": {
                val: "Edison's left wheel {0} {2} {3} at speed {1}",
                requireNumeric: [1],
                units: unitTypes.distance,
                formatParamCount: 3,
                includeUnits: !0
            },
            "Ed.DriveRightMotor": {
                val: "Edison's right wheel {0} {2} {3} at speed {1}",
                requireNumeric: [1],
                units: unitTypes.distance,
                formatParamCount: 3,
                includeUnits: !0
            },
            "Ed.ReadObstacleDetection": {
                val: "the state of Edison's obstacle detection"
            },
            "Ed.ReadKeypad": {
                val: "the state of Edison's keypad buttons"
            },
            "Ed.ReadClapSensor": {
                val: "the state of Edison's clap sensor"
            },
            "Ed.ReadLineState": {
                val: "the state of Edison's line traker"
            },
            "Ed.ReadRemote": {
                val: "the value of Edison's received remote control code"
            },
            "Ed.ReadIRData": {
                val: "the value of Edison's received IR data"
            },
            "Ed.ReadLeftLightLevel": {
                val: "the value of Edison's left light sensor"
            },
            "Ed.ReadRightLightLevel": {
                val: "the value of Edison's right light sensor"
            },
            "Ed.ReadLineTracker": {
                val: "the value of Edison's line traker"
            },
            "Ed.ReadCountDown": {
                val: "the value of Edison's countdown timer"
            },
            "Ed.ReadMusicEnd": {
                val: "the state of Edison's tune playback"
            },
            "Ed.ReadDriveLoad": {
                val: "the load state of Edison's motors"
            },
            "Ed.ReadDistance": {
                val: "the distance Edison's {0} motor has travelled",
                formatParamCount: 1
            },
            "Ed.SetDistance": {
                val: "Sets Edison's {0} motor to travel {1} ticks.",
                formatParamCount: 2
            }
        }
    },
    pythonLineHelp = {
        comment: "This is a code comment.",
        import: "Imports the module: {0}",
        operator: "{0} {1} {2}",
        conditional: "If the value of {0} {1} {2} execute the indented code.",
        return: "Returns to the main program with: {0}",
        pass: "Does nothing.",
        userFunction: "Defines the user created function: {0}",
        while: "While the condition is true execute the indented code.",
        loop: "Execute the indented code the number of times it takes to get {0} from range 0 to {1}.",
        break: "Breaks out of the smallest enclosing for or while loop.",
        continue: "Continues with the next iteration of the loop."
    },
    operatorLineHelp = {
        "=": "is set to",
        "+": "plus",
        "-": "minus",
        "*": "multiply",
        "/": "divide",
        "<": "is less than",
        ">": "is greater than",
        "<=": "is less than or equal to",
        ">=": "is greater than or equal to",
        "==": "equals",
        "!=": "not equal"
    },
    operators = ["==", "!=", ">", "<", ">=", "<="],
    generalLineHelp = {
        multiLine: "Only one line can be selected.",
        noHelp: "No help text for this line.",
        syntaxError: "Check this line for syntax errors."
    };

function cast(e, t) {
    try {
        switch (t) {
            case "string":
                return String(e);
            case "number":
                return Number(e);
            case "integer":
                if (/^\d+$/.test(e)) return parseInt(e, 10);
                throw new Error("Invalid input: Input must contain digits only.");
            case "boolean":
                return Boolean(e);
            default:
                return
        }
    } catch (e) {
        return !1
    }
}

function mergeArrayPadWithFirst(e, t) {
    let a = [...e];
    for (let s = 0; s < Math.min(e.length, t.length); s++) a[s] = t[s];
    return a
}

function parseAsEdCode(e) {
    var t = !1;
    return (t = parseAsEdCodeFunction(e)) || (t = parseAsEdCodeConstant(e)) ? {
        found: !0,
        text: t
    } : {
        found: !1,
        text: e
    }
}

function parseAsEdCodeConstant(e) {
    if (edClassLineHelp.constants.hasOwnProperty(e)) return "object" == typeof edClassLineHelp.constants[e].val ? edClassLineHelp.constants[e].val.singular : edClassLineHelp.constants[e].val
}

function parseAsEdCodeFunction(e) {
    var t, a = [],
        s = null,
        n = new RegExp(/Ed\..*?(\(.*?\))/, "ig"),
        r = n.exec(e);
    if (r) {
        if ((a = (n = new RegExp(/\(([^)]+)\)/, "ig")).exec(e)) && a.length > 0 ? (t = r[0].substring(0, r[0].indexOf(r[1])), a = (a = a[1].replace(/\s/g, "")).split(",")) : (t = r[0], a = []), t = t.replace("(", "").replace(")", ""), !edClassLineHelp.functions.hasOwnProperty(t)) return null;
        a = mergeArrayPadWithFirst(["<span class='error'>MISSING ARGUMENT</span>", "<span class='error'>MISSING ARGUMENT</span>", "<span class='error'>MISSING ARGUMENT</span>"], a);
        for (let e = 0; e < a.length; e++) edClassLineHelp.constants.hasOwnProperty(a[e]) ? (edClassLineHelp.constants[a[e]].hasOwnProperty("units") && (s = edClassLineHelp.constants[a[e]].units), a[e] = edClassLineHelp.constants[a[e]].val) : a[e].startsWith("Ed.") && (a[e] = "<span class='error'>INVALID ARGUMENT</span>");
        var o = null;
        if (edClassLineHelp.functions[t].hasOwnProperty("requireNumeric"))
            for (let e = 0; e < edClassLineHelp.functions[t].requireNumeric.length; e++) {
                const s = edClassLineHelp.functions[t].requireNumeric[e];
                a[s] != edClassLineHelp.constants["Ed.DISTANCE_UNLIMITED"].val && (o = parseInt(a[s]), isNaN(o) && (a[s] = "<span class='error'>INVALID ARGUMENT</span>"))
            }
        if (null === s && (null === o || !isNaN(o)) && edClassLineHelp.functions[t].hasOwnProperty("units")) switch (edClassLineHelp.functions[t].units) {
            case unitTypes.distance:
                s = 1 == o ? edClassLineHelp.constants[lineHelpDistanceUnits].val.singular : edClassLineHelp.constants[lineHelpDistanceUnits].val.plural;
                break;
            case unitTypes.time:
                s = 1 == o ? edClassLineHelp.constants["Ed.TIME"].val.singular : edClassLineHelp.constants["Ed.TIME"].val.plural;
                break;
            case unitTypes.tempo:
                s = edClassLineHelp.constants[lineHelpTempoUnits].val
        }
        if (edClassLineHelp.functions[t].hasOwnProperty("formatParamCount")) {
            var i = a.slice(0, edClassLineHelp.functions[t].formatParamCount);
            return edClassLineHelp.functions[t].hasOwnProperty("includeUnits") && edClassLineHelp.functions[t].includeUnits && i.push(s), edClassLineHelp.functions[t].val.formatHelp(i)
        }
        return edClassLineHelp.functions[t].val
    }
    return null
}

function parseAsEdClassOther() {
    return !!EdPyData.edClassLineHelp.variables.hasOwnProperty(this.text) && {
        success: !0,
        text: EdPyData.edClassLineHelp.variables[this.text]
    }
}
"function" != typeof String.prototype.formatHelp && (String.prototype.formatHelp = function(e) {
    return this.replace(/{(\d+)}/g, (function(t, a) {
        return void 0 !== e[a] ? e[a] : t
    }))
}), "function" != typeof Array.prototype.cloneArrayWithSubset && (Array.prototype.cloneArrayWithSubset = function(e) {
    return this.filter(((t, a) => e.includes(a))).map((e => e))
});
const messageGroup = {
        pythonLineHelp: "pythonLineHelp",
        operatorLineHelp: "operatorLineHelp"
    },
    formatType = {
        none: "none",
        input: "input",
        params: "params"
    },
    searchResult = {
        found: "found",
        none: "none",
        error: "error"
    },
    parsers = {
        comment: {
            regExp: /^#/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.none
        },
        import: {
            regExp: /^import.*?\s?#?.*?$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.params,
            params: {
                source: "split",
                splitStr: " ",
                exact: 2,
                indicesToInclude: [1]
            }
        },
        return: {
            regExp: /\s?return.*?\s?#?.*?$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.params,
            params: {
                source: "split",
                splitStr: " ",
                exact: 2,
                indicesToInclude: [1]
            }
        },
        pass: {
            regExp: /\s?pass\s?#?.*?$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.none
        },
        break: {
            regExp: /\s?break\s?#?.*?$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.none,
            words: {
                exact: 1
            }
        },
        continue: {
            regExp: /\s?continue\s?#?.*?$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.none,
            words: {
                exact: 1
            }
        },
        while: {
            regExp: /\s?while.*?:\s?#?.*?$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.none
        },
        loop: {
            regExp: /\s?for\s.*?\sin\srange\(.*?\):\s?#?.*?$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.params,
            params: {
                source: "split",
                splitStr: " ",
                max: 4,
                indicesToInclude: [1, 3],
                extractors: [{
                    paramIndex: 3,
                    keywordCheck: ["range"],
                    regExp: /\(([^)]+)\)/,
                    flag: "",
                    expectedResultCount: 2,
                    indexIn: 1,
                    indexOut: 3,
                    cast: "integer"
                }]
            }
        },
        conditional: {
            regExp: /\s?if(.*?):\s?#?.*?$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.params,
            params: {
                max: 2,
                indicesToInclude: [1, 2, 3],
                extractors: [{
                    paramIndex: 0,
                    regExp: /\s*([^\s]+)\s*(==|!=|>=|<=|>|<)\s*([^\s]+)\s*/,
                    flags: "ig",
                    expectedResultCount: 4,
                    indexIn: 1,
                    indexOut: 1,
                    removeRegex: [/^\(/, /^\)/],
                    cast: "string"
                }, {
                    paramIndex: 0,
                    regExp: /\s*([^\s]+)\s*(==|!=|>=|<=|>|<)\s*([^\s]+)\s*/,
                    flags: "ig",
                    expectedResultCount: 4,
                    indexIn: 2,
                    indexOut: 2,
                    mapOperators: !0,
                    cast: "string"
                }, {
                    paramIndex: 0,
                    regExp: /\s*([^\s]+)\s*(==|!=|>=|<=|>|<)\s*([^\s]+)\s*/,
                    flags: "ig",
                    expectedResultCount: 4,
                    indexIn: 3,
                    indexOut: 3,
                    removeRegex: [/^\(/, /^\)/],
                    cast: "string"
                }]
            }
        },
        assignment: {
            regExp: /\s*([^\s]+)\s*(=)\s*([\s\S]*)/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            messageLookup: "operator",
            formatType: formatType.params,
            params: {
                source: "regExp",
                max: 3,
                indicesToInclude: [0, 1, 2],
                extractors: [{
                    paramIndex: 1,
                    mapOperators: !0,
                    indexOut: 1
                }]
            }
        },
        userFunction: {
            regExp: /\s?def.*?(\s?#?.*?):$/,
            flags: "ig",
            group: messageGroup.pythonLineHelp,
            formatType: formatType.params,
            params: {
                max: 2,
                indicesToInclude: [0]
            }
        },
        EdClassFunction: {},
        EdClassOther: {}
    };

function handleLineHelpEvents(e) {
    if ("object" != typeof e || e.startLine != e.endLine) writeLineHelp(generalLineHelp.multiLine);
    else {
        var t = editor.getSelectionRange();
        t.end.column == t.start.column && (t.start.column = 0, t.end.column = 1e5), 0 == (t = editor.session.getTextRange(t)).trim().length ? writeLineHelp() : doLineHelp(t)
    }
}

function setUnits(e) {
    if (!((new Date).getTime() - unitsLastChecked < unitCheckInterval)) {
        var t = null,
            a = "",
            s = e;
        s = (s = s.replace(/#.*?\n/gi, "")).replace(/\s/g, "");
        for (var n = new RegExp(/Ed.DistanceUnits=Ed.CM|Ed.DistanceUnits=Ed.INCH|Ed.DistanceUnits=Ed.TIME/, "ig"); null !== (t = n.exec(s));) a = t[0].split("=")[1], edClassLineHelp.constants.hasOwnProperty(a) && (lineHelpDistanceUnits = a);
        lineHelpDistanceUnits || (lineHelpDistanceUnits = "Ed.CM");
        for (var r = new RegExp(/Ed.Tempo=Ed.TEMPO_VERY_SLOW|Ed.Tempo=Ed.TEMPO_SLOW|Ed.Tempo=Ed.TEMPO_MEDIUM|Ed.Tempo=Ed.TEMPO_FAST|Ed.Tempo=Ed.TEMPO_VERY_FAST/, "ig"); null !== (t = r.exec(s));) a = t[0].split("=")[1], edClassLineHelp.constants.hasOwnProperty(a) && (lineHelpTempoUnits = a);
        lineHelpTempoUnits || (lineHelpTempoUnits = "Ed.TEMPO_MEDIUM"), unitsLastChecked = (new Date).getTime()
    }
}

function doLineHelp(e) {
    setUnits(editor.getValue());
    var t = e.trim().replace(/\s\s+/g, " "),
        a = e.trim().replace(/\s\s+/g, " ");
    let s = a.match(/\(.*?\)/gi);
    if (s)
        for (let e = 0; e < s.length; e++) s[e], a = a.replace(s[e], s[e].trim().replace(/ /g, ""));
    var n = searchResult.none,
        r = null;
    e: for (var o in parsers) {
        var i = parsers[o];
        if (i.hasOwnProperty("regExp")) {
            if ((r = new RegExp(i.regExp, i.flags).exec(a)) && (r[0] = r[0].replace(/#.*?$/, ""), r[0] = r[0].replace(/:$/, ""), i.group === messageGroup.pythonLineHelp))
                if (i.formatType == formatType.none) {
                    var l = t.split(" ");
                    i.hasOwnProperty("words") && (i.words.hasOwnProperty("exact") && i.words.exact != l.length || i.words.hasOwnProperty("max") && i.words.max < l.length || i.words.hasOwnProperty("min") && i.words.min > l.length) ? n = searchResult.error : (a = pythonLineHelp[o], n = searchResult.found)
                } else if (i.formatType == formatType.input) a = pythonLineHelp[o].formatHelp(t);
            else if (i.formatType == formatType.params) {
                if ("split" == i.params.source ? l = r[0].split(i.params.splitStr) : ((l = [...r.slice(1)])[l.length - 1] = l[l.length - 1].replace(/#.*?$/, ""), l[l.length - 1] = l[l.length - 1].replace(/:$/, "")), i.params.hasOwnProperty("exact") && i.params.exact != l.length || i.params.hasOwnProperty("max") && i.params.max < l.length || i.params.hasOwnProperty("min") && i.params.min > l.length) n = searchResult.error;
                else if (i.params.hasOwnProperty("extractors")) {
                    var d = [].concat(l);
                    for (let e = 0; e < i.params.extractors.length; e++) {
                        const t = i.params.extractors[e];
                        var E = !0;
                        if (t.hasOwnProperty("keywordCheck"))
                            for (let e = 0; e < t.keywordCheck.length; e++)
                                if (-1 == d[t.paramIndex].indexOf(t.keywordCheck[e])) {
                                    n = searchResult.error, E = !1;
                                    break
                                }
                        if (E) {
                            if (t.hasOwnProperty("regExp")) {
                                var p = new RegExp(t.regExp, t.flags).exec(d[t.paramIndex]);
                                p ? p.length != t.expectedResultCount ? n = searchResult.error : (l[t.indexOut] = p[t.indexIn], t.hasOwnProperty("cast") && (l[t.indexOut] = cast(l[t.indexOut], t.cast), !1 === l[t.indexOut] && (n = searchResult.error)), null == l[t.indexOut] && (n = searchResult.error)) : n = searchResult.error
                            } else l[t.indexOut] = d[t.paramIndex];
                            if (n != searchResult.error && t.hasOwnProperty("removeRegex") && t.removeRegex.length > 0)
                                for (let e = 0; e < t.removeRegex.length; e++) {
                                    if (l.hasOwnProperty(t.indexOut)) var u = t.removeRegex[e];
                                    u = new RegExp(u), l[t.indexOut] = l[t.indexOut].replace(u, "")
                                }
                            n != searchResult.error && t.hasOwnProperty("mapOperators") && t.mapOperators && (operatorLineHelp.hasOwnProperty(l[t.indexOut]) ? l[t.indexOut] = operatorLineHelp[l[t.indexOut]] : n = searchResult.error)
                        }
                    }
                }
                if (n != searchResult.error)
                    for (let e = 0; e < l.length; e++) {
                        (m = parseAsEdCode(l[e])).found && (l[e] = m.text)
                    }
                if (n != searchResult.error) {
                    var c = i.hasOwnProperty("messageLookup") ? i.messageLookup : o;
                    a = pythonLineHelp[c].formatHelp(l.cloneArrayWithSubset(i.params.indicesToInclude)), n = searchResult.found
                }
            }
            if (n != searchResult.none) break e
        }
    }
    if (n == searchResult.found) writeLineHelp(a);
    else if (n == searchResult.none) {
        var m;
        (m = parseAsEdCode(a)).found ? writeLineHelp(m.text) : writeLineHelp(generalLineHelp.noHelp)
    } else n == searchResult.error && writeLineHelp(generalLineHelp.syntaxError, !0)
}

function writeLineHelp(e, t) {
    void 0 === e && (e = ""), "" !== e && "." !== e.substr(e.length - 1) && (e += "."), (t = "undefined" != t && t) ? $(spanLineHelp).addClass("error") : $(spanLineHelp).removeClass("error"), $(spanLineHelp).html(e)
}
editor.session.selection.on("changeCursor", (function(e) {
    handleLineHelpEvents(e)
})), editor.session.selection.on("change", (function(e) {
    handleLineHelpEvents(e)
})), editor.session.selection.on("changeSelection", (function(e) {
    handleLineHelpEvents(e)
}));