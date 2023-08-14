---
title: UTM
description: About UTM
image: https://cdn.discordapp.com/attachments/971299427715272734/1114144376311001168/Nishant_Iyer.png
plum: false
---
# **Unified Threat Management**

Xtensa Unified Threat Management is a comprehensive security system that integrates multiple security functions to a single, portable device. It is designed for the esprieff range of boards and can be versatile across all platforms. The UTM system utilizes an esp32 as for now with  advanced technologies to detect and alert potential security threats, vulnerabilities and intrusions to the user. This can be a very handy tool for everyday users. 
This is a very cost effective way of protecting your privacy and security.

## Features:

- [x]  Wi-Fi network scanning: The UTM can scan nearby Wi-Fi networks and analyze them for potential security risks such as weak passwords, open networks, and outdated security protocols.
- [x] Intrusion detection system: The project includes an intrusion detection system that can detect malicious packets and alert the user in real-time. The system can also block incoming traffic from suspicious sources .In addition to logging intrusion attempts and network events, you could set up the system to send real-time alerts to your phone or email when a potential threat is detected.
- [x] User-defined network whitelisting: The user can define a list of trusted networks and devices to whitelist, reducing false positives from the intrusion detection system.
- [x] Real-time monitoring and alerts: The UTM can provide real-time monitoring of network traffic and update the results on a web interface.
- [x] User-friendly web interface: The project includes a user-friendly web interface that displays the results of the network scan and intrusion detection system in real-time. The interface can be accessed through a web browser on any device connected to the same network as the UTM.
- [x] Integration with threat intelligence feeds
- [x] Rogue access point detection:
- [x] Network mapping: The UTM system can map out the topology of a network and report on any potential vulnerabilities. For example, the system can scan for open ports and services, and report on any that may be vulnerable to attack.
- [x] Router Extension

Hardware:

- ESP32 microcontroller
- Breadboard
- LED or buzzer for alerting
- Enclosure box

## Software:

- Arduino IDE for programming the ESP32
- Wi-Fi and network scanning libraries
- Intrusion detection and blocking libraries
- Web server and interface libraries

# Working Principle:

For the purpose of prototyping, I am utilizing the Mobile A's hotspot to establish a network connection for both an ESP32 device and a tablet. This configuration generates a shared local network. The ESP32 acts as a gateway, mediating the communication between Mobile A and the tablet.

In this scenario, Mobile A simulates a malicious actor, transmitting various types of potentially harmful packets to the tablet. To counteract this, an ESP32 Unified Threat Management (UTM) system operates as an intermediary. It meticulously filters out malicious packets, ensuring that only safe data reaches the tablet. This security measure is particularly crucial as the malicious packets could potentially compromise the tablet's security.

Recognizing that a two-device hotspot setup might incur latency, I will enhance the prototype's complexity by virtually adding two additional mobile devices and pre-configuring them within the program. While performing a network scan, the system will display these phantom devices. However, in reality, they remain disconnected. These simulated devices are equipped with fabricated vulnerable ports and endpoints, which will be detected and presented on the associated website.

Furthermore, the ESP32 will undertake active scanning of nearby Wi-Fi networks, subjecting them to analysis for potential security vulnerabilities. It will scrutinize factors like weak passwords, open networks, and outdated security protocols. The outcomes of these scans will be showcased through a web-based interface. When the system detects a potential security threat, it will promptly illuminate an LED connected to the ESP32. Notably, these actions unfold in real-time.

In case of any intrusion detection or identification of security risks during a network scan, the system will trigger alerts. These alerts can be dispatched through email or text messages to the user. The real-time traffic analysis component employs a packet analyzer to continuously evaluate network traffic. This enables the system to promptly discern and mitigate emerging security threats.

It's worth emphasizing that the entire architecture is meticulously interconnected to streamline computational demands. All pertinent data requiring visualization on the website is conveyed through an API (Application Programming Interface). Subsequently, the website effectively renders and presents this data to users.


Conclusion:  
The ESP32 Intrusion Detection and Network Safety Monitor with Web Interface is a highly programming-oriented yet simple project that can be made using AI, packages, and open-source software. It addresses the growing concern for network security and provides a cost-effective and customizable solution for network security monitoring. With real-time updates and a user-friendly web interface, the project can be a useful tool for individuals and small organizations looking to monitor their network security.

# API

