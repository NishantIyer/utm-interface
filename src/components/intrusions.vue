<template>
  <div class="intrusion-dashboard">
    <h2 class="dashboard-section-heading">Intrusion Alerts</h2>
    <div class="intrusion-list">
      <div v-if="!intrusionAlerts || intrusionAlerts.length === 0" class="no-alerts">
        <i class="icon-alert"></i>
        No intrusion alerts found.
      </div>
      <div v-else class="intrusion-cards-grid">
        <div v-for="alert in intrusionAlerts" :key="alert._id" class="intrusion-card">
          <div class="card-header">
            <div class="card-icon">
              <i class="icon-alert"></i>
            </div>
            <div class="card-title">
              {{ getAlertTitle(alert) }}
            </div>
          </div>
          <div class="card-content">
            <p class="card-text">MAC Address: {{ alert.MACAddress }}</p>
            <p class="card-text">Signal Strength: {{ alert.signalStrength }} dBm</p>
            <p class="card-text">Encryption Type: {{ alert.encryptionType }}</p>
            <p class="card-text">Channel: {{ alert.channel }}</p>
            <p class="card-text">IP Address: {{ alert.ipAddress }}</p>
            <p class="card-text">Subnet Mask: {{ alert.subnetMask }}</p>
            <p class="card-text">Timestamp: {{ alert.createdAt }}</p>
          </div>
          <div class="card-actions">
            <button
              class="fix-button"
              @click="fixAlert(alert)"
              :disabled="isFixed(alert)"
              :class="{ 'fixed': isFixed(alert) }"
            >
              {{ isFixed(alert) ? 'Intrusion Fixed' : 'Fix Intrusion' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const intrusionAlerts = ref([]);

async function fetchIntrusionAlertsData() {
  try {
    const response = await fetch('https://uml-api.vercel.app/api/scanResults')
    const data = await response.json()
    intrusionAlerts.value = data.filter(item => item.intrusionAlert && item.intrusionAlert.BSSID && item.intrusionAlert.Timestamp)
  } catch (error) {
    console.error('Error fetching intrusion alerts data:', error)
  }
}


onMounted(fetchIntrusionAlertsData);


function fixAlert(alert) {
  if (!alert.fixed) {
    alert.fixed = true;
  }
}


function getAlertTitle(alert) {
  return `Intrusion Alert: ${alert.SSID} - ${alert.MACAddress}`;
}


function isFixed(alert) {
  return alert.fixed;
}
</script>

<style scoped>
/* CSS styling for the intrusion dashboard */
.intrusion-dashboard {
  background-color: #000000; /* Set the background to dark */
  color: #ffffff;
  padding: 20px;
}

.dashboard-section-heading {
  font-size: 32px;
  margin-bottom: 20px;
}

.intrusion-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* Add space between each intrusion card */
.intrusion-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px; /* Adjust the gap value to control the spacing between cards */
}

.intrusion-card {
  margin: 20px; /* Add margin to create space between cards */
  border-radius: 16px; /* Increase the border-radius for rounded edges */
  background: rgba(0, 0, 0, 0.6); /* Transparent glass-like effect */
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.2), 0 0 20px rgba(0, 255, 0, 0.2); /* Red and green glowing effect */
  transition: box-shadow 0.3s;
}

.intrusion-card:hover {
  box-shadow: 0 0 40px rgba(255, 0, 0, 0.4), 0 0 40px rgba(0, 255, 0, 0.4); /* Increased glowing effect on hover */
}

.card-header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: rgba(255, 0, 0, 0.9); /* Red header background */
}

.card-icon {
  font-size: 32px;
  color: #ffffff;
  margin-right: 10px;
}

.card-title {
  font-size: 24px;
  color: #ffffff;
}

.card-content {
  padding: 15px;
}

.card-text {
  color: #cccccc;
  margin: 5px 0;
}

.card-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: rgba(0, 255, 0, 0.9); /* Green actions background */
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.fix-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.fix-button:disabled {
  background-color: #666666;
  cursor: not-allowed;
}

.fix-button.fixed {
  background-color: #00cc00; /* Green background for fixed button */
}

.icon-alert {
  font-size: 48px;
  color: #ff6f00;
  margin-bottom: 20px;
}

/* CSS animations for the buttons */
.fix-button:hover {
  background-color: #0056b3;
}

/* Add animation on button click */
.fix-button:active {
  transform: scale(0.95);
}
</style>
