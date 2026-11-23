/**
 * Semester 7 Examination Portal - Course Curriculum & Unit Database
 * Covers Computer Vision, Fault-Tolerant Systems, and Software Defined Networks.
 */

const STUDY_DATA = {
  portalTitle: "Semester 7 Examination Portal",
  portalSubtitle: "Master Study Hub & Interactive Unit Navigator",
  academicYear: "Final Year • Semester VII",
  totalSubjects: 3,
  totalUnits: 15,
  subjects: [
    {
      id: "computer-vision",
      code: "CV",
      name: "Computer Vision",
      shortTitle: "Computer Vision",
      accent: "#6366f1",
      accentDark: "#818cf8",
      accentBg: "rgba(99, 102, 241, 0.12)",
      borderColor: "rgba(99, 102, 241, 0.35)",
      badgeColor: "#4f46e5",
      icon: "camera",
      summary: "Foundations of digital image processing, filters, edge/corner detection, shape models, 3D vision, motion tracking, and real-world recognition systems.",
      units: [
        {
          id: "cv-u1",
          unitNum: 1,
          subjectId: "computer-vision",
          subjectCode: "CV",
          subjectName: "Computer Vision",
          title: "Unit 1: Image Processing Foundations",
          subtitle: "Digital images, filtering, thresholding, edge & corner detection, morphology & texture",
          fileName: "Computer Vision Unit 1_ Image Processing Made Simple.html",
          relativePath: "computer vision/Computer Vision Unit 1_ Image Processing Made Simple.html",
          readTime: "18 min",
          badge: "Core Foundations",
          sections: [
            "1. Basics: what is an image, and why process it?",
            "2. Classical filtering (Box, Gaussian, Median)",
            "3. Thresholding (Global, Otsu's optimal threshold)",
            "4. Edge detection (Sobel, Prewitt, Canny detector)",
            "5. Corner and interest point detection (Harris, FAST)",
            "6. Mathematical morphology (Dilation, Erosion, Opening, Closing)",
            "7. Texture analysis & statistical features",
            "8. The big picture & exam recap"
          ],
          keyFormulas: [
            "2D Convolution: g(x,y) = sum f(x-i, y-j) * h(i,j)",
            "Harris Corner Matrix M = sum [Ix^2, IxIy; IxIy, Iy^2]",
            "Harris Response R = det(M) - k*(trace(M))^2"
          ],
          keywords: ["image basics", "filtering", "gaussian", "box filter", "median", "thresholding", "otsu", "edge detection", "sobel", "canny", "harris corner", "fast", "morphology", "dilation", "erosion", "opening", "closing", "texture"]
        },
        {
          id: "cv-u2",
          unitNum: 2,
          subjectId: "computer-vision",
          subjectCode: "CV",
          subjectName: "Computer Vision",
          title: "Unit 2: Shapes and Regions",
          subtitle: "Binary shape analysis, boundary tracking, active contours (snakes), and descriptors",
          fileName: "Unit 2_ Shapes and Regions – Easy Study Guide.html",
          relativePath: "computer vision/Unit 2_ Shapes and Regions – Easy Study Guide.html",
          readTime: "16 min",
          badge: "Shape Analysis",
          sections: [
            "Binary Shape Analysis & Connectivity (4 & 8 connectivity)",
            "Object Labeling & Connected Component Counting",
            "Size Filtering, Distance Transform & Skeletons",
            "Boundary Tracking & Freeman Chain Codes",
            "Active Contours ('Snakes') & Energy Minimization",
            "Shape Models & Recognition under Occlusion",
            "Boundary Descriptors (Fourier Descriptors, Curvature)",
            "Region Descriptors (Area, Compactness, Moments)"
          ],
          keyFormulas: [
            "Snake Energy: E_snake = sum [E_int(v_i) + E_ext(v_i)]",
            "Compactness = (Perimeter)^2 / Area",
            "Central Moments mu_pq = sum (x - x_bar)^p * (y - y_bar)^q * f(x,y)"
          ],
          keywords: ["binary shape", "connected components", "labeling", "distance transform", "skeleton", "medial axis", "boundary tracking", "chain code", "active contours", "snakes", "shape models", "descriptors", "moments"]
        },
        {
          id: "cv-u3",
          unitNum: 3,
          subjectId: "computer-vision",
          subjectCode: "CV",
          subjectName: "Computer Vision",
          title: "Unit 3: Hough Transform",
          subtitle: "Line detection, circular & ellipse Hough transforms, Generalized Hough Transform (GHT)",
          fileName: "Unit - 3_Hough Transform_ Easy Study Guide.html",
          relativePath: "computer vision/Unit - 3_Hough Transform_ Easy Study Guide.html",
          readTime: "17 min",
          badge: "Feature Extraction",
          sections: [
            "1. The Big Idea: Voting for Lines in Parameter Space",
            "2. The Maths: Polar representation (rho = x*cos theta + y*sin theta)",
            "3. The Algorithm Step by Step & Accumulator Array",
            "4. Foot-of-Normal Method & Line Localisation",
            "5. Noise and Discretisation: What Hurts Accuracy",
            "6. Line Fitting: Least Squares vs RANSAC",
            "7. Circle Detection (Circular Hough Transform)",
            "8. Ellipse Detection (5 parameter space)",
            "9. Real Uses: Iris Location and Hole Detection",
            "10. Generalized Hough Transform (GHT) & R-Table",
            "11. Pose Estimation Accuracy & GHT Scalability Problems",
            "12. Quick Cheat Sheet"
          ],
          keyFormulas: [
            "Polar Line Form: rho = x*cos(theta) + y*sin(theta)",
            "Circle Form: (x - a)^2 + (y - b)^2 = r^2",
            "R-Table mapping in GHT: phi -> list of (r, alpha)"
          ],
          keywords: ["hough transform", "accumulator array", "polar line", "foot of normal", "ransac", "least squares", "circular hough", "ellipse detection", "iris location", "generalized hough transform", "ght", "r-table"]
        },
        {
          id: "cv-u4",
          unitNum: 4,
          subjectId: "computer-vision",
          subjectCode: "CV",
          subjectName: "Computer Vision",
          title: "Unit 4: Vision and Motion",
          subtitle: "3D vision, shape from X, range finding, triangulation, bundle adjustment, and optical flow",
          fileName: "Unit 4_ Vision and Motion, Simple Guide.html",
          relativePath: "computer vision/Unit 4_ Vision and Motion, Simple Guide.html",
          readTime: "20 min",
          badge: "3D & Motion",
          sections: [
            "1. The Big Picture: Recovering 3D & Tracking Motion",
            "2. Methods for 3D vision (overview)",
            "3. Projection schemes (Orthographic vs Perspective)",
            "4. Shape from shading & Photometric stereo",
            "5. Shape from texture, focus and defocus",
            "6. Active range finding (Structured light, LiDAR, ToF)",
            "7. Surface representations: point-based vs volumetric",
            "8. 3D object recognition & alignment",
            "9. Introduction to motion & correspondence",
            "10. Triangulation & Bundle adjustment",
            "11. Translational, parametric & spline-based motion",
            "12. Optical flow (Lucas-Kanade & Horn-Schunck)",
            "13. Layered motion & Quick revision"
          ],
          keyFormulas: [
            "Perspective Projection: x = f * (X / Z), y = f * (Y / Z)",
            "Optical Flow Constraint: Ix * u + Iy * v + It = 0",
            "Lucas-Kanade System: [Ix^2, IxIy; IxIy, Iy^2] * [u; v] = -[IxIt; IyIt]"
          ],
          keywords: ["3d vision", "projection", "shape from shading", "photometric stereo", "active range finding", "lidar", "point clouds", "voxels", "triangulation", "bundle adjustment", "optical flow", "lucas-kanade", "horn-schunck"]
        },
        {
          id: "cv-u5",
          unitNum: 5,
          subjectId: "computer-vision",
          subjectCode: "CV",
          subjectName: "Computer Vision",
          title: "Unit 5: Computer Vision Applications",
          subtitle: "Face detection (Viola-Jones), Eigenfaces, AAM, background subtraction, tracking & ADAS",
          fileName: "Computer Vision Unit 5 – Simple Study Guide.html",
          relativePath: "computer vision/Computer Vision Unit 5 – Simple Study Guide.html",
          readTime: "19 min",
          badge: "Real-World Systems",
          sections: [
            "1. Photo album & Face detection (Viola-Jones, Haar, Integral Image)",
            "2. Face Recognition pipeline",
            "3. Eigenfaces (PCA, Covariance matrix, Projection)",
            "4. Active Appearance Model (AAM) & 3D Shape Models",
            "5. Surveillance: Foreground-Background Separation (MOG)",
            "6. Particle Filter & State-Space Object Tracking",
            "7. Chamfer Matching & Distance Transforms",
            "8. Occlusion Handling & Recovery",
            "9. Combining Views from Multiple Cameras",
            "10. Human Gait Analysis & Biometric Signatures",
            "11. In-Vehicle Vision Systems & Autonomous Driving (ADAS)"
          ],
          keyFormulas: [
            "Integral Image: II(x,y) = sum_{x'<=x, y'<=y} i(x',y')",
            "Eigenfaces: C = (1/M) sum Phi_i * Phi_i^T, C * u_k = lambda_k * u_k",
            "Particle Filter Update: w_t^(i) proportional to w_{t-1}^(i) * P(z_t | x_t^(i))"
          ],
          keywords: ["face detection", "viola-jones", "haar features", "integral image", "eigenfaces", "pca", "aam", "surveillance", "background subtraction", "particle filter", "chamfer matching", "gait analysis", "adas"]
        }
      ]
    },
    {
      id: "fault-tolerance",
      code: "FTS",
      name: "Fault-Tolerant Systems",
      shortTitle: "Fault Tolerance",
      accent: "#10b981",
      accentDark: "#34d399",
      accentBg: "rgba(16, 185, 129, 0.12)",
      borderColor: "rgba(16, 185, 129, 0.35)",
      badgeColor: "#059669",
      icon: "shield",
      summary: "Dependability metrics, hardware redundancy architectures, coding & information redundancy, software fault tolerance, and checkpointing recovery.",
      units: [
        {
          id: "fts-u1",
          unitNum: 1,
          subjectId: "fault-tolerance",
          subjectCode: "FTS",
          subjectName: "Fault-Tolerant Systems",
          title: "Unit 1: Foundations & Dependability Measures",
          subtitle: "Fault-Error-Failure chain, dependability attributes, formulas for MTTF, MTTR, MTBF, availability",
          fileName: "FTS Unit 1 – Study Guide.html",
          relativePath: "fault tolerance/FTS Unit 1 – Study Guide.html",
          readTime: "15 min",
          badge: "Foundations",
          sections: [
            "1. What is Fault Tolerance?",
            "2. Fault, Error and Failure: The Fundamental Causality Chain",
            "3. Fault Classification (Nature, Duration, Origin)",
            "4. Basic Measures of Fault Tolerance",
            "5. Dependable System Attributes (Reliability, Availability, Safety, Integrity, Maintainability)",
            "6. Four Techniques (Means) to Achieve Dependability (Prevention, Removal, Forecasting, Tolerance)",
            "7. Dependability Measures with Formulas (Failure rate lambda, MTTF, MTTR, MTBF, FIT)",
            "8. Quick Revision Cheat Sheet"
          ],
          keyFormulas: [
            "Reliability: R(t) = exp(-lambda * t)",
            "MTTF = 1 / lambda, MTBF = MTTF + MTTR",
            "Steady-State Availability: A = MTTF / (MTTF + MTTR) = mu / (mu + lambda)",
            "FIT (Failures in 10^9 hours) = 10^9 / MTTF"
          ],
          keywords: ["fault error failure", "dependability", "reliability", "availability", "safety", "integrity", "maintainability", "mttf", "mttr", "mtbf", "failure rate", "lambda", "fit"]
        },
        {
          id: "fts-u2",
          unitNum: 2,
          subjectId: "fault-tolerance",
          subjectCode: "FTS",
          subjectName: "Fault-Tolerant Systems",
          title: "Unit 2: Hardware Redundancy & Reliability Modeling",
          subtitle: "Failure rates, bathtub curve, series/parallel systems, TMR/NMR, standby redundancy & Byzantine faults",
          fileName: "Fault-Tolerant Systems – Unit 2 Made Easy.html",
          relativePath: "fault tolerance/Fault-Tolerant Systems – Unit 2 Made Easy.html",
          readTime: "22 min",
          badge: "Hardware & Reliability",
          sections: [
            "1. The big idea: Fault -> Error -> Failure",
            "2. Failure rate, lambda(t) and the Bathtub Curve",
            "3. Reliability, failure probability and how they connect",
            "4. MTTF, and MTTF vs MTBF calculations",
            "5. Canonical structures: series and parallel reliability",
            "6. Redundancy and resilient structures (TMR, NMR, k-out-of-n)",
            "7. Reliability evaluation techniques & Markov models",
            "8. Processor-level fault tolerance (Duplex, Pair-and-Spare)",
            "9. Standby redundancy (Cold, Warm, Hot standby)",
            "10. Byzantine failures & Byzantine Generals Problem",
            "11. Limits of redundancy (Common mode failure, Voter overhead)",
            "12. Revision: compare, map, formulas, definitions"
          ],
          keyFormulas: [
            "Series System: R_sys = prod R_i -> lambda_sys = sum lambda_i",
            "Parallel System: R_sys = 1 - prod (1 - R_i)",
            "TMR Reliability: R_TMR = 3*R^2 - 2*R^3",
            "Byzantine Fault Tolerance Condition: n >= 3m + 1"
          ],
          keywords: ["bathtub curve", "series system", "parallel system", "tmr", "nmr", "k-out-of-n", "markov model", "standby redundancy", "cold standby", "hot standby", "byzantine generals", "common mode"]
        },
        {
          id: "fts-u3",
          unitNum: 3,
          subjectId: "fault-tolerance",
          subjectCode: "FTS",
          subjectName: "Fault-Tolerant Systems",
          title: "Unit 3: Information Redundancy",
          subtitle: "Error detecting & correcting codes, parity, checksums, cyclic codes, RAID, and ABFT",
          fileName: "Information Redundancy – Easy Study Guide (FTS Unit 3).html",
          relativePath: "fault tolerance/Information Redundancy – Easy Study Guide (FTS Unit 3).html",
          readTime: "18 min",
          badge: "Coding & Storage",
          sections: [
            "The big idea: Detecting and correcting bit corruption",
            "1. Coding basics & Hamming Distance principles",
            "2. Parity codes (Simple parity & 2D cross-parity)",
            "3. Checksum algorithms (Internet 16-bit 1s complement, Fletcher)",
            "4. M-of-N codes for constant weight detection",
            "5. Berger code for unidirectional error detection",
            "6. Cyclic codes & CRC polynomial division",
            "7. Arithmetic codes (AN codes, Residue codes)",
            "8. Resilient disk systems (RAID 0, 1, 5, 6 parity schemes)",
            "9. Data replication & Quorum consensus",
            "10. Algorithm-Based Fault Tolerance (ABFT) in matrix computing",
            "Quick revision table"
          ],
          keyFormulas: [
            "Hamming Distance Bounds: d_min >= e + 1 (detect e errors), d_min >= 2t + 1 (correct t errors)",
            "RAID 5 Parity: P = D1 xor D2 xor D3",
            "RAID 6 Dual Parity: P (XOR) + Q (Reed-Solomon / Galois field)"
          ],
          keywords: ["information redundancy", "hamming distance", "parity", "2d parity", "checksum", "berger code", "m-of-n", "cyclic codes", "crc", "arithmetic codes", "raid", "abft"]
        },
        {
          id: "fts-u4",
          unitNum: 4,
          subjectId: "fault-tolerance",
          subjectCode: "FTS",
          subjectName: "Fault-Tolerant Systems",
          title: "Unit 4: Software Fault Tolerance",
          subtitle: "Single-version vs multi-version software fault tolerance, NVP, recovery blocks, rejuvenation",
          fileName: "unit 4 Software Fault Tolerance – Simple Study Guide.html",
          relativePath: "fault tolerance/unit 4 Software Fault Tolerance – Simple Study Guide.html",
          readTime: "17 min",
          badge: "Software Reliability",
          sections: [
            "1. Why software needs fault tolerance (Design faults vs random wear)",
            "2. Acceptance tests - noticing that something is wrong",
            "3. Single-version fault tolerance: defensive programming & wrappers",
            "4. Software rejuvenation - 'turn it off and on again' aging cure",
            "5. Data diversity - 'try a slightly different input' (retry/perturbation)",
            "6. N-version programming (NVP) - many teams, one voting consensus",
            "7. Recovery block (RB) - primary routine + alternates with acceptance test",
            "8. Preconditions, postconditions and assertions (Design by Contract)",
            "9. Exception handling architectures",
            "10. Software reliability models (Jelinski-Moranda, Musa)",
            "11. Fault-tolerant Remote Procedure Calls (RPC: at-least-once, at-most-once)"
          ],
          keyFormulas: [
            "N-Version Programming vs Recovery Block Comparison",
            "Jelinski-Moranda Model: lambda(t_i) = phi * [N - (i - 1)]",
            "Rejuvenation Schedule: Min Cost / Max Availability Interval"
          ],
          keywords: ["software fault tolerance", "acceptance test", "defensive programming", "software rejuvenation", "data diversity", "n-version programming", "nvp", "recovery block", "assertions", "reliability models", "rpc"]
        },
        {
          id: "fts-u5",
          unitNum: 5,
          subjectId: "fault-tolerance",
          subjectCode: "FTS",
          subjectName: "Fault-Tolerant Systems",
          title: "Unit 5: Checkpointing & Rollback Recovery",
          subtitle: "Checkpoint strategies, optimal intervals (Young & Daly formulas), distributed domino effect",
          fileName: "Checkpointing Made Simple_ FTS Unit 5.html",
          relativePath: "fault tolerance/Checkpointing Made Simple_ FTS Unit 5.html",
          readTime: "19 min",
          badge: "Recovery & State",
          sections: [
            "Why do we need checkpointing? Long-running tasks and MTBF",
            "What is checkpointing? State saving & rollback recovery",
            "Checkpoint levels: who does the saving? (App, Compiler, OS, HW)",
            "Optimal checkpointing: how many, and how far apart?",
            "Young's formula and Daly's higher-order formula",
            "Making checkpoints cheaper: incremental, copy-on-write, non-blocking",
            "Checkpointing in distributed systems & consistent global state",
            "The Domino Effect in uncoordinated checkpointing",
            "Coordinated checkpointing & Chandy-Lamport distributed snapshot",
            "Communication-induced checkpointing (CIC)",
            "Message logging: pessimistic, optimistic, and causal logging"
          ],
          keyFormulas: [
            "Young's Formula: T_opt = sqrt(2 * C * MTTF)",
            "Daly's Formula: T_opt = sqrt(2*C*MTTF + C^2) for higher failure rates",
            "Overhead Ratio: Overhead = (C / T) + (T / (2 * MTTF))"
          ],
          keywords: ["checkpointing", "rollback recovery", "young formula", "daly formula", "incremental checkpoint", "copy on write", "domino effect", "chandy-lamport", "coordinated checkpoint", "message logging"]
        }
      ]
    },
    {
      id: "software-defined-networks",
      code: "SDN",
      name: "Software Defined Networks",
      shortTitle: "SDN",
      accent: "#0ea5e9",
      accentDark: "#38bdf8",
      accentBg: "rgba(14, 165, 233, 0.12)",
      borderColor: "rgba(14, 165, 233, 0.35)",
      badgeColor: "#0284c7",
      icon: "network",
      summary: "Decoupling control and data planes, OpenFlow protocol, SDN controllers, NFV, slicing, ONOS architecture, and security use-cases.",
      units: [
        {
          id: "sdn-u1",
          unitNum: 1,
          subjectId: "software-defined-networks",
          subjectCode: "SDN",
          subjectName: "Software Defined Networks",
          title: "Unit 1: Genesis, Evolution & Architecture",
          subtitle: "Traditional network ossification, plane separation, SDN origin, and Mininet hands-on",
          fileName: "SDN Unit 1 – Easy Study Guide.html",
          relativePath: "software defined networks/SDN Unit 1 – Easy Study Guide.html",
          readTime: "16 min",
          badge: "Genesis & Mininet",
          sections: [
            "0. Start here: words you must know first (Control vs Data vs Management plane)",
            "Topic 1: Introduction & Evolution of SDN",
            "Topic 2: Need for SDN: combating internet ossification & vendor lock-in",
            "Topic 3: Centralized & Distributed Control and Data Planes",
            "Topic 4: The Genesis of SDN: Clean Slate program & Stanford Ethane",
            "Topic 5: Mininet: Virtual SDN testbed & Python topology creation"
          ],
          keyFormulas: [
            "SDN Triad: Decoupled Control/Data + Logically Centralized Controller + Open Interfaces",
            "Plane Responsibilities: Data Plane (Forwarding packets) vs Control Plane (Route determination)",
            "Mininet commands: mn --topo single,3 --controller remote"
          ],
          keywords: ["sdn", "ossification", "control plane", "data plane", "management plane", "clean slate", "ethane", "mininet", "centralized controller", "open interfaces"]
        },
        {
          id: "sdn-u2",
          unitNum: 2,
          subjectId: "software-defined-networks",
          subjectCode: "SDN",
          subjectName: "Software Defined Networks",
          title: "Unit 2: Abstractions, OpenFlow & Controllers",
          subtitle: "OpenFlow pipeline, flow tables, match-actions, POX/Ryu/ODL/ONOS, SDN interfaces",
          fileName: "SDN Unit 2 – Simple Study Guide.html",
          relativePath: "software defined networks/SDN Unit 2 – Simple Study Guide.html",
          readTime: "21 min",
          badge: "OpenFlow & Controllers",
          sections: [
            "Topic I: How SDN Works & the OpenFlow Protocol (Flow table, Pipeline processing)",
            "Flow table entries: Match fields, Counters, Instructions & Actions",
            "OpenFlow Core Messages: Packet-In, Packet-Out, Flow-Mod, Port-Status",
            "Topic II: SDN Controllers: Concepts, VMware NSX, Nicira heritage",
            "Topic III: The Different Controllers (POX, Ryu, OpenDaylight, ONOS, Floodlight)",
            "Topic IV: Building Custom Topologies with Mininet Python scripts",
            "Topic V: Interfaces: Northbound (REST/Intent), Southbound (OpenFlow), East/West"
          ],
          keyFormulas: [
            "Flow Table Entry: [Match Fields | Priority | Counters | Instructions | Timeouts | Cookie]",
            "OpenFlow Pipeline: Table 0 -> Table 1 -> ... Table N (Go-to Table instruction)",
            "Interfaces: Southbound (Controller <-> Switch), Northbound (App <-> Controller)"
          ],
          keywords: ["openflow", "flow table", "packet-in", "packet-out", "flow-mod", "pox", "ryu", "opendaylight", "onos", "northbound", "southbound", "east-west"]
        },
        {
          id: "sdn-u3",
          unitNum: 3,
          subjectId: "software-defined-networks",
          subjectCode: "SDN",
          subjectName: "Software Defined Networks",
          title: "Unit 3: Programmable Networks, NFV & Slicing",
          subtitle: "P4 language, Network Function Virtualization architecture, NetApps, and 5G network slicing",
          fileName: "Unit 3 Study Guide_ Programmable Networks and NFV.html",
          relativePath: "software defined networks/Unit 3 Study Guide_ Programmable Networks and NFV.html",
          readTime: "18 min",
          badge: "NFV & Programmability",
          sections: [
            "Topic I: Network Programmability & Data Plane Evolution (P4 language, YANG, NETCONF)",
            "Topic II: Network Function Virtualization (NFV) Concepts & Architecture",
            "ETSI NFV Framework: NFVI (Infrastructure), VNFs, NFV MANO (Orchestration)",
            "SDN vs NFV Comparison & Joint Synergy",
            "Topic III: NetApp Development & Service Function Chaining (SFC)",
            "Network Slicing in 5G & Multi-Tenant Resource Partitioning",
            "Topic IV: ONOS Deployment in Telecoms",
            "Topic V: OPNFV: Open Platform for NFV"
          ],
          keyFormulas: [
            "SDN vs NFV: SDN separates control/data; NFV moves network middleboxes into VMs/containers",
            "NFV MANO: NFV Orchestrator (NFVO) + VNF Manager (VNFM) + Virtualized Infrastructure Manager (VIM)",
            "Service Function Chaining: Ingress -> Firewall -> IDS -> NAT -> Egress"
          ],
          keywords: ["network programmability", "p4", "yang", "netconf", "nfv", "vnf", "mano", "nfvi", "vim", "service chaining", "network slicing", "opnfv"]
        },
        {
          id: "sdn-u4",
          unitNum: 4,
          subjectId: "software-defined-networks",
          subjectCode: "SDN",
          subjectName: "Software Defined Networks",
          title: "Unit 4: Deployments, Applications & ONOS",
          subtitle: "Data centers (Leaf-Spine, VXLAN), SD-WAN, Google B4, traffic engineering, ONOS intents",
          fileName: "SDN Unit 4 – Simple Study Guide.html",
          relativePath: "software defined networks/SDN Unit 4 – Simple Study Guide.html",
          readTime: "19 min",
          badge: "Data Center & WAN",
          sections: [
            "SDN in the Data Center: Leaf-Spine Clos topology vs Traditional Core-Agg-Access",
            "Overlay Networks & Encapsulation (VXLAN, NVGRE, Geneve)",
            "SDN in Other Environments: Enterprise WAN (SD-WAN) & Campus/Wireless",
            "Google B4: World's first large-scale SDN WAN deployment with near 100% link utilization",
            "SDN Applications: Dynamic Traffic Engineering, QoS, Path Optimization",
            "SDN Use Cases: Disaster Recovery, Bandwidth on Demand (BoD)",
            "ONOS Deep Dive: Open Network Operating System, Distributed Core, Intent Framework",
            "Quick glossary & exam recap"
          ],
          keyFormulas: [
            "Leaf-Spine: Every Leaf switch connects to every Spine switch (constant 2-hop east-west latency)",
            "VXLAN Encapsulation: 24-bit VNI allows up to 16 million virtual layer-2 segments",
            "Google B4 WAN Architecture: OpenFlow switches + Centralized TE Controller"
          ],
          keywords: ["data center", "leaf spine", "vxlan", "overlay network", "vni", "sd-wan", "google b4", "traffic engineering", "onos", "intent framework", "disaster recovery"]
        },
        {
          id: "sdn-u5",
          unitNum: 5,
          subjectId: "software-defined-networks",
          subjectCode: "SDN",
          subjectName: "Software Defined Networks",
          title: "Unit 5: Open Source, Security & Network Services",
          subtitle: "Open vSwitch, Stratum, SDN security risks, reactive firewalls, load balancing",
          fileName: "Unit 5 – SDN Open Source, Security & Services_ Easy Study Guide.html",
          relativePath: "software defined networks/Unit 5 – SDN Open Source, Security & Services_ Easy Study Guide.html",
          readTime: "18 min",
          badge: "Open Source & Security",
          sections: [
            "Topic I: SDN Open Source Ecosystem (Open vSwitch, FD.io, Stratum, Mininet) & Future Trends",
            "Intent-Based Networking (IBN) & AI/ML-driven network optimization",
            "Topic II: SDN Security Architecture: Strengths and Emerging Threat Vectors",
            "Centralized Controller as Single Point of Failure & Flow Table Saturation Attacks",
            "DDoS Detection and Dynamic Mitigation with Controller Telemetry",
            "Topic III: Switching and Dynamic Load Balancers using SDN Flow Entries",
            "Topic IV: Flow-based Firewalls & Dynamic Access Control Lists (ACLs)",
            "Topic V: Use Cases in Legacy Network Security & Hybrid Network Migration",
            "Short forms quick list"
          ],
          keyFormulas: [
            "Flow Saturation Attack: Flood with random spoofed packets -> generates endless Packet-In messages",
            "SDN Load Balancer: Controller rewrites destination IP & MAC to backend server pool",
            "SDN Firewall: Reactive rule insertion with stateful timeout expiration"
          ],
          keywords: ["open vswitch", "ovs", "stratum", "intent-based networking", "sdn security", "flow saturation", "ddos", "load balancer", "firewall", "access control", "legacy integration"]
        }
      ]
    }
  ],

  // Rapid formula & concept cheat-sheets for quick exam glance
  cheatSheets: [
    {
      category: "Fault-Tolerant Systems Formulas",
      items: [
        { name: "Failure Rate & Reliability", formula: "R(t) = e^(-lambda * t)", desc: "For constant failure rate lambda in useful life phase." },
        { name: "Mean Time To Failure (MTTF)", formula: "MTTF = 1 / lambda = int_0^inf R(t) dt", desc: "Average operational duration before the first failure." },
        { name: "Mean Time Between Failures", formula: "MTBF = MTTF + MTTR", desc: "Total cycle duration: operational time plus repair time." },
        { name: "Steady-State Availability", formula: "A = MTTF / (MTTF + MTTR) = mu / (lambda + mu)", desc: "Probability system is up at any random time." },
        { name: "Failures In Time (FIT)", formula: "FIT = 10^9 / MTTF", desc: "Number of failures observed across 1 billion operating hours." },
        { name: "Series System Reliability", formula: "R_sys = prod R_i  ==>  lambda_sys = sum lambda_i", desc: "System fails if any single component fails." },
        { name: "Parallel System Reliability", formula: "R_sys = 1 - prod (1 - R_i)", desc: "System operates as long as at least one component functions." },
        { name: "TMR System Reliability", formula: "R_TMR = 3*R^2 - 2*R^3", desc: "Triple modular redundancy with 2-out-of-3 majority voter." },
        { name: "Young's Checkpointing Interval", formula: "T_opt = sqrt(2 * C * MTTF)", desc: "Optimal checkpoint period balancing checkpoint cost C with recovery cost." },
        { name: "Byzantine Generals Agreement", formula: "n >= 3m + 1", desc: "Required nodes n to safely handle m malicious or arbitrary faulty nodes." },
        { name: "Hamming Distance Capability", formula: "d_min >= e + 1 (detect), d_min >= 2t + 1 (correct)", desc: "Detects e single bit errors, corrects t single bit errors." }
      ]
    },
    {
      category: "Computer Vision Formulations",
      items: [
        { name: "Hough Line Polar Form", formula: "rho = x*cos(theta) + y*sin(theta)", desc: "Overcomes infinite slope problem of Cartesian y = mx + c." },
        { name: "2D Spatial Convolution", formula: "g(x,y) = sum_i sum_j f(x-i, y-j) * h(i,j)", desc: "Kernel h flipped and slid across image f." },
        { name: "Harris Corner Matrix", formula: "M = sum [Ix^2, Ix*Iy; Ix*Iy, Iy^2]", desc: "Second moment matrix capturing intensity gradients." },
        { name: "Harris Corner Response", formula: "R = det(M) - k * (trace(M))^2", desc: "Corner if R > threshold, Edge if R < -threshold, Flat if |R| is small." },
        { name: "Perspective Projection", formula: "x = f * (X / Z),  y = f * (Y / Z)", desc: "Pinhole camera mapping 3D scene point (X,Y,Z) to 2D image (x,y)." },
        { name: "Optical Flow Constraint", formula: "Ix * u + Iy * v + It = 0", desc: "Brightness constancy assumption for pixel velocity (u, v)." },
        { name: "Viola-Jones Integral Image", formula: "II(x,y) = sum_{x'<=x, y'<=y} i(x',y')", desc: "Allows calculating any rectangular box sum in exactly 4 array lookups." },
        { name: "Eigenfaces Covariance", formula: "C = (1/M) sum Phi_i * (Phi_i)^T", desc: "Principal component analysis (PCA) eigenspace projection for faces." }
      ]
    },
    {
      category: "Software Defined Networks Key Principles",
      items: [
        { name: "Decoupled Architecture", formula: "Control Plane != Data Plane", desc: "Moves routing intelligence to centralized software controller; switches forward dumbly." },
        { name: "OpenFlow Flow Tuple", formula: "[Match Fields | Priority | Counters | Actions | Timeouts]", desc: "Exact lookup entry inside OpenFlow ternary content-addressable memory (TCAM)." },
        { name: "OpenFlow Message Types", formula: "Packet-In (Miss), Packet-Out (Send), Flow-Mod (Rule Update)", desc: "Standard southbound protocol conversation between switch and controller." },
        { name: "NFV Architecture (ETSI)", formula: "NFVI + VNFs + NFV-MANO (NFVO, VNFM, VIM)", desc: "Decouples network functions (firewalls, routers) from dedicated proprietary hardware." },
        { name: "Data Center Clos Fabric", formula: "Leaf-Spine 2-Tier Topology", desc: "Predictable, equal-cost multipath (ECMP) east-west bandwidth with low latency." },
        { name: "VXLAN Virtual Segment", formula: "24-bit VNI = 16,777,216 distinct overlay VXLANs", desc: "Encapsulates layer 2 Ethernet frames within standard UDP (port 4789) packets." }
      ]
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.STUDY_DATA = STUDY_DATA;
}