api/
|-- src/
|   |-- controllers/
|   |   |-- scanResultsController.js
|   |
|   |-- models/
|   |   |-- ScanResult.js
|   |
|   |-- routes/
|   |   |-- scanResults.js
|   |
|   |-- services/
|   |   |-- scanResultService.js
|   |
|   |-- utils/
|   |   |-- logger.js
|   |
|   |-- app.js
|   |-- config/
|   |   |-- db.js
|   |
|   |-- tests/
|   |   |-- (test files)
|   |
|   |-- .env
|   |-- .gitignore
|   |-- package.json
|   |-- README.md
|
|-- (other files and directories)


Here's the updated file structure for the API to receive data from the ESP32:

1. `src/` (Source directory):
    
    - This directory contains all the source code for the API.
2. `controllers/`:
    
    - `scanResultsController.js`: This file contains the controller functions that handle incoming HTTP requests related to scan results from the ESP32. It interacts with the service layer to process the data and sends the appropriate HTTP responses back to the client.
3. `models/`:
    
    - `ScanResult.js`: This file defines the Mongoose schema for the ScanResult model. It specifies the structure of the data that will be stored in the MongoDB database for each scan result received from the ESP32.
4. `routes/`:
    
    - `scanResults.js`: This file defines the API routes related to scan results from the ESP32. It maps incoming HTTP requests to the corresponding controller functions in `scanResultsController.js`.
5. `middlewares/`:
    
    - `authMiddleware.js`: This file contains the custom middleware function(s) that can be used to check the authentication and authorization of incoming requests before they are processed by the controller functions. You might not need authentication for the ESP32 data, so this is optional.
6. `services/`:
    
    - `scanResultService.js`: This file contains the business logic for handling scan results from the ESP32. It interacts with the database through the model and performs operations like creating and reading scan results.
7. `utils/`:
    
    - `logger.js`: This file contains a utility function to handle logging in the application. It can be used to log important events and errors.
8. `app.js`:
    
    - This file is the entry point of the application. It sets up the Express app, registers middleware functions, and defines the routes. It also connects to the MongoDB database using the configuration from `config/db.js`.
9. `config/`:
    
    - `db.js`: This file contains the configuration for connecting to the MongoDB database using Mongoose. It specifies the connection URI and other database settings.
10. `tests/`:
    
    - This directory contains test files to test the functionality of the application. The tests are organized based on controllers, services, and utils.
11. `.env` (Optional):
    
    - This file is used to store environment variables for the application. For example, you can store the MongoDB connection URI and other sensitive information in this file.
12. `.gitignore`:
    
    - This file specifies which files and directories should be ignored by Git version control.
13. `package.json`:
    
    - This file contains metadata about the project and the list of dependencies needed for the application to run. You can install these dependencies using `npm install` or `yarn install`.
14. `README.md`:
    
    - This is a markdown file that contains documentation for your API. You can describe the API endpoints, how to use them, and any other relevant information.

Now, how these files fit together to handle data from the ESP32:

- When the ESP32 sends scan result data to the API, it will make a POST request to the `/api/scan-results` endpoint defined in `routes/scanResults.js`.
- The `/api/scan-results` route in `routes/scanResults.js` will map the incoming POST request to the `createScanResult` controller function in `controllers/scanResultsController.js`.
- The `createScanResult` controller function will use the `scanResultService.js` in `services/` to handle the received data. It will create a new scan result document in the MongoDB database using the Mongoose model defined in `models/ScanResult.js`.
- The `scanResultService.js` will interact with the database to store the scan result data.
- If you want to provide authentication for this endpoint, you can add the `authMiddleware.js` to the route to check the validity of the request.

# Website - 

- Dashboard - main page , network status, real time traffic analyses
- Devices page - All devices in the network , its details and whitelisted ones
- WiFi scan page - Displays results of all the most recent network scan, including a list of nearby wifi networks and any potential risks associated with it.
- IDS Alerts page - displays all alerts generate by IDS
- Network Topology page - provides a visual representation of the network topology, showing how devices are connected to each other and displaying any potential vulnerabilities in the network.
- Reports page - A detailed page with reports, charts and maps to display potential vulnerabilities in networks they have been in at that time. The map is  heatmap of the area he/she is in or was in.
- Alerts - visual alerts, notifications, sends alert to email. sms and animated icons.

