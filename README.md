# DroneForensiQ  
## Empowering Drone Investigations with Intelligence

---

## 1. Overview

DroneForensiQ is a forensic-grade, open-source drone telemetry analysis framework designed to support digital forensic investigators, cybersecurity analysts, researchers, and law enforcement agencies in the examination of Unmanned Aerial Vehicle (UAV) flight data.

With the increasing proliferation of consumer and commercial drones, incidents involving unauthorized flights, espionage, smuggling, surveillance, and restricted airspace violations have become common. These incidents require investigators to reconstruct drone behavior using flight telemetry, metadata, and sensor logs stored within drones or associated control applications.

DroneForensiQ addresses this requirement by providing a secure, extensible, and offline platform capable of decoding, decrypting, parsing, visualizing, and exporting drone flight logs while preserving forensic integrity.

---

## 2. Problem Statement

Most modern drones store telemetry data in proprietary and often encrypted formats. Investigators face several challenges:

- Vendor-specific file formats
- Encrypted telemetry logs
- Lack of standardization across manufacturers
- Dependence on cloud-based tools
- Inadequate forensic integrity controls
- Poor visualization and reporting mechanisms

Existing tools often prioritize diagnostics or consumer analytics rather than forensic analysis. DroneForensiQ was developed to bridge this gap by offering a forensic-first, investigator-centric solution.

---

## 3. Objectives

The primary objectives of DroneForensiQ are:

- To enable forensic-grade extraction of drone telemetry data
- To support encrypted and unencrypted flight logs
- To provide multi-vendor drone log compatibility
- To ensure data integrity and chain of custody
- To deliver interactive visual reconstruction of drone flights
- To expose APIs for forensic automation
- To remain fully offline and open-source

---

## 4. Scope of the Project

DroneForensiQ focuses on **post-flight forensic analysis**. It does not attempt to control drones or interfere with live operations.

The scope includes:

- Flight log ingestion
- Binary decoding and decryption
- Telemetry extraction
- Data normalization
- Visualization
- Export for reporting and legal use

Out-of-scope areas include:

- Real-time drone interception
- Command-and-control exploitation
- Active drone tracking

---

## 5. Background: Drone Forensics

Drone forensics is a subdomain of digital forensics that deals with the identification, acquisition, analysis, and presentation of evidence from UAV systems.

Drone evidence sources include:

- Flight controller logs
- Mobile application logs
- Ground control station data
- Onboard storage
- Telemetry metadata
- Sensor readings

DroneForensiQ specifically focuses on **flight telemetry logs**, which are critical for reconstructing:

- Flight paths
- Altitude changes
- Speed and acceleration
- Battery behavior
- Operator intent
- Abnormal or malicious actions

---

## 6. Literature Review Summary

### 6.1 Existing Tools

**DJI Official Log Viewers**  
Limited access, encrypted logs restricted, not for forensic purposes.

**Airdata UAV**  
Cloud-based visualization tool. Raises privacy, chain-of-custody, and admissibility concerns.

**DatCon / CsvView**  
Open-source but limited to older DJI formats. Poor UI and encryption support.

**Vendor Diagnostic Tools**  
Closed-source, limited export, no forensic assurance.

### 6.2 Identified Gaps

- No unified forensic platform
- Poor encryption handling
- Cloud dependency
- Limited extensibility
- Absence of audit trails

DroneForensiQ was designed specifically to address these shortcomings.

---

## 7. System Architecture

DroneForensiQ follows a layered, modular architecture.

### 7.1 Architecture Layers

1. Presentation Layer  
2. Application Logic Layer  
3. Data Processing Layer  
4. Visualization Layer  
5. Persistence Layer  

Each layer is isolated to ensure maintainability and forensic soundness.

---

## 8. Technology Stack

### 8.1 Backend

- Python 3.11
- Flask (REST API framework)

### 8.2 Data Processing

- Pandas
- NumPy
- PyCryptodome (AES decryption)

### 8.3 Visualization

- Plotly
- Dash
- Folium
- SimpleKML

### 8.4 Frontend

