const jsonClasses = [

    {
        "name": "ResetDistance",
        "description": "Resets the number of ticks remaining on both the left and right distance registers to zero.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "Exit",
        "description": "Causes a program to exit/end.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "Random",
        "parameters": "${1:start}, ${2:stop}",
        "parametersDisplay": "start, stop",
        "description": "Generates a random number between the 'start' and 'stop' values.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadUSB",
        "description": "Reads USB data received from a PC into Edison.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "WriteUSB",
        "description": "Writes USB data from Edison to a PC.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "List",
        "parameters": "${1:size}",
        "parametersDisplay": "size",
        "description": "Create a list of Edison variables.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "List",
        "parameters": "${1:size}, ${2:initialList}",
        "parametersDisplay": "size, initialList",
        "description": "Create a list of Edison variables and prefill it with values.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "TuneString",
        "parameters": "${1:size}",
        "parametersDisplay": "size",
        "description": "Create a variable tune string which can be modified while Edison is running.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "TuneString",
        "parameters": "${1:size}, ${2:initialTune}",
        "parametersDisplay": "size, initialTune",
        "description": "Create a variable tune string which can be modified while Edison is running and prefill it with a string.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "LeftLed",
        "parameters": "${1:state}",
        "parametersDisplay": "",
        "description": "Turn left LED on or off. Use the parameters Ed.ON or Ed.OFF.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "RightLed",
        "parameters": "${1:state}",
        "parametersDisplay": "",
        "description": "Turn right LED on or off. Use the parameters Ed.ON or Ed.OFF.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ObstacleDetectionBeam",
        "parameters": "${1:state}",
        "parametersDisplay": "state",
        "description": "Activate or deactivate obstacle detection. Use the parameters Ed.ON or Ed.OFF.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "LineTrackerLed",
        "parameters": "${1:state}",
        "parametersDisplay": "state",
        "description": "Line tracker LED on or off. Use the parameters Ed.ON or Ed.OFF. This is required to be on for accurate line tracking.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "SendIRData",
        "parameters": "${1:byte}",
        "parametersDisplay": "byte",
        "description": "Send one byte of data to all nearby Edison robots via infrared.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "StartCountDown",
        "parameters": "${1:time}, ${2:units}",
        "parametersDisplay": "time, units",
        "description": "Activate the countdown timer to count down from a set time. Can be set to count in seconds or milliseconds. This type of timer is not a delay! For a delay use Ed.TimeWait().",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "TimeWait",
        "parameters": "${1:time}, ${2:units}",
        "parametersDisplay": "time, units",
        "description": "Stop the program from continuing and wait for an amount of time to pass. Can be set to wait for seconds or milliseconds.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "RegisterEventHandler",
        "parameters": "${1:event}, ${2:function}",
        "parametersDisplay": "event, function",
        "description": "Registers a function to be called when an event occurs, when handling the event the main program is interrupted.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "PlayBeep",
        "description": "Sound a single beep, frequency: 3.5kHz, duration: 50mS (0.05 Seconds).",
        "isFunc": true
    },

    {
        "name": "PlayMyBeep",
        "parameters": "${1:frequency}",
        "parametersDisplay": "frequency",
        "description": "Sounds a single beep at a frequency in Hz, Duration: 50mS (0.05 Seconds).",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "PlayTone",
        "parameters": "${1:note}, ${2:duration}",
        "parametersDisplay": "note, duration",
        "description": "Play a single musical note through the speaker.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "PlayTune",
        "parameters": "${1:tune}",
        "parametersDisplay": "tune",
        "description": "Play a series of musical notes through the speaker.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "Drive",
        "parameters": "${1:direction}, ${2:speed}, ${3:distance}",
        "parametersDisplay": "direction, speed, distance",
        "description": "Drive left and right motors - control speed, direction and duration.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "DriveLeftMotor",
        "parameters": "${1:direction}, ${2:speed}, ${3:distance}",
        "parametersDisplay": "direction, speed, distance",
        "description": "Drive the left motor - control speed, direction and duration.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "DriveRightMotor",
        "parameters": "${1:direction}, ${2:speed}, ${3:distance}",
        "parametersDisplay": "direction, speed, distance",
        "description": "Drive the right motor - control speed, direction and duration.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadObstacleDetection",
        "description": "Read the state of the obstacle detector and clear it.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadKeypad",
        "description": "Read the state of the keypad.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadClapSensor",
        "description": "Read the state of the clap detector and clear it.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadLineState",
        "description": "Read the current state of the line tracker.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadRemote",
        "description": "Read the last received remote control command.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadIRData",
        "description": "Read the last received byte of infrared data.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadLeftLightLevel",
        "description": "Read the current light level at the left light sensor.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadRightLightLevel",
        "description": "Read the current light level at the right light sensor.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadLineTracker",
        "description": "Read the current light level at the line tracker light sensor.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadCountDown",
        "description": "Read the current value of the countdown timer.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadMusicEnd",
        "description": "Read the play status of music.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadDriveLoad",
        "description": "Read the state of the load or strain on the motors.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "ReadDistance",
        "parameters": "${1:side}",
        "parametersDisplay": "side",
        "description": "Reads the specified tick counter and converts to inch or cm before returning.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "SetDistance",
        "parameters": "${1:side}, ${2:ticks}",
        "parametersDisplay": "side, ticks",
        "description": "Sets a number of ticks into a motor's distance counter.",
        "isFunc": true,
        "hasDoc": true
    },

    {
        "name": "DistanceUnits",
        "description": "System variable that sets the unit of duration for the drive functions.",
        "hasDoc": true
    },

    {
        "name": "Tempo",
        "description": "System variable that sets the music's tempo.",
        "hasDoc": true
    },

    {
        "name": "EdisonVersion",
        "description": "System variable that sets the current version of Edison the code will compile for.",
        "hasDoc": true
    },

    {
        "name": "ON",
        "description": "System constant used to turn on functions.",
        "hasDoc": true
    },

    {
        "name": "OFF",
        "description": "System constant used to turn off functions.",
        "hasDoc": true
    },

    {
        "name": "NOTE_A_6",
        "description": "Note A in the 6th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_B_SHARP_6",
        "description": "Note B sharp in the 6th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_B_6",
        "description": "Note B in the 6th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_C_7",
        "description": "Note C in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_D_SHARP_7",
        "description": "Note D sharp in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_D_7",
        "description": "Note D in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_E_SHARP_7",
        "description": "Note E sharp in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_E_7",
        "description": "Note E in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_F_7",
        "description": "Note F in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_G_SHARP_7",
        "description": "Note G sharp in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_G_7",
        "description": "Note G in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_A_SHARP_7",
        "description": "Note A sharp in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_A_7",
        "description": "Note A in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_B_SHARP_7",
        "description": "Note B sharp in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_B_7",
        "description": "Note B in the 7th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_C_8",
        "description": "Note C in the 8th octave - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_REST",
        "description": "Musical rest, adds a break in music - used as a note parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_SIXTEENTH",
        "description": "System constant that sets the shortest duration for a musical note, also known as a semiquaver - used as a duration parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_EIGHTH",
        "description": "System constant that sets a short duration for a musical note, also known as a quaver - used as a duration parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_QUARTER",
        "description": "System constant that sets a normal duration for a musical note, also known as a crotchet - used as a duration parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_HALF",
        "description": "System constant that sets a long duration for a musical note, also known as a minim - used as a duration parameter for Ed.PlayTone()."
    },

    {
        "name": "NOTE_WHOLE",
        "description": "System constant that sets the longest duration for a musical note, also known as a semibreve - used as a duration parameter for Ed.PlayTone()."
    },

    {
        "name": "TEMPO_VERY_SLOW",
        "description": "System constant used to play music at a very slow tempo – used to set Ed.Tempo."
    },

    {
        "name": "TEMPO_SLOW",
        "description": "System constant used to play music at a slow tempo – used to set Ed.Tempo."
    },

    {
        "name": "TEMPO_MEDIUM",
        "description": "System constant used to play music at a medium tempo – used to set Ed.Tempo."
    },

    {
        "name": "TEMPO_FAST",
        "description": "System constant used to play music at a fast tempo – used to set Ed.Tempo."
    },

    {
        "name": "TEMPO_VERY_FAST",
        "description": "System constant used to play music at a very fast tempo – used to set Ed.Tempo."
    },

    {
        "name": "FORWARD",
        "description": "System constant used make one or both motors drive forward – used as a direction parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "BACKWARD",
        "description": "System constant used make one or both motors drive backwards – used as a direction parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "FORWARD_RIGHT",
        "description": "System constant used make Edison turn right – used as a direction parameter for Ed.Drive()."
    },

    {
        "name": "BACKWARD_RIGHT",
        "description": "System constant used make Edison turn right backwards – used as a direction parameter for Ed.Drive()."
    },

    {
        "name": "FORWARD_LEFT",
        "description": "System constant used make Edison turn left – used as a direction parameter for Ed.Drive()."
    },

    {
        "name": "BACKWARD_LEFT",
        "description": "System constant used make Edison turn left backwards – used as a direction parameter for Ed.Drive()."
    },

    {
        "name": "SPIN_RIGHT",
        "description": "System constant used make Edison spin right – used as a direction parameter for Ed.Drive()."
    },

    {
        "name": "SPIN_LEFT",
        "description": "System constant used make Edison spin left – used as a direction parameter for Ed.Drive()."
    },

    {
        "name": "STOP",
        "description": "System constant used make Edison stop – used as a direction parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_1",
        "description": "System constant used to set motor speed at speed 1 (slowest speed) – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_2",
        "description": "System constant used to set motor speed at speed 2 – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_3",
        "description": "System constant used to set motor speed at speed 3 – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_4",
        "description": "System constant used to set motor speed at speed 4 – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_5",
        "description": "System constant used to set motor speed at speed 5 – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_6",
        "description": "System constant used to set motor speed at speed 6 – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_7",
        "description": "System constant used to set motor speed at speed 7 – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_8",
        "description": "System constant used to set motor speed at speed 8 – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_9",
        "description": "System constant used to set motor speed at speed 9 – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_10",
        "description": "System constant used to set motor speed at speed 10 (fastest speed) – used as a speed parameter for Ed.Drive(), Ed.DriveLeftMotor(), and Ed.DriveRightMotor()."
    },

    {
        "name": "SPEED_FULL",
        "description": "System constant to set motors to full speed, does not use encoder to keep Edison driving straight."
    },

    {
        "name": "DISTANCE_UNLIMITED",
        "description": "System constant that sets Edison to just start driving, with no set duration."
    },

    {
        "name": "MOTOR_LEFT",
        "description": "System constant used to make Ed.ReadDistance() read the distance travelled by the left motor."
    },

    {
        "name": "MOTOR_RIGHT",
        "description": "System constant used to make Ed.ReadDistance() read the distance travelled by the right motor."
    },

    {
        "name": "TIME_SECONDS",
        "description": "System constant used to make Ed.TimeWait() and Ed.StartCountDown() wait or count in seconds."
    },

    {
        "name": "TIME_MILLISECONDS",
        "description": "System constant used to make Ed.TimeWait() and Ed.StartCountDown() wait or count in milliseconds."
    },

    {
        "name": "OBSTACLE_NONE",
        "description": "System constant returned by Ed.ReadObstacleDetection() when no obstacle is detected."
    },

    {
        "name": "OBSTACLE_RIGHT",
        "description": "System constant returned by Ed.ReadObstacleDetection() when obstacle is detected on the right."
    },

    {
        "name": "OBSTACLE_LEFT",
        "description": "System constant returned by Ed.ReadObstacleDetection() when obstacle is detected on the left."
    },

    {
        "name": "OBSTACLE_AHEAD",
        "description": "System constant returned by Ed.ReadObstacleDetection() when obstacle is detected straight ahead."
    },

    {
        "name": "LINE_ON_BLACK",
        "description": "System constant returned by Ed.ReadLineState() when the line tracker detects black."
    },

    {
        "name": "LINE_ON_WHITE",
        "description": "System constant returned by Ed.ReadLineState() when the line tracker detects white."
    },

    {
        "name": "KEYPAD_NONE",
        "description": "System constant returned by Ed.ReadKeypad() when no buttons have been pressed."
    },

    {
        "name": "KEYPAD_TRIANGLE",
        "description": "System constant returned by Ed.ReadKeypad() when the triangle button has been pressed."
    },

    {
        "name": "KEYPAD_ROUND",
        "description": "System constant returned by Ed.ReadKeypad() when the round button has been pressed."
    },

    {
        "name": "CLAP_NOT_DETECTED",
        "description": "System constant returned by Ed.ReadClapSensor() when no clap has been detected."
    },

    {
        "name": "CLAP_DETECTED",
        "description": "System constant returned by Ed.ReadClapSensor() when a clap has been detected."
    },

    {
        "name": "DRIVE_STRAINED",
        "description": "System constant returned by Ed.ReadDriveLoad() when the motors are strained."
    },

    {
        "name": "DRIVE_NO_STRAIN",
        "description": "System constant returned by Ed.ReadDriveLoad() when the motors are not strained."
    },

    {
        "name": "MUSIC_FINISHED",
        "description": "System constant returned by Ed.ReadMusicEnd() when playing a beep, note or tune has finished."
    },

    {
        "name": "MUSIC_NOT_FINISHED",
        "description": "System constant returned by Ed.ReadMusicEnd() when currently playing a beep, note or tune."
    },

    {
        "name": "REMOTE_CODE_0",
        "description": "System constant returned by Ed.ReadRemote() when remote control code 0 has been received."
    },

    {
        "name": "REMOTE_CODE_1",
        "description": "System constant returned by Ed.ReadRemote() when remote control code 1 has been received."
    },

    {
        "name": "REMOTE_CODE_2",
        "description": "System constant returned by Ed.ReadRemote() when remote control code 2 has been received."
    },

    {
        "name": "REMOTE_CODE_3",
        "description": "System constant returned by Ed.ReadRemote() when remote control code 3 has been received."
    },

    {
        "name": "REMOTE_CODE_4",
        "description": "System constant returned by Ed.ReadRemote() when remote control code 4 has been received."
    },

    {
        "name": "REMOTE_CODE_5",
        "description": "System constant returned by Ed.ReadRemote() when remote control code 5 has been received."
    },

    {
        "name": "REMOTE_CODE_6",
        "description": "System constant returned by Ed.ReadRemote() when remote control code 6 has been received."
    },

    {
        "name": "REMOTE_CODE_7",
        "description": "System constant returned by Ed.ReadRemote() when remote control code 7 has been received."
    },

    {
        "name": "EVENT_TIMER_FINISHED",
        "description": "System constant used with Ed.RegisterEventHandler() to call a function when the countdown timer reaches zero."
    },

    {
        "name": "EVENT_REMOTE_CODE",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the remote control code received event."
    },

    {
        "name": "EVENT_IR_DATA",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the infrared data received event."
    },

    {
        "name": "EVENT_CLAP_DETECTED",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the clap detected event."
    },

    {
        "name": "EVENT_OBSTACLE_ANY",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the any object detected event."
    },

    {
        "name": "EVENT_OBSTACLE_LEFT",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the object detected on left event."
    },

    {
        "name": "EVENT_OBSTACLE_RIGHT",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the object detected on right event."
    },

    {
        "name": "EVENT_OBSTACLE_AHEAD",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the object detected ahead event."
    },

    {
        "name": "EVENT_DRIVE_STRAIN",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the drive strain detected event."
    },

    {
        "name": "EVENT_KEYPAD_TRIANGLE",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the triangle button pressed event."
    },

    {
        "name": "EVENT_KEYPAD_ROUND",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the round button pressed event."
    },

    {
        "name": "EVENT_LINE_TRACKER_ON_WHITE",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the line tracker over a white surface event."
    },

    {
        "name": "EVENT_LINE_TRACKER_ON_BLACK",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the line tracker over a black surface event."
    },

    {
        "name": "EVENT_LINE_TRACKER_SURFACE_CHANGE",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the line tracker surface change event."
    },

    {
        "name": "EVENT_TUNE_FINISHED",
        "description": "Event identifier used by Ed.RegisterEventHandler() to link a function with the tune finished event."
    },

    {
        "name": "CM",
        "description": "System constant used to set duration values to metric (cm)."
    },

    {
        "name": "INCH",
        "description": "System constant used to set duration values to imperial (inch)."
    },

    {
        "name": "TIME",
        "description": "System constant used to set duration values to time (seconds)."
    },

    {
        "name": "REMOTE_CODE_EDREMOTE_RELEASE",
        "description": "..."
    },

    {
        "name": "V1",
        "description": "System constant used to set the compiler for Edison V1.0."
    },

    {
        "name": "V2",
        "description": "System constant used to set the compiler for Edison V2.0."
    },

    {
        "name": "V3",
        "description": "System constant used to set the compiler for Edison V3.0."
    }

]