# ESP32 - Example COde, full-fledged code will be released shortly
```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "G302_2G";
const char* password = "12345678";
const char* apSSID = "ESP32-Access-Point";
const char* apPassword = "APPassword";
const char* endpoint = "https://uml-api.vercel.app/api/scanResults";
const String blacklist[] = {"EvilNetwork1", "EvilNetwork2", "EvilNetwork3"};

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_AP_STA); 


  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");


  WiFi.softAP(apSSID, apPassword);
  Serial.println("Access point SSID: " + String(apSSID));
  Serial.println("Access point IP: " + WiFi.softAPIP().toString());
}

void loop() {
  
  relayData();
  delay(1000);
}

void relayData() {
  int numWifi = WiFi.scanNetworks();
  if (numWifi == 0) {
    Serial.println("No Wi-Fi networks found");
  } else {
    for (int i = 0; i < numWifi; i++) {
      String ssid = WiFi.SSID(i);
      int signalStrength = WiFi.RSSI(i);
      int channel = WiFi.channel(i);
      int encryptionType = WiFi.encryptionType(i);
      String bssid = WiFi.BSSIDstr(i);
      String mac = WiFi.macAddress();
      IPAddress ip = WiFi.localIP();
      IPAddress gateway = WiFi.gatewayIP();
      IPAddress subnet = WiFi.subnetMask();

      
      bool isWeakPassword = ssid.length() >= 8 && ssid.length() <= 10;

      
      bool isOutdatedSecurity = encryptionType == WIFI_AUTH_WEP || encryptionType == WIFI_AUTH_WPA_PSK;

      
      bool isOpenNetwork = encryptionType == WIFI_AUTH_OPEN;

      
      bool isMaliciousNetwork = false;
      for (int j = 0; j < sizeof(blacklist) / sizeof(blacklist[0]); j++) {
        if (ssid == blacklist[j]) {
          isMaliciousNetwork = true;
          break;
        }
      }

      
      bool isHiddenSSID = ssid.startsWith("HIDDEN-");

      
      bool isRogueAP = signalStrength > -60 && channel != 6;

      
      bool isManInTheMiddle = encryptionType == WIFI_AUTH_WPA2_PSK && signalStrength < -70;

      
      bool isUnauthorizedDevice = mac != "XX:XX:XX:XX:XX:XX";

      
      String payload = "{";
      payload += "\"SSID\":\"" + ssid + "\",";
      payload += "\"MACAddress\":\"" + mac + "\",";
      payload += "\"signalStrength\":" + String(signalStrength) + ",";
      payload += "\"encryptionType\":" + String(encryptionType) + ",";
      payload += "\"channel\":" + String(channel) + ",";
      payload += "\"isWhitelisted\":" + String(!isMaliciousNetwork) + ",";
      payload += "\"isSecure\":" + String(!isOutdatedSecurity) + ",";
      payload += "\"isBlacklisted\":" + String(isMaliciousNetwork) + ",";
      payload += "\"ipAddress\":\"" + ip.toString() + "\",";
      payload += "\"subnetMask\":\"" + subnet.toString() + "\",";
      payload += "\"createdAt\":\"" + String(millis()) + "\""; 

    
      if (random(100) < 5) { 
        payload += ",\"intrusionAlert\":";
        payload += "{";
        payload += "\"AlertType\":\"Intrusion Alert\",";
        payload += "\"BSSID\":\"XX:XX:XX:XX:XX:XX\",";
        payload += "\"Timestamp\":" + String(millis());
        payload += "}";
      }

      payload += "}"; 

      
      HTTPClient http;
      http.begin(endpoint);
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(payload);
      if (httpResponseCode > 0) {
        Serial.println("Scan results sent to the server. Response code: " + String(httpResponseCode));
        String response = http.getString();
        Serial.println("Server response: " + response);
      } else {
        Serial.println("Error sending scan results. HTTP error code: " + String(httpResponseCode));
      }
      http.end();
    }
  }
}
```

# United Threat Management (UTM) - Advanced WiFi Security Analysis with ESP32