- HTML5
- CSS3
- JavaScript
- Jinja2 templates

---

## 9. File Processing Workflow

DroneForensiQ implements a strict forensic workflow:

1. File Upload  
2. Filename Sanitization  
3. Hash Generation (MD5, SHA-256)  
4. Format Detection  
5. Decryption (if required)  
6. Binary Parsing  
7. Telemetry Normalization  
8. Visualization Generation  
9. Export and Reporting  

Original files remain untouched throughout the process.

---

## 10. Supported Drone Formats

### DJI

- `.DAT` (E1, E2, E3, P1–P4)
- `.TXT`
- `.CSV`

### Parrot

- `.CSV`
- `.TXT` (partial support)

### Autel

- `.BIN` (partial support)

### Experimental / Custom UAVs

- `.LOG`
- `.CSV`
- `.KML`

---

## 11. Encrypted Log Handling

DroneForensiQ supports encrypted DJI E2 logs using AES-based decryption routines.

Decryption is performed only after:

- File validation
- Integrity hashing
- Secure isolation

If encryption keys are unavailable, the system safely halts processing without data corruption.

---

## 12. Telemetry Extraction

Extracted telemetry includes:

- Latitude and longitude
- Altitude
- Velocity vectors
- Battery voltage, current, temperature
- IMU sensor data
- Gimbal orientation
- Timestamp synchronization

All values are normalized into SI units for consistency.

---

## 13. Visualization Engine

DroneForensiQ provides investigator-centric visualization:

### 13.1 Map-Based Reconstruction

- Flight path overlay
- Takeoff and landing points
- Directional arrows
- Hover and anomaly markers

### 13.2 Time-Series Analysis

- Altitude vs time
- Speed vs time
- Battery discharge curves
- Orientation changes

---

## 14. REST API Design

DroneForensiQ exposes RESTful APIs for automation.

| Endpoint | Method | Description |
|--------|-------|------------|
| `/upload` | POST | Upload flight log |
| `/dashboard` | GET | Visualization UI |
| `/api/data` | GET | Telemetry JSON |
| `/view_csv` | GET | Parsed CSV view |

---

## 15. Security Controls

- Secure filename handling
- Temporary sandboxed storage
- Cryptographic hashing
- Session-based isolation
- Automatic file cleanup
- Audit-ready logging

These controls ensure legal admissibility.

---

## 16. Performance Evaluation

### Test Environment

- Intel i7 (12th Gen)
- 8 GB RAM
- Ubuntu 22.04 / Windows 11
- Python 3.11

### Processing Time

- DJI `.DAT`: 2–4.5 seconds
- DJI `.TXT`: <2 seconds
- KML export: <1 second

---

## 17. Telemetry Accuracy

| Parameter | Deviation |
|---------|-----------|
| GPS | ±0.0001° |
| Altitude | ±1.5 m |
| Velocity | ±0.3 m/s |
| Battery Voltage | ±0.05 V |

---

## 18. Comparative Analysis

DroneForensiQ provides:

- Multi-vendor support
- Encrypted log decoding
- Offline analysis
- API integration
- Forensic hashing
- Rich visualization

Capabilities absent in most existing tools.

---

## 19. Limitations

- Limited support for newest proprietary formats
- High memory usage for very large logs
- Desktop-optimized UI

---

## 20. Future Enhancements

- AI-based anomaly detection
- Real-time telemetry triage
- Batch processing
- Automated forensic reports
- Case management
- Support for military UAVs

---

## 21. Conclusion

DroneForensiQ establishes a strong foundation for open, forensic-grade drone telemetry analysis. It demonstrates how transparent, secure, and extensible tools can significantly enhance drone-related investigations in cybersecurity and law enforcement.

---

## 22. Author

Tarun Kaushik  
Cybersecurity & Digital Forensics Researcher  
National Forensic Sciences University

---

## 23. License

Released for research and educational purposes.  
Operational deployment should comply with institutional policies.

---

## 24. Final Note

DroneForensiQ aims to evolve into a standard forensic toolkit for UAV investigations, empowering analysts with accuracy, transparency, and trust.

