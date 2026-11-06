// All site content lives here. Edit this file to update the portfolio.
const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`;
const gh = (r: string) => `https://github.com/shivamd2502/${r}`;
const ghFile = (r: string, path: string) => `https://github.com/shivamd2502/${r}/blob/main/${path}`;

export const profile = {
  name: "Shivam Dapkekar",
  keywords: ["Applied AI", "AI Vision Research", "Multimodal · VLM / VLA"],
  tagline: "I research and build AI that sees and understands: computer vision, vision-language models and multimodal learning, taken from idea to working system.",
  links: {
    email: "mailto:shivamdapkekar25@gmail.com",
    emailText: "shivamdapkekar25@gmail.com",
    github: "https://github.com/shivamd2502",
    linkedin: "https://www.linkedin.com/in/shivam-dapkekar-370980292/",
    x: "https://x.com/shivam_d2502",
    scholar: "https://scholar.google.com/citations?user=zGBbdiYAAAAJ&hl=en",
  },
};

export const education = {
  school: "Vishwakarma Institute of Technology, Pune",
  degree: "B.Tech, Instrumentation & Control Engineering",
  years: "2023 – 2027",
  score: "CPI 8.81 / 10",
};

export const stats = [
  { value: "4", label: "IEEE papers" },
  { value: "6", label: "Open-source research projects" },
  { value: "2", label: "Research & industry internships" },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  place?: string;
  summary: string;
  points: string[];
  tags: string[];
  link?: { label: string; href: string };
};

export const experience: Experience[] = [
  {
    role: "AI & Computer Vision Intern",
    org: "Biorad Medisys",
    period: "Aug 2026 – Present",
    summary: "AI visual inspection of DJ (double-J) ureteral stents: the system watches the stent under a Dino-Lite microscope and decides ACCEPTED / REJECTED.",
    points: [
      "Built the end-to-end inspection pipeline: microscope video → sharp-frame extraction every ~2 mm → mask transfer → per-region classification → accept / reject decision.",
      "Designed two quality checks: depth-marker spacing across 11 regions and drainage-hole positions across 5 regions to a ±0.5 mm tolerance. A stent passes only if all 16 regions pass.",
      "Developed position-independent mask transfer: a reference mask anchored on the first marker, with the best-centred frame selected for every region.",
      "Trained EfficientNet-B0 classifiers for the marker and hole regions on mask overlays, with a tolerance-aware hole mask.",
      "Calibrated the vision metrology at 67.5 px/mm (8 mm field of view) and optimised inspection to ~4–6 s per stent on a standard CPU.",
      "Delivered an inspection app with per-region overlays and confidence scores, and built a stitching + synthetic conveyor-video pipeline (SIFT / RANSAC) to test the system before the conveyor line exists.",
    ],
    tags: ["PyTorch", "EfficientNet-B0", "OpenCV", "Metrology", "Quality inspection"],
  },
  {
    role: "Research Intern",
    org: "ISRO EOS-04 SAR Research Project",
    period: "May 2026 – Present",
    place: "Remote",
    summary: "Deep learning on ISRO EOS-04 satellite radar imagery.",
    points: [
      "Implemented the ISRO-documented radiometric calibration (β⁰ / σ⁰ / γ⁰, incidence-angle correction, noise-bias removal, layover/shadow masking) for 160 km scenes.",
      "Built a QGIS patch-generation and labelling pipeline: ~1,000 to 11,700 georeferenced patches across 4 patch sizes.",
      "Designed a multi-input EfficientNet-B0 + MLP that fuses image features with calibrated physical descriptors.",
      "Delivered full-scene inference to georeferenced GeoTIFF maps, plus a U-Net pixel-level segmentation model.",
    ],
    tags: ["PyTorch", "EfficientNet", "U-Net", "Multi-input fusion"],
    link: { label: "View repository", href: gh("EOS04-SAR-Land-Cover-Classification") },
  },
];