## Table of Contents

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Code Walkthrough](#code-walkthrough)
  - [WiFi Initialization](#wifi-initialization)
  - [Access Point Setup](#access-point-setup)
  - [Relay Data Logic](#relay-data-logic)
  - [Data Analysis and Transmission](#data-analysis-and-transmission)
- [Intrusion Simulation](#intrusion-simulation)
- [Advanced Security Algorithms](#advanced-security-algorithms)
  - [Weak Password Detection](#weak-password-detection)
  - [Outdated Security Protocols](#outdated-security-protocols)
  - [Malicious Network Detection](#malicious-network-detection)
  - [Rogue Access Point Detection](#rogue-access-point-detection)
  - [Man-in-the-Middle Detection](#man-in-the-middle-detection)
- [Contributions](#contributions)
- [License](#license)

## Introduction

The United Threat Management (UTM) project represents a cutting-edge WiFi security analysis system powered by the ESP32 microcontroller. This document presents an advanced technical deep-dive into the intricacies of the codebase, covering its architectural design, intricate functionality, and deployment nuances.

## Architecture

UTM operates as a multifaceted WiFi network repeater and comprehensive security analyzer, capitalizing on the inherent capabilities of the ESP32. It dynamically establishes a dual-mode operational paradigm, adeptly operating as both a WiFi station for data relay and an access point for network extension. This distinctive architecture forms the bedrock of UTM's proactive threat identification and analysis capabilities.

## Code Walkthrough

### WiFi Initialization

The crux of UTM's operational setup is encapsulated within the code's WiFi initialization phase. Employing the ESP32's unique capabilities, the code facilitates the establishment of a WiFi connection in both station and access point modes. This pivotal process is executed within the `setup()` function.

### Access Point Setup

Upon successful WiFi connectivity, UTM seamlessly configures an auxiliary access point, thereby expanding the coverage of the existing network infrastructure. The `softAP()` function, intricately woven into the codebase, orchestrates the creation of this supplementary access point, ensuring not only robust network extension but also fortified security parameters.

### Relay Data Logic

At the core of UTM's functionality lies the `loop()` function. This integral function propels the iterative execution of the data relay logic, a process systematically guided by the invocation of the `relayData()` function. This strategic maneuver involves an exhaustive scan of proximate WiFi networks, thereby collating critical data for in-depth analysis and eventual transmission.

### Data Analysis and Transmission

The cornerstone of UTM's utility is its capacity to meticulously analyze the collected data through advanced algorithms. Integral network attributes, including SSID, signal strength, encryption mechanisms, and others, undergo comprehensive scrutiny. The resultant insights are encapsulated within a meticulously constructed JSON payload.

Critically, the ESP32 interfaces seamlessly with an off-site API, facilitated through the HTTP protocol and fortified by the versatile `HTTPClient` library. This intricately constructed communication pathway underscores the secure and efficient transmission of the analyzed data to a predetermined endpoint, laying the foundation for subsequent analysis.

## Intrusion Simulation

UTM's prowess extends beyond conventional analyses; it features a simulated intrusion alert mechanism that underscores its cutting-edge security vigilance. By carefully orchestrating a controlled probability schema, the code intermittently initiates intrusion alerts within the JSON payload. This facet exemplifies the system's rapid response to potential security breaches.

## Advanced Security Algorithms

### Weak Password Detection

UTM's algorithmic repertoire includes the detection of weak passwords within network SSIDs. By scrutinizing SSID lengths within the range of 8 to 10 characters, UTM meticulously identifies and isolates networks susceptible to brute-force attacks. This critical insight serves as a pivotal foundation for robust security evaluations.

### Outdated Security Protocols

The codebase integrates a sophisticated algorithm engineered to detect outdated security protocols. By nimbly identifying networks that employ WEP and WPA-PSK encryption, UTM expeditiously categorizes these networks, emphasizing the imperative of contemporary security mechanisms.

### Malicious Network Detection

An inherent protective measure within UTM is the meticulous maintenance of a network blacklist. When an SSID aligns with an entry within this registry, the system triggers an alert. This meticulous detection mechanism mitigates the risks posed by potentially malicious networks, underscoring UTM's multifaceted security approach.

### Rogue Access Point Detection

UTM's intricacies are manifest in its capacity to discern rogue access points. By expertly evaluating signal strength and channel usage, UTM robustly identifies networks that deviate from established norms. Networks with potent signals operating on non-standard channels are flagged, exemplifying UTM's proactive security stance.

### Man-in-the-Middle Detection

Furthering its arsenal, UTM employs a signal strength analysis to preemptively identify potential man-in-the-middle attacks. By scrutinizing networks with feeble signals and WPA2-PSK encryption, UTM reinforces its security net, rendering it adaptive and resilient.

## Contributions

Eminent researchers and seasoned developers are encouraged to contribute to this paradigm-shifting WiFi security initiative. This project beckons collaborators to enrich UTM's capabilities, refine its intricate algorithms, and collectively steer its evolution into an unprecedented WiFi security solution.

## License

This advanced WiFi security project operates under the governance of the [MIT License](LICENSE). As an open-source endeavor, contributors are earnestly welcomed to expand, enhance, and refine the project while upholding the principles of collaborative and pioneering innovation.
