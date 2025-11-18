define("ace/mode/edpy_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], (function(e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text_highlight_rules").TextHighlightRules,
        s = function() {
            var e = this.createKeywordMapper({
                    "invalid.deprecated": "debugger",
                    "support.function": "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|bin|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|apply|delattr|help|next|setattr|set|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|ascii|breakpoint|bytes",
                    "constant.language": "True|False|None|NotImplemented|Ellipsis|__debug__",
                    keyword: "def|class|import|pass|global|return|for|while|if|elif|else|break|continue|and|or|not",
                    edpy_class: "Ed",
                    edpy_class_member: "Exit|Random|WriteUSB|ReadUSB|List|TuneString|LeftLed|RightLed|ObstacleDetectionBeam|LineTrackerLed|SendIRData|StartCountDown|TimeWait|RegisterEventHandler|PlayBeep|PlayMyBeep|PlayTone|PlayTune|Drive|DriveLeft|DriveRight|ReadObstacleDetection|ReadKeypad|ReadClapSensor|ReadLineState|ReadRemote|ReadIRData|ReadLeftLightLevel|ReadRightLightLevel|ReadLineTracker|ReadCountDown|ReadMusicEnd|ReadDriveLoad|ReadDistance|SetDistance|DistanceUnits|Tempo|EdisonVersion|ON|OFF|NOTE_A_6|NOTE_B_6|NOTE_C_7|NOTE_D_SHARP_7|NOTE_D_7|NOTE_E_SHARP_7|NOTE_E_7|NOTE_F_7|NOTE_G_SHARP_7|NOTE_G_7|NOTE_A_SHARP_7|NOTE_A_7|NOTE_B_SHARP_7|NOTE_B_7|NOTE_C_8|NOTE_REST|NOTE_SIXTEENTH|NOTE_EIGHTH|NOTE_QUARTER|NOTE_HALF|NOTE_WHOLE|TEMPO_VERY_SLOW|TEMPO_SLOW|TEMPO_MEDIUM|TEMPO_FAST|TEMPO_VERY_FAST|FORWARD|BACKWARD|FORWARD_RIGHT|BACKWARD_RIGHT|FORWARD_LEFT|BACKWARD_LEFT|SPIN_RIGHT|SPIN_LEFT|STOP|SPEED_1|SPEED_2|SPEED_3|SPEED_4|SPEED_5|SPEED_6|SPEED_7|SPEED_8|SPEED_9|SPEED_10|SPEED_FULL|DISTANCE_UNLIMITED|MOTOR_LEFT|MOTOR_RIGHT|TIME_SECONDS|TIME_MILLISECONDS|OBSTACLE_NONE|OBSTACLE_RIGHT|OBSTACLE_LEFT|OBSTACLE_AHEAD|LINE_ON_BLACK|LINE_ON_WHITE|KEYPAD_NONE|KEYPAD_TRIANGLE|KEYPAD_ROUND|CLAP_NOT_DETECTED|CLAP_DETECTED|DRIVE_STRAINED|DRIVE_NO_STRAIN|MUSIC_FINISHED|MUSIC_NOT_FINISHED|REMOTE_CODE_0|REMOTE_CODE_1|REMOTE_CODE_2|REMOTE_CODE_3|REMOTE_CODE_4|REMOTE_CODE_5|REMOTE_CODE_6|REMOTE_CODE_7|EVENT_TIMER_FINISHED|EVENT_REMOTE_CODE|EVENT_IR_DATA|EVENT_CLAP_DETECTED|EVENT_OBSTACLE_ANY|EVENT_OBSTACLE_LEFT|EVENT_OBSTACLE_RIGHT|EVENT_OBSTACLE_AHEAD|EVENT_DRIVE_STRAIN|EVENT_KEYPAD_TRIANGLE|EVENT_KEYPAD_ROUND|EVENT_LINE_TRACKER_ON_WHITE|EVENT_LINE_TRACKER_ON_BLACK|EVENT_LINE_TRACKER_SURFACE_CHANGE|EVENT_TUNE_FINISHED|CM|INCH|TIME|V1|V2|V3"
                }, "identifier"),
                t = "[uU]?",
                n = "[rR]",
                r = "[fF]",
                i = "(?:[rR][fF]|[fF][rR])",
                s = "(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[oO]?[0-7]+)|(?:0[xX][\\dA-Fa-f]+)|(?:0[bB][01]+))",
                o = "(?:\\d+)",
                a = "(?:(?:" + o + "?(?:\\.\\d+))|(?:" + o + "\\.))",
                g = "(?:" + ("(?:(?:" + a + "|" + o + ")(?:[eE][+-]?\\d+))") + "|" + a + ")",
                E = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";
            this.$rules = {
                start: [{
                    token: "comment",
                    regex: "#.*$"
                }, {
                    token: "string",
                    regex: t + '"{3}',
                    next: "qqstring3"
                }, {
                    token: "string",
                    regex: t + '"(?=.)',
                    next: "qqstring"
                }, {
                    token: "string",
                    regex: t + "'{3}",
                    next: "qstring3"
                }, {
                    token: "string",
                    regex: t + "'(?=.)",
                    next: "qstring"
                }, {
                    token: "string",
                    regex: n + '"{3}',
                    next: "rawqqstring3"
                }, {
                    token: "string",
                    regex: n + '"(?=.)',
                    next: "rawqqstring"
                }, {
                    token: "string",
                    regex: n + "'{3}",
                    next: "rawqstring3"
                }, {
                    token: "string",
                    regex: n + "'(?=.)",
                    next: "rawqstring"
                }, {
                    token: "string",
                    regex: r + '"{3}',
                    next: "fqqstring3"
                }, {
                    token: "string",
                    regex: r + '"(?=.)',
                    next: "fqqstring"
                }, {
                    token: "string",
                    regex: r + "'{3}",
                    next: "fqstring3"
                }, {
                    token: "string",
                    regex: r + "'(?=.)",
                    next: "fqstring"
                }, {
                    token: "string",
                    regex: i + '"{3}',
                    next: "rfqqstring3"
                }, {
                    token: "string",
                    regex: i + '"(?=.)',
                    next: "rfqqstring"
                }, {
                    token: "string",
                    regex: i + "'{3}",
                    next: "rfqstring3"
                }, {
                    token: "string",
                    regex: i + "'(?=.)",
                    next: "rfqstring"
                }, {
                    token: "keyword.operator",
                    regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
                }, {
                    token: "punctuation",
                    regex: ",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*="
                }, {
                    token: "paren.lparen",
                    regex: "[\\[\\(\\{]"
                }, {
                    token: "paren.rparen",
                    regex: "[\\]\\)\\}]"
                }, {
                    token: ["keyword", "text", "entity.name.function"],
                    regex: "(def|class)(\\s+)([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w]+)"
                }, {
                    token: "text",
                    regex: "\\s+"
                }, {
                    include: "constants"
                }],
                qqstring3: [{
                    token: "constant.language.escape",
                    regex: E
                }, {
                    token: "string",
                    regex: '"{3}',
                    next: "start"
                }, {
                    defaultToken: "string"
                }],
                qstring3: [{
                    token: "constant.language.escape",
                    regex: E
                }, {
                    token: "string",
                    regex: "'{3}",
                    next: "start"
                }, {
                    defaultToken: "string"
                }],
                qqstring: [{
                    token: "constant.language.escape",
                    regex: E
                }, {
                    token: "string",
                    regex: "\\\\$",
                    next: "qqstring"
                }, {
                    token: "string",
                    regex: '"|$',
                    next: "start"
                }, {
                    defaultToken: "string"
                }],
                qstring: [{
                    token: "constant.language.escape",
                    regex: E
                }, {
                    token: "string",
                    regex: "\\\\$",
                    next: "qstring"
                }, {
                    token: "string",
                    regex: "'|$",
                    next: "start"
                }, {
                    defaultToken: "string"
                }],
                rawqqstring3: [{
                    token: "string",
                    regex: '"{3}',
                    next: "start"
                }, {
                    defaultToken: "string"
                }],
                rawqstring3: [{
                    token: "string",
                    regex: "'{3}",
                    next: "start"
                }, {
                    defaultToken: "string"
                }],
                rawqqstring: [{
                    token: "string",
                    regex: "\\\\$",
                    next: "rawqqstring"
                }, {
                    token: "string",
                    regex: '"|$',
                    next: "start"
                }, {
                    defaultToken: "string"
                }],
                rawqstring: [{
                    token: "string",
                    regex: "\\\\$",
                    next: "rawqstring"
                }, {
                    token: "string",
                    regex: "'|$",
                    next: "start"
                }, {
                    defaultToken: "string"
                }],
                fqqstring3: [{
                    token: "constant.language.escape",
                    regex: E
                }, {
                    token: "string",
                    regex: '"{3}',
                    next: "start"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }, {
                    defaultToken: "string"
                }],
                fqstring3: [{
                    token: "constant.language.escape",
                    regex: E
                }, {
                    token: "string",
                    regex: "'{3}",
                    next: "start"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }, {
                    defaultToken: "string"
                }],
                fqqstring: [{
                    token: "constant.language.escape",
                    regex: E
                }, {
                    token: "string",
                    regex: "\\\\$",
                    next: "fqqstring"
                }, {
                    token: "string",
                    regex: '"|$',
                    next: "start"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }, {
                    defaultToken: "string"
                }],
                fqstring: [{
                    token: "constant.language.escape",
                    regex: E
                }, {
                    token: "string",
                    regex: "'|$",
                    next: "start"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }, {
                    defaultToken: "string"
                }],
                rfqqstring3: [{
                    token: "string",
                    regex: '"{3}',
                    next: "start"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }, {
                    defaultToken: "string"
                }],
                rfqstring3: [{
                    token: "string",
                    regex: "'{3}",
                    next: "start"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }, {
                    defaultToken: "string"
                }],
                rfqqstring: [{
                    token: "string",
                    regex: "\\\\$",
                    next: "rfqqstring"
                }, {
                    token: "string",
                    regex: '"|$',
                    next: "start"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }, {
                    defaultToken: "string"
                }],
                rfqstring: [{
                    token: "string",
                    regex: "'|$",
                    next: "start"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }, {
                    defaultToken: "string"
                }],
                fqstringParRules: [{
                    token: "paren.lparen",
                    regex: "[\\[\\(]"
                }, {
                    token: "paren.rparen",
                    regex: "[\\]\\)]"
                }, {
                    token: "string",
                    regex: "\\s+"
                }, {
                    token: "string",
                    regex: "'[^']*'"
                }, {
                    token: "string",
                    regex: '"[^"]*"'
                }, {
                    token: "function.support",
                    regex: "(!s|!r|!a)"
                }, {
                    include: "constants"
                }, {
                    token: "paren.rparen",
                    regex: "}",
                    next: "pop"
                }, {
                    token: "paren.lparen",
                    regex: "{",
                    push: "fqstringParRules"
                }],
                constants: [{
                    token: "constant.numeric",
                    regex: "(?:" + g + "|\\d+)[jJ]\\b"
                }, {
                    token: "constant.numeric",
                    regex: g
                }, {
                    token: "constant.numeric",
                    regex: s + "[lL]\\b"
                }, {
                    token: "constant.numeric",
                    regex: s + "\\b"
                }, {
                    token: ["punctuation", "function.support"],
                    regex: "(\\.)([a-zA-Z_]+)\\b"
                }, {
                    token: e,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }]
            }, this.normalizeRules()
        };
    r.inherits(s, i), t.PythonHighlightRules = s
})), define("ace/mode/folding/pythonic", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], (function(e, t, n) {
    "use strict";
    var r = e("../../lib/oop"),
        i = e("./fold_mode").FoldMode,
        s = t.FoldMode = function(e) {
            this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + e + ")(?:\\s*)(?:#.*)?$")
        };
    r.inherits(s, i),
        function() {
            this.getFoldWidgetRange = function(e, t, n) {
                var r = e.getLine(n).match(this.foldingStartMarker);
                if (r) return r[1] ? this.openingBracketBlock(e, r[1], n, r.index) : r[2] ? this.indentationBlock(e, n, r.index + r[2].length) : this.indentationBlock(e, n)
            }
        }.call(s.prototype)
})), define("ace/mode/edpy", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/edpy_highlight_rules", "ace/mode/folding/pythonic", "ace/range"], (function(e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./edpy_highlight_rules").PythonHighlightRules,
        o = e("./folding/pythonic").FoldMode,
        a = e("../range").Range,
        g = function() {
            this.HighlightRules = s, this.foldingRules = new o("\\:"), this.$behaviour = this.$defaultBehaviour
        };
    r.inherits(g, i),
        function() {
            this.lineCommentStart = "#", this.$pairQuotesAfter = {
                "'": /[ruf]/i,
                '"': /[ruf]/i
            }, this.getNextLineIndent = function(e, t, n) {
                var r = this.$getIndent(t),
                    i = this.getTokenizer().getLineTokens(t, e).tokens;
                if (i.length && "comment" == i[i.length - 1].type) return r;
                "start" == e && (t.match(/^.*[\{\(\[:]\s*$/) && (r += n));
                return r
            };
            var e = {
                pass: 1,
                return: 1,
                raise: 1,
                break: 1,
                continue: 1
            };
            this.checkOutdent = function(t, n, r) {
                if ("\r\n" !== r && "\r" !== r && "\n" !== r) return !1;
                var i = this.getTokenizer().getLineTokens(n.trim(), t).tokens;
                if (!i) return !1;
                do {
                    var s = i.pop()
                } while (s && ("comment" == s.type || "text" == s.type && s.value.match(/^\s+$/)));
                return !!s && ("keyword" == s.type && e[s.value])
            }, this.autoOutdent = function(e, t, n) {
                n += 1;
                var r = this.$getIndent(t.getLine(n)),
                    i = t.getTabString();
                r.slice(-i.length) == i && t.remove(new a(n, r.length - i.length, n, r.length))
            }, this.$id = "ace/mode/edpy", this.snippetFileId = "ace/snippets/edpy"
        }.call(g.prototype), t.Mode = g
})), window.require(["ace/mode/edpy"], (function(e) {
    "object" == typeof module && "object" == typeof exports && module && (module.exports = e)
}));