export type Doc = { label: string; href: string; kind: "paper" | "report" | "slides" | "docs" };

export type Project = {
  slug: string;
  title: string;
  repo: string;
  image: string;
  imageAlt: string;
  poster?: string; // optional AI-generated poster in public/posters/<slug>.webp
  category: string;
  summary: string;
  problem: string;
  highlights: string[];
  metric: { value: string; label: string };
  tags: string[];
  venue?: string;
  fit?: "cover" | "contain"; // "contain" for charts/diagrams so nothing is cropped
  workflow: { step: string; detail: string }[];
  whatWeDid: string[];
  docs: Doc[];
  paperStatus?: string;
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "clip-peft-land-cover",
    title: "Land-Cover CLIP PEFT & Image Search",
    repo: gh("Land-Cover-CLIP-PEFT-Image-Search"),
    image: img("clip_app"),
    imageAlt: "Desktop app for text-to-image search powered by CLIP",
    category: "Vision-Language Models · PEFT",
    summary:
      "Parameter-efficient fine-tuning of CLIP (ViT-B/32) for satellite scene understanding, plus a desktop app that searches image folders with natural-language queries.",
    problem:
      "Fully fine-tuning a vision-language model is slow and expensive, and searching thousands of images by meaning, not file names, needs a fast shared text-image embedding space.",
    highlights: [
      "Frozen CLIP backbone with a small trainable adapter",
      "Joint contrastive + classification objective",
      "Embedding index for instant text-to-image retrieval",
    ],
    metric: { value: "< 1 %", label: "of CLIP's parameters trained" },
    tags: ["CLIP", "ViT-B/32", "PEFT", "VLM", "Retrieval"],
    venue: "IEEE OTCON'26",
    workflow: [
      { step: "Images + class prompts", detail: "satellite scenes paired with text descriptions" },
      { step: "Frozen CLIP encoders", detail: "ViT-B/32 image encoder and text encoder kept fixed" },
      { step: "Lightweight adapter", detail: "small trainable head on top of CLIP features" },
      { step: "Joint loss", detail: "contrastive alignment + classification" },
      { step: "Embedding index", detail: "pre-computed image embeddings" },
      { step: "Text-to-image search", detail: "desktop app ranks images for any query" },
    ],
    whatWeDid: [
      "Adapted CLIP to a new domain while training only a tiny fraction of its parameters.",
      "Designed a combined contrastive + classification objective so the model keeps CLIP's language alignment.",
      "Benchmarked fine-tuned vs zero-shot CLIP with retrieval metrics (Recall@K, MRR, mAP).",
      "Built and shipped a desktop app for natural-language image search over local folders.",
    ],
    docs: [
      { label: "Methodology", href: ghFile("Land-Cover-CLIP-PEFT-Image-Search", "docs/METHODOLOGY.md"), kind: "docs" },
      { label: "Results", href: ghFile("Land-Cover-CLIP-PEFT-Image-Search", "docs/RESULTS.md"), kind: "docs" },
    ],
    paperStatus: "Published · IEEE OTCON 2026",
    gallery: [
      { src: img("clip_confusion"), alt: "Fine-tuned model on the test split" },
    ],
  },
  {
    slug: "xray-stitching",
    title: "Automated X-ray Image Stitching",
    repo: gh("Automated-X-ray-Stitching"),
    image: img("xray_comparison"),
    imageAlt: "Stitched X-ray compared with the original",
    category: "Medical Imaging · Computer Vision",
    summary:
      "Builds one panoramic X-ray from overlapping shots with SIFT + FLANN matching, RANSAC homography and alpha feathering, checked against ground truth.",
    problem:
      "A single X-ray detector cannot capture long anatomy such as the full spine or legs in one exposure. Clinicians need the pieces fused into one seamless, geometrically correct image.",
    highlights: [
      "Split-and-restitch benchmark with ground truth",
      "SSIM, VIF and UIQI image-quality metrics",
      "Seamless blending with automatic overlap direction",
    ],
    metric: { value: "0.07 s", label: "per stitch at 224 × 224" },
    tags: ["OpenCV", "SIFT", "FLANN", "RANSAC", "Homography"],
    venue: "IEEE 2025",
    workflow: [
      { step: "Pre-processing", detail: "grayscale + histogram equalisation" },
      { step: "SIFT keypoints", detail: "up to 2,000 features per image" },
      { step: "FLANN matching", detail: "k-NN + Lowe ratio test (0.75)" },
      { step: "RANSAC homography", detail: "robust 3×3 transform, 5 px threshold" },
      { step: "Warp & blend", detail: "expanded canvas + alpha feathering" },
      { step: "Quality check", detail: "SSIM / VIF / UIQI vs the uncut original" },
    ],
    whatWeDid: [
      "Implemented the full classical pipeline and a CLI with tunable matching and RANSAC settings.",
      "Found and fixed a blending-direction bug that left a visible seam when inputs came in reverse order.",
      "Created a split-and-restitch benchmark (24 images, 48 runs) with true ground truth.",
      "Measured runtime from 224² to 1024² to show the pipeline is fast enough for interactive use.",
    ],
    docs: [
      { label: "Project report (PDF)", href: ghFile("Automated-X-ray-Stitching", "docs/XIMS_Report_methodology_and_code.pdf"), kind: "report" },
      { label: "Methodology", href: ghFile("Automated-X-ray-Stitching", "docs/METHODOLOGY.md"), kind: "docs" },
      { label: "Results", href: ghFile("Automated-X-ray-Stitching", "docs/RESULTS.md"), kind: "docs" },
    ],
    paperStatus: "Published · IEEE 2025",
    gallery: [
      { src: img("xray_matches"), alt: "SIFT feature matches between the two shots" },
      { src: img("xray_steps"), alt: "Every stage of the pipeline" },
    ],
  },
  {
    slug: "eos04-sar-deep-learning",
    title: "EOS-04 Satellite Imagery Deep Learning",
    repo: gh("EOS04-SAR-Land-Cover-Classification"),
    image: img("sar_cover"),
    imageAlt: "Calibrated EOS-04 satellite radar composite",
    category: "Multi-input Deep Learning · Vision",
    summary:
      "From raw ISRO EOS-04 radar imagery to georeferenced maps: physics-correct calibration, a multi-input CNN that fuses image and physical features, and U-Net segmentation.",
    problem:
      "Raw radar pixels are not physical measurements, and steep terrain mimics man-made structures. A model needs both correct physics and extra context to tell them apart, with no labelled ground truth available.",
    highlights: [
      "Calibration implemented from the ISRO sensor documentation",
      "EfficientNet-B0 + feature MLP fusion; four patch sizes compared",
      "Controlled ablation with McNemar's test",
    ],
    metric: { value: "160 km", label: "satellite scenes, end-to-end" },
    tags: ["PyTorch", "EfficientNet-B0", "U-Net", "Multi-input fusion"],
    workflow: [
      { step: "Raw EOS-04 Level-2B", detail: "HH + HV radar, incidence angle, masks" },
      { step: "Calibration", detail: "β⁰ / σ⁰ / γ⁰ from ISRO equations 1–15" },
      { step: "Composites & patches", detail: "3-channel images, 64–256 px grid" },
      { step: "Labelling", detail: "physics rule + QGIS review" },
      { step: "Multi-input CNN", detail: "EfficientNet-B0 ⊕ feature MLP" },
      { step: "Maps & segmentation", detail: "GeoTIFF class maps + U-Net" },
    ],
    whatWeDid: [
      "Implemented the sensor's calibration chain exactly as documented, including noise-bias removal and layover/shadow masking.",
      "Turned 160 km scenes into labelled patch datasets with georeferenced shapefiles for review.",
      "Designed a two-branch network that fuses CNN image features with calibrated physical descriptors.",
      "Ran a controlled ablation (SAR-only vs SAR + terrain) with McNemar's significance test.",
      "Produced full-scene georeferenced maps and a pixel-level U-Net segmentation model.",
    ],
    docs: [
      { label: "Pipeline", href: ghFile("EOS04-SAR-Land-Cover-Classification", "docs/PIPELINE.md"), kind: "docs" },
      { label: "Results", href: ghFile("EOS04-SAR-Land-Cover-Classification", "docs/RESULTS.md"), kind: "docs" },
      { label: "Calibration formulas", href: ghFile("EOS04-SAR-Land-Cover-Classification", "docs/EOS04_CALIBRATION_FORMULAS.md"), kind: "docs" },
    ],
    paperStatus: "Manuscript in preparation",
    gallery: [
      { src: img("sar_map"), alt: "Full-scene class map" },
      { src: img("sar_unet"), alt: "U-Net segmentation example" },
      { src: img("sar_composites"), alt: "Raw baseline vs calibrated composites" },
    ],
  },
  {
    slug: "iot-intrusion-detection",
    title: "IoT Intrusion Detection with Elastic Deep Autoencoder",
    repo: gh("IoT-Intrusion-Detection-Elastic-Autoencoder"),
    image: img("ids_confusion"),
    imageAlt: "Detection results of the intrusion detector",
    category: "Representation Learning · Security",
    summary:
      "Learns compact latent features of IoT network traffic with an Elastic Deep Autoencoder and combines them with reconstruction error for LR / RF / MLP attack detection on CICIoT2023.",
    problem:
      "IoT traffic is high-dimensional and attack patterns keep changing. Detectors need compact, robust representations instead of hand-picked raw features.",
    highlights: [
      "32-d latent code + reconstruction-error feature",
      "Elastic regularisation on the latent space",
      "Compared against a raw-feature baseline",
    ],
    metric: { value: "32-d", label: "learned latent representation" },
    tags: ["PyTorch", "Autoencoder", "Representation learning", "CICIoT2023"],
    venue: "IEEE OTCON'25",
    fit: "contain",
    workflow: [
      { step: "CICIoT2023 traffic", detail: "flow features, attack vs benign" },
      { step: "Clean & balance", detail: "class balancing, stratified split, scaling" },
      { step: "Elastic autoencoder", detail: "input → 256 → 128 → 32 latent" },
      { step: "Hybrid features", detail: "latent code ⊕ reconstruction error" },
      { step: "Classifiers", detail: "Logistic Regression, Random Forest, MLP" },
    ],
    whatWeDid: [
      "Designed an autoencoder with an elastic penalty that keeps the latent space compact and stable.",
      "Combined latent features with reconstruction error so anomalies stand out.",
      "Benchmarked three classifiers on learned vs raw features.",
      "Packaged the pipeline as tested, configurable scripts.",
    ],
    docs: [
      { label: "Methodology", href: ghFile("IoT-Intrusion-Detection-Elastic-Autoencoder", "docs/METHODOLOGY.md"), kind: "docs" },
      { label: "Results", href: ghFile("IoT-Intrusion-Detection-Elastic-Autoencoder", "docs/RESULTS.md"), kind: "docs" },
    ],
    paperStatus: "Published · IEEE OTCON 2025",
    gallery: [{ src: img("ids_loss"), alt: "Autoencoder training loss" }],
  },
  {
    slug: "hybrid-network-fault-diagnosis",
    title: "Hybrid Network Fault Diagnosis",
    repo: gh("Hybrid-Network-Fault-Diagnosis"),
    image: img("net_architecture"),
    imageAlt: "Architecture of the hybrid diagnosis system",
    category: "ML + Expert Systems",
    summary:
      "Diagnoses network faults by fusing a TF-IDF + Random Forest model with RFC-grounded expert rules through Bayesian fusion and entropy-based uncertainty, served as a Streamlit app.",
    problem:
      "Network troubleshooting mixes free-text symptoms with protocol knowledge. Pure ML is a black box and pure rules are brittle, so engineers need both, with a confidence they can trust.",
    highlights: [
      "Bayesian fusion of ML and rule-based evidence",
      "Entropy-based uncertainty and rule audit trail",
      "Interactive Streamlit troubleshooting app",
    ],
    metric: { value: "8", label: "fault classes, explainable diagnosis" },
    tags: ["TF-IDF", "Random Forest", "Expert rules", "Bayesian fusion"],
    venue: "IEEE KALINGACONF'26",
    fit: "contain",
    workflow: [
      { step: "Symptoms", detail: "free text + binary flags + metrics" },
      { step: "ML branch", detail: "TF-IDF + Random Forest probabilities" },
      { step: "Rule branch", detail: "8 RFC-grounded priority rules" },
      { step: "Uncertainty", detail: "entropy, mutual information, tree variance" },
      { step: "Bayesian fusion", detail: "consensus / override / weighted average" },
      { step: "Diagnosis", detail: "fault, confidence, fix suggestions" },
    ],
    whatWeDid: [
      "Built a data-driven branch and a knowledge-driven branch and fused them probabilistically.",
      "Added predictive-entropy uncertainty so low-confidence cases are flagged.",
      "Made every decision explainable through rule traces.",
      "Deployed the system as an interactive Streamlit app with troubleshooting recommendations.",
    ],
    docs: [
      { label: "Math & architecture (PDF)", href: ghFile("Hybrid-Network-Fault-Diagnosis", "docs/Hybrid_Diagnostic_System_Math_Architecture.pdf"), kind: "report" },
    ],
    paperStatus: "IEEE KALINGACONF 2026 · accepted, publication pending",
    gallery: [{ src: img("net_confusion"), alt: "Model evaluation" }],
  },
  {
    slug: "rl-active-suspension",
    title: "RL Active Suspension Control",
    repo: gh("RL-Active-Suspension-Control"),
    image: img("rl_reward"),
    imageAlt: "Training reward of DDPG, TD3 and SAC",
    category: "Reinforcement Learning · Control",
    summary:
      "Trains SAC, DDPG and TD3 agents to control a quarter-car active suspension on ISO 8608 road profiles and benchmarks them against a passive suspension.",
    problem:
      "Passive suspensions trade ride comfort against road holding and cannot adapt to road roughness. Can a model-free RL agent learn an active policy that does better?",
    highlights: [
      "Quarter-car model with ISO 8608 road classes B–E",
      "Three deep-RL agents compared",
      "SAC gives the best ride comfort",
    ],
    metric: { value: "20–35%", label: "lower body velocity vs passive" },
    tags: ["Deep RL", "SAC", "TD3", "DDPG", "PyTorch"],
    fit: "contain",
    workflow: [
      { step: "Quarter-car model", detail: "sprung / unsprung masses, actuator force" },
      { step: "Road profiles", detail: "ISO 8608 classes B–E" },
      { step: "RL environment", detail: "comfort + handling reward" },
      { step: "Agents", detail: "SAC, DDPG, TD3" },
      { step: "Evaluation", detail: "body velocity / acceleration vs passive" },
    ],
    whatWeDid: [
      "Built a simulation environment for a quarter-car with standard road roughness profiles.",
      "Trained and compared three continuous-control deep-RL algorithms.",
      "Showed SAC reduces body velocity by 20–35 % and acceleration by 9–12 % versus passive.",
      "Wrote the study up as a paper and slides.",
    ],
    docs: [
      { label: "Paper (PDF)", href: ghFile("RL-Active-Suspension-Control", "docs/paper/DDPG_vs_SAC_Active_Suspension_paper.pdf"), kind: "paper" },
      { label: "Slides (PDF)", href: ghFile("RL-Active-Suspension-Control", "docs/paper/DDPG_vs_SAC_Active_Suspension_slides.pdf"), kind: "slides" },
    ],
    gallery: [{ src: img("rl_comparison"), alt: "Suspension response comparison" }],
  },
];

