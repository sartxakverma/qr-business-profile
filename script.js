const scanButton = document.getElementById("scanBtn");
const demoButton = document.getElementById("demoBtn");
const statusMessage = document.getElementById("status");
const profileSection = document.getElementById("profileSection");
const profileCard = document.getElementById("profile");

let scanner;
let isScanning = false;

const demoApiUrl = "https://jsonplaceholder.typicode.com/users/1";

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status ${type}`;
}

function cleanUrl(value) {
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) throw new Error();
    return url.href;
  } catch {
    return null;
  }
}

async function fetchBusinessProfile(apiUrl) {
  const safeUrl = cleanUrl(apiUrl);
  if (!safeUrl) {
    setStatus("This QR code does not contain a valid profile API link.", "error");
    return;
  }

  setStatus("Looking up the business profile…", "loading");
  profileSection.hidden = true;

  try {
    const response = await fetch(safeUrl, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    const business = await response.json();
    renderProfile(business);
    setStatus("Profile loaded successfully.", "success");
  } catch (error) {
    console.error("Profile request failed:", error);
    setStatus("We couldn’t load that profile. Please check the QR code and try again.", "error");
  }
}

function addField(label, value, href = "") {
  const item = document.createElement("a");
  item.className = "profile-field";
  item.href = href || "#";
  if (!href) item.removeAttribute("href");
  const fieldLabel = document.createElement("span");
  fieldLabel.textContent = label;
  const fieldValue = document.createElement("strong");
  fieldValue.textContent = value || "Not provided";
  item.append(fieldLabel, fieldValue);
  return item;
}

function renderProfile(business) {
  const name = business.name || business.company?.name || "Business profile";
  const initials = name.split(" ").map(word => word[0]).slice(0, 2).join("").toUpperCase();
  const website = business.website ? `https://${business.website.replace(/^https?:\/\//, "")}` : "";

  profileCard.replaceChildren();
  const header = document.createElement("div");
  header.className = "profile-header";
  header.innerHTML = `<div class="avatar">${initials}</div><div><h2></h2><p></p></div>`;
  header.querySelector("h2").textContent = name;
  header.querySelector("p").textContent = business.company?.catchPhrase || "Verified business profile";

  const details = document.createElement("div");
  details.className = "profile-details";
  details.append(
    addField("Email", business.email, business.email ? `mailto:${business.email}` : ""),
    addField("Phone", business.phone, business.phone ? `tel:${business.phone}` : ""),
    addField("Website", business.website || "Not provided", website)
  );
  profileCard.append(header, details);
  profileSection.hidden = false;
}

async function stopScanner() {
  if (scanner && isScanning) {
    try {
      await scanner.stop();
      scanner.clear();
    } finally {
      isScanning = false;
      scanButton.disabled = false;
      scanButton.innerHTML = '<span aria-hidden="true">▣</span> Scan another QR';
    }
  }
}

async function startScanner() {
  if (!window.Html5Qrcode) {
    setStatus("Scanner library could not load. Check your internet connection.", "error");
    return;
  }
  scanner = new Html5Qrcode("reader");
  scanButton.disabled = true;
  setStatus("Camera is starting… point it at a profile QR code.", "loading");

  try {
    await scanner.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 220, height: 220 } }, async decodedText => {
      await stopScanner();
      scanButton.disabled = false;
      scanButton.innerHTML = '<span aria-hidden="true">▣</span> Scan another QR';
      fetchBusinessProfile(decodedText);
    });
    isScanning = true;
    scanButton.disabled = false;
    scanButton.textContent = "Scanning…";
  } catch (error) {
    console.error("Camera error:", error);
    scanButton.disabled = false;
    setStatus("Camera access was unavailable. You can still try the live demo.", "error");
  }
}

scanButton.addEventListener("click", () => isScanning ? stopScanner() : startScanner());
demoButton.addEventListener("click", () => fetchBusinessProfile(demoApiUrl));
