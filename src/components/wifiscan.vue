<template>
  <div class="dashboard">
    <div class="dashboard-section">
      <h2 class="dashboard-section-heading">WiFi Networks</h2>
      <div class="networks-filter">
        <input v-model="searchQuery" type="text" placeholder="Search networks..." />
        <button @click="sortNetworks('signalStrength')">Sort by Signal Strength</button>
      </div>
      <div class="networks-list">
        <div v-if="filteredNetworks.length === 0" class="no-networks">No networks found.</div>
        <div v-else>
          <div
            v-for="network in filteredNetworks"
            :key="network._id"
            class="network-item"
            :class="{ highlighted: selectedNetwork === network }"
            @click="selectNetwork(network)"
          >
            <h3>{{ network.SSID }}</h3>
            <div class="network-details">
              <p>MAC Address: {{ network.MACAddress }}</p>
              <p>Signal Strength: {{ network.signalStrength }} dBm</p>
              <p>Encryption Type: {{ network.encryptionType }}</p>
              <p>Channel: {{ network.channel }}</p>
              <p>IP Address: {{ network.ipAddress }}</p>
              <p>Subnet Mask: {{ network.subnetMask }}</p>
            </div>
            <div class="signal-chart">
              <div class="signal-bar" v-for="bar in networkSignalBars(network.signalStrength)" :key="bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const networks = ref([])

// Function to get signal bars based on signal strength
function networkSignalBars(signalStrength: number): number[] {
  // Implement this function based on your preferred style for signal bars
  // For example, you can use CSS to style signal bars or use icons
  return []
}

// Search functionality
const searchQuery = ref('')

// Computed property to filter networks based on search query
const filteredNetworks = computed(() => {
  return networks.value.filter((network) =>
    network.SSID.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Sorting functionality
function sortNetworks(property: string) {
  filteredNetworks.value.sort((a, b) => a[property] - b[property])
}

// Select network functionality
const selectedNetwork = ref(null)

function selectNetwork(network) {
  selectedNetwork.value = network
}

// Fetch WiFi networks data from the API
async function fetchWifiNetworksData() {
  try {
    const response = await fetch('https://uml-api.vercel.app/api/scanResults')
    const data = await response.json()
    networks.value = data
  } catch (error) {
    console.error('Error fetching WiFi networks data:', error)
  }
}

fetchWifiNetworksData()
</script>

<style scoped>
/* Add your CSS styling for the dashboard here */
.dashboard {
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
}

.dashboard-section {
  margin-bottom: 20px;
}

.dashboard-section-heading {
  font-size: 24px;
}

.networks-filter {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.networks-filter input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #303030;
  color: #ffffff;
  outline: none;
}

.networks-filter button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
}

.no-networks {
  padding: 10px;
  border-radius: 4px;
  background-color: #303030;
}

.networks-list {
  display: grid;
  grid-gap: 20px;
}

.network-item {
  padding: 20px;
  border-radius: 4px;
  background-color: #303030;
  cursor: pointer;
  transition: background-color 0.3s;
}

.network-item.highlighted {
  background-color: #007bff;
}

.network-item h3 {
  margin: 0;
  font-size: 20px;
  color: #ffffff;
}

.network-details {
  margin-top: 10px;
  color: #cccccc;
}

.signal-chart {
  margin-top: 20px;
  display: flex;
}

.signal-bar {
  flex: 1;
  height: 1.5rem;
  background-color: #007bff;
  border-radius: 4px;
  margin-right: 2px;
}
</style>