export type Publication = {
  title: string;
  venue: string;
  status: "Published" | "Accepted" | "In preparation";
  note?: string;
  code?: string;
  link?: string; // IEEE Xplore / DOI link when available
};

export const publications: Publication[] = [
  {
    title: "Scalable Land Cover Classification using Parameter-Efficient Vision-Language Models",
    venue: "IEEE OTCON 2026",
    status: "Published",
    code: gh("Land-Cover-CLIP-PEFT-Image-Search"),
  },
  {
    title: "Hybrid Bayesian Network Fault Diagnosis using ML and Expert Systems",
    venue: "IEEE KALINGACONF 2026",
    status: "Accepted",
    note: "To appear in IEEE Xplore",
    code: gh("Hybrid-Network-Fault-Diagnosis"),
  },
  {
    title: "Elastic Deep Autoencoder-Based Hybrid Intrusion Detection System for IoT Networks",
    venue: "IEEE OTCON 2025",
    status: "Published",
    code: gh("IoT-Intrusion-Detection-Elastic-Autoencoder"),
  },
  {
    title: "Automated X-ray Image Stitching for Enhanced Medical Diagnostics and Visualization",
    venue: "IEEE, 2025",
    status: "Published",
    code: gh("Automated-X-ray-Stitching"),
  },
  {
    title: "Multi-Input EfficientNet for Land Cover Classification Using EOS-04 SAR Level-2B Data",
    venue: "ISRO EOS-04 research project",
    status: "In preparation",
    note: "Manuscript in preparation",
    code: gh("EOS04-SAR-Land-Cover-Classification"),
  },
];

