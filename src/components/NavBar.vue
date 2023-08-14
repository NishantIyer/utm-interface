<template>
  <header class="header">
    <nav class="nav">
      <div class="left">
        <router-link to="/" title="Home" class="nav-link">
          <span class="nav-icon">
            <i class="i-healthicons:alert-triangle-outline" width="80" height="70"></i>
          </span>
        </router-link>
      </div>
      <div class="center">
        <router-link to="/netlife" title="Network Topology" class="nav-link">
          <span class="nav-text">Network Toplogy</span>
        </router-link>
        <router-link to="/about" title="about" class="nav-link">
          <span class="nav-text">About</span>
        </router-link>
        <router-link to="/dashi" title="Dashboard" class="nav-link">
          <span class="nav-text">Dashboard</span>
        </router-link>
        <router-link to="/wifi" title="Scan" class="nav-link">
          <span class="nav-text">Scan</span>
        </router-link>
        <router-link to="/intrusiondetection" title="IDS" class="nav-link">
          <span class="nav-text">Intrusions</span>
        </router-link>
        <router-link to="/ap" title="Rogue AP" class="nav-link">
          <span class="nav-text">Rogue Access Points</span>
        </router-link>
      </div>
      <div class="right">
        <a href="https://github.com/utm-interface" target="_blank" title="GitHub" class="nav-link">
          <span class="nav-icon">
            <i class="i-uil-github-alt"></i>
          </span>
        </a>
        <a href="https://nishantiyer.netlify.app" target="_blank" title="Pictures" class="nav-link">
          <span class="nav-icon">
            <i class="i-iconoir:developer"></i>
          </span>
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: relative;
}

.nav {
  padding: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
}

.left {
  display: flex;
  align-items: center;
}

.center {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}

.right {
  display: flex;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.nav-link:hover {
  background-color: #333;
}

.nav-link:hover .nav-text {
  color: #fff;
}

.nav-link:last-child {
  margin-right: 0;
}

.nav-icon {
  font-size: 18px;
  margin-right: 8px;
}

.nav-text {
  color: #fff;
  transition: color 0.2s ease;
}

.nav-icon i {
  vertical-align: middle;
}
</style>

<script>
export default {
  // ...other script setup
}
</script>
