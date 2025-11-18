const jsonDemos = [{
        "id": "001",
        "title": "Untitled",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V1\nEd.DistanceUnits = Ed.CM\n\n#--------Your code below-----------\n\n",
        "version": "1"
    },
    {
        "id": "002",
        "title": "Untitled",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V2\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\n",
        "version": "2"
    },
    {
        "id": "003",
        "title": "Untitled",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V3\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\n",
        "version": "3"
    },
    {
        "id": "004",
        "title": "Test Demo One V2",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V2\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\nEd.LineTrackerLed(Ed.ON)\n\nwhile True:\n  if Ed.ReadLineState()==Ed.LINE_ON_WHITE:\n    Ed.Drive(Ed.FORWARD_RIGHT, Ed.SPEED_1, Ed.DISTANCE_UNLIMITED)\n  else:\n    Ed.Drive(Ed.FORWARD_LEFT, Ed.SPEED_1, Ed.DISTANCE_UNLIMITED)\n\n",
        "version": "2"
    },
    {
        "id": "005",
        "title": "Test Demo Two V2",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V2\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\nEd.LineTrackerLed(Ed.ON)\n\nwhile True:\n  if Ed.ReadLineState()==Ed.LINE_ON_WHITE:\n    Ed.Drive(Ed.FORWARD_RIGHT, Ed.SPEED_1, Ed.DISTANCE_UNLIMITED)\n  else:\n    Ed.Drive(Ed.FORWARD_LEFT, Ed.SPEED_1, Ed.DISTANCE_UNLIMITED)\n\n",
        "version": "2"
    },
    {
        "id": "006",
        "title": "Clap_controlled_driving",
        "description": "",
        "code": "#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V3\n\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\ndef waitClap():\n	#loop around, waiting for a clap to be detected\n	while Ed.ReadClapSensor() != Ed.CLAP_DETECTED:\n		pass\n\nwhile True:\n	#wait for a clap to be detected\n	waitClap()\n	#turn on LED to indicate a detection\n	Ed.RightLed(Ed.ON)\n	#wait a short amount of time so that the same clap is not detected twice\n	Ed.TimeWait(100, Ed.TIME_MILLISECONDS)\n	#clear the clap detection, so that the same clap is not detected twice\n	Ed.ReadClapSensor()\n	#wait a short amount of time to ensure the second clap has time to be detected\n	Ed.TimeWait(250, Ed.TIME_MILLISECONDS)\n	#test to see if a second clap has occured\n	if Ed.ReadClapSensor() == Ed.CLAP_DETECTED:\n		#A second clap has been found! turn on the other LED and drive forwards\n		Ed.LeftLed(Ed.ON)\n		Ed.Drive(Ed.FORWARD, Ed.SPEED_10, 15)\n	else:\n		#only one clap detected. spin to the right\n		Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_10, 90)\n	# wait a short time and clears the clap detection before looping\n	Ed.TimeWait(250, Ed.TIME_MILLISECONDS)\n	Ed.RightLed(Ed.OFF)\n	Ed.LeftLed(Ed.OFF)\n	Ed.ReadClapSensor()\n\n\n",
        "version": "3"
    },
    {
        "id": "007",
        "title": "Avoid_obstacles",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\nEd.EdisonVersion = Ed.V3\n\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n#--------Your code below-----------\n# Create the variable LedStatusBlink and set to 0 \nLedStatusBlink = 0\nEd.TimeWait(250, Ed.TIME_MILLISECONDS)\n#turn on obstacle detection\nEd.ObstacleDetectionBeam(Ed.ON)\n#start Edison driving, without a duration\nEd.Drive(Ed.FORWARD, Ed.SPEED_5, Ed.DISTANCE_UNLIMITED)\n\n#loop forever\nwhile True:\n#Flash the LED lights on and off\n    LedStatusBlink = LedStatusBlink ^ 1 #Exclusive OR (XOR) 1 with LedStatusBlink to alternate between 0 and 1\n    Ed.LeftLed(LedStatusBlink)\n    Ed.RightLed(LedStatusBlink)\n    Ed.TimeWait(150, Ed.TIME_MILLISECONDS)\n    \n#Check for obstacles and drive away if any are detected\n    if Ed.ReadObstacleDetection()==Ed.OBSTACLE_LEFT:\n        Ed.LeftLed(Ed.ON)\n        Ed.RightLed(Ed.OFF)\n        Ed.PlayBeep()\n        Ed.Drive(Ed.BACKWARD, Ed.SPEED_5, 3)\n        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 60)\n        Ed.Drive(Ed.STOP, 0, 0)\n        Ed.TimeWait(100, Ed.TIME_MILLISECONDS)\n    elif Ed.ReadObstacleDetection()==Ed.OBSTACLE_RIGHT:\n        Ed.RightLed(Ed.ON)\n        Ed.LeftLed(Ed.OFF)\n        Ed.PlayBeep()\n        Ed.Drive(Ed.BACKWARD, Ed.SPEED_5, 3)\n        Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_5, 60)\n        Ed.Drive(Ed.STOP, 0, 0)\n        Ed.TimeWait(100, Ed.TIME_MILLISECONDS)\n    elif Ed.ReadObstacleDetection()==Ed.OBSTACLE_AHEAD:\n        Ed.LeftLed(Ed.ON)\n        Ed.RightLed(Ed.ON)\n        Ed.PlayBeep()\n        Ed.Drive(Ed.BACKWARD, Ed.SPEED_5, 3)\n        Ed.Drive(Ed.Random(Ed.SPIN_RIGHT,Ed.SPIN_LEFT), Ed.SPEED_5, 160)\n        Ed.Drive(Ed.STOP, 0, 0)\n        Ed.TimeWait(100, Ed.TIME_MILLISECONDS)\n    Ed.ReadObstacleDetection()  #clear the ReadObstacleDetection register of any detections made while turning around\n    Ed.Drive(Ed.FORWARD, Ed.SPEED_5, Ed.DISTANCE_UNLIMITED)\n\n",
        "version": "3"
    },
    {
        "id": "008",
        "title": "Follow_flashlight",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V3\n\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\n#loop forever\nwhile True:\n	if Ed.ReadLeftLightLevel()>Ed.ReadRightLightLevel():\n		#If the left light level is higher, drive to the left\n		Ed.Drive(Ed.FORWARD_LEFT, Ed.SPEED_10, Ed.DISTANCE_UNLIMITED)\n	else:\n		#otherwise, the light is on the right so drive to the right\n		Ed.Drive(Ed.FORWARD_RIGHT, Ed.SPEED_10, Ed.DISTANCE_UNLIMITED)\n\n#To use this code with Edison Version 1:\n#change the version in the setup to Ed.EdisonVersion = Ed.V1\n#change Ed.DistanceUnits = Ed.CM to Ed.DistanceUnits = Ed.TIME\n\n",
        "version": "3"
    },
    {
        "id": "009",
        "title": "Line_tracking",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V3\n\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\nEd.LineTrackerLed(Ed.ON)\n\nwhile True:\n	if Ed.ReadLineState()==Ed.LINE_ON_WHITE:\n		Ed.Drive(Ed.FORWARD_RIGHT, Ed.SPEED_10, Ed.DISTANCE_UNLIMITED)\n	else:\n		Ed.Drive(Ed.FORWARD_LEFT, Ed.SPEED_10, Ed.DISTANCE_UNLIMITED)\n\n",
        "version": "3"
    },
    {
        "id": "010",
        "title": "Bounce_in_borders",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V3\n\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\n#turn on line tracker\nEd.LineTrackerLed(Ed.ON)\n\n#loop forever\nwhile True:\n	#start driving forwards\n	Ed.Drive(Ed.FORWARD, Ed.SPEED_7, Ed.DISTANCE_UNLIMITED)\n	#while Edison is on a white surface continue forwards\n	while Ed.ReadLineState()==Ed.LINE_ON_WHITE:\n		pass\n	#when Edison is not on a white surface back up and turn around\n	Ed.RightLed(Ed.ON)\n	Ed.LeftLed(Ed.ON)\n	Ed.PlayBeep()\n	Ed.Drive(Ed.BACKWARD, Ed.SPEED_5, 2)\n	Ed.RightLed(Ed.OFF)\n	Ed.LeftLed(Ed.OFF)\n	if Ed.Random(0,1) == 1:\n	    Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_10, 120)\n        else:\n            Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_10, 120)\n",
        "version": "3"
    },
    {
        "id": "011",
        "title": "Sumo_wrestle",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\nEd.EdisonVersion = Ed.V3\n\nEd.DistanceUnits = Ed.CM\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\n#Event for black line detected - Turn around and go back\ndef detectedLine():\n    Ed.RegisterEventHandler(Ed.EVENT_LINE_TRACKER_ON_BLACK, None) #Stop detecting for a line while turning around \n    Ed.LeftLed(Ed.ON)\n    Ed.RightLed(Ed.ON)\n    Ed.PlayBeep()\n    Ed.Drive(Ed.BACKWARD, Ed.SPEED_10, 6)\n    Ed.Drive(Ed.Random(Ed.SPIN_RIGHT,Ed.SPIN_LEFT), Ed.SPEED_5, 170)\n    Ed.LeftLed(Ed.OFF)\n    Ed.RightLed(Ed.OFF)	\n    Ed.Drive(Ed.FORWARD, Ed.SPEED_5, Ed.DISTANCE_UNLIMITED)\n    Ed.RegisterEventHandler(Ed.EVENT_LINE_TRACKER_ON_BLACK, 'detectedLine') #Start detecting for a line again \n    Ed.StartCountDown(4, Ed.TIME_SECONDS)\n\n#Event for countdown timer - Spin aound to get unstuck when the countdown timer gets to 0	\ndef spinAround():\n    Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_10, Ed.DISTANCE_UNLIMITED)\n    Ed.TimeWait(1, Ed.TIME_SECONDS)\n    Ed.Drive(Ed.STOP, 0, 0)\n    Ed.Drive(Ed.FORWARD, Ed.SPEED_5, Ed.DISTANCE_UNLIMITED)\n    Ed.StartCountDown(4, Ed.TIME_SECONDS)\n\nEd.RegisterEventHandler(Ed.EVENT_TIMER_FINISHED, 'spinAround')\nEd.RegisterEventHandler(Ed.EVENT_LINE_TRACKER_ON_BLACK, 'detectedLine')\n\n#Main program starts here\nEd.LineTrackerLed(Ed.ON)\nEd.ObstacleDetectionBeam(Ed.ON)\nEd.StartCountDown(4, Ed.TIME_SECONDS)\n\nwhile True:\n    if Ed.ReadObstacleDetection() == Ed.OBSTACLE_NONE:\n        Ed.RightLed(Ed.OFF)\n        Ed.LeftLed(Ed.OFF)\n        Ed.Drive(Ed.FORWARD, Ed.SPEED_3, Ed.DISTANCE_UNLIMITED)\n        \n    elif Ed.ReadObstacleDetection() == Ed.OBSTACLE_LEFT:\n        Ed.LeftLed(Ed.ON)\n        Ed.PlayBeep()\n        Ed.Drive(Ed.FORWARD_LEFT, Ed.SPEED_5, Ed.DISTANCE_UNLIMITED)\n        Ed.TimeWait(200, Ed.TIME_MILLISECONDS)\n        Ed.LeftLed(Ed.OFF)\n        Ed.RightLed(Ed.OFF)\n        \n    elif Ed.ReadObstacleDetection() == Ed.OBSTACLE_RIGHT:\n        Ed.RightLed(Ed.ON)\n        Ed.PlayBeep()\n        Ed.Drive(Ed.FORWARD_RIGHT, Ed.SPEED_5, Ed.DISTANCE_UNLIMITED)\n        Ed.TimeWait(200, Ed.TIME_MILLISECONDS)\n        Ed.LeftLed(Ed.OFF)\n        Ed.RightLed(Ed.OFF)\n        \n    elif Ed.ReadObstacleDetection() == Ed.OBSTACLE_AHEAD:\n        Ed.RightLed(Ed.ON)\n        Ed.LeftLed(Ed.ON)\n        Ed.PlayBeep()\n        Ed.Drive(Ed.FORWARD, Ed.SPEED_10, Ed.DISTANCE_UNLIMITED)\n        Ed.TimeWait(200, Ed.TIME_MILLISECONDS)\n        Ed.LeftLed(Ed.OFF)\n        Ed.RightLed(Ed.OFF)\n\n",
        "version": "3"
    },

    {
        "id": "012",
        "title": "Test_program",
        "description": "",
        "code": "\n#-------------Setup----------------\n\nimport Ed\n\nEd.EdisonVersion = Ed.V3\n\nEd.DistanceUnits = Ed.TIME\nEd.Tempo = Ed.TEMPO_MEDIUM\n\n#--------Your code below-----------\n\n\nwhile True:\n	Ed.PlayBeep()\n	Ed.LeftLed(Ed.OFF)\n	Ed.RightLed(Ed.ON)\n	Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 350)\n	Ed.TimeWait(20, Ed.TIME_MILLISECONDS)\n	Ed.PlayBeep()\n	Ed.LeftLed(Ed.ON)\n	Ed.RightLed(Ed.OFF)\n	Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_5, 350)\n	Ed.TimeWait(20, Ed.TIME_MILLISECONDS)\n",
        "version": "3"
    },

]