export type Extra = { title: string; kind: string; text: string; href?: string; badge?: string };

export const extras: Extra[] = [
  {
    title: "Kaggle · Image Matching Challenge 2025",
    kind: "Competition",
    badge: "Rank 283 / 5,606",
    text: "Kaggle's 2025 challenge on reconstructing 3-D scenes from unordered image collections. Finished 283rd of 5,606 entries (top ~5 %).",
    href: gh("IMC-25"),
  },
  {
    title: "LLM_Complete",
    kind: "Deep dive",
    badge: "From scratch",
    text: "LLM building blocks implemented in PyTorch: tokenizer, self-attention, multi-head attention and a GPT-style transformer, following Sebastian Raschka's guide.",
    href: gh("LLM_Complete"),
  },
  {
    title: "Paper Implementations",
    kind: "Research code",
    badge: "PyTorch",
    text: "Research papers re-implemented from scratch to understand architectures in depth.",
    href: gh("Paper-Implementations"),
  },
  {
    title: "Fingerprint Classification Dataset",
    kind: "Open dataset · Kaggle",
    badge: "1,000 images",
    text: "Open-sourced 1,000 fingerprint images hand-annotated in Label Studio across 5 pattern classes.",
  },
  {
    title: "Atmabodh – Digital Literacy Program",
    kind: "Volunteering",
    badge: "Community",
    text: "Taught digital skills to elderly people, homemakers and under-privileged children.",
  },
];

export const interests = ["Applied AI", "AI Vision Research", "Multimodal Learning", "Vision-Language Models (VLM)", "Vision-Language-Action (VLA)", "Computer Vision Research"];

export const skills: { group: string; items: string[] }[] = [
  { group: "AI / ML", items: ["PyTorch", "scikit-learn", "Transfer learning", "PEFT", "Representation learning", "Deep RL (SAC, TD3, DDPG)"] },
  { group: "Vision & Multimodal", items: ["CLIP / ViT", "Vision-language models", "EfficientNet", "U-Net", "Segmentation", "Retrieval"] },
  { group: "Computer Vision", items: ["OpenCV", "SIFT / FLANN / RANSAC", "Image stitching", "Metrology", "Label Studio"] },
  { group: "Tools", items: ["Git & GitHub", "Kaggle", "MATLAB / Simulink", "VS Code", "Linux"] },
];
