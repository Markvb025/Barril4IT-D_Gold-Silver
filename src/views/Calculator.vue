<template>
  <div class="calculator-page">
    <header class="page-header">
      <div class="logo">
        <span class="gold">GOLD</span>
        <span class="silver">&</span>
        <span class="gold">SILVER</span>
      </div>
      <h1>Rate Calculator</h1>
      <p>Calculate the total cost including design charge and 12% Philippine tax</p>
      <button @click="logout" class="logout-btn">Logout</button>
    </header>
    <main>
      <div class="selection-container">
        <div class="selection-card">
          <h2>Choose Your Calculator</h2>
          <p>Select the type of precious metal you want to calculate rates for</p>

          <div class="calculator-options">
            <div class="option-card gold-option" @click="goToGoldCalculator">
              <div class="option-icon">
                <div class="gold-coin"></div>
              </div>
              <h3>Gold Calculator</h3>
              <p>Calculate gold rates with purity adjustments (24K, 22K, 21K, 18K, 14K)</p>
              <div class="option-arrow">→</div>
            </div>

            <div class="option-card silver-option" @click="goToSilverCalculator">
              <div class="option-icon">
                <div class="silver-coin"></div>
              </div>
              <h3>Silver Calculator</h3>
              <p>Calculate silver rates with standard pricing</p>
              <div class="option-arrow">→</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('currentUser')
  router.push('/login')
}

const goToGoldCalculator = () => {
  router.push('/gold-calculator')
}

const goToSilverCalculator = () => {
  router.push('/silver-calculator')
}
</script>

<style scoped>
.calculator-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f4e4bc 0%, #d4af37 25%, #c0c0c0 50%, #b87333 75%, #f4e4bc 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.page-header {
  text-align: center;
  padding: 40px 20px;
  color: white;
  position: relative;
}

.logo {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
}

.logo .gold {
  color: #ffd700;
}

.logo .silver {
  color: #c0c0c0;
  margin: 0 15px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.page-header p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 20px;
}

.logout-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: white;
  color: #d4af37;
}

main {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.selection-container {
  max-width: 800px;
  width: 100%;
  padding: 20px;
}

.selection-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 50px 40px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.1);
  border: 2px solid #d4af37;
  text-align: center;
}

.selection-card h2 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.selection-card p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 40px;
}

.calculator-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
}

.option-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  padding: 30px;
  border: 2px solid #dee2e6;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.gold-option {
  border-color: #d4af37;
}

.gold-option:hover {
  border-color: #b8860b;
  background: linear-gradient(135deg, #fff9e6 0%, #ffeaa7 100%);
}

.silver-option {
  border-color: #c0c0c0;
}

.silver-option:hover {
  border-color: #a8a8a8;
  background: linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%);
}

.option-icon {
  margin-bottom: 20px;
}

.gold-coin, .silver-coin {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
}

.gold-coin {
  background: linear-gradient(145deg, #ffd700, #b8860b);
  border: 4px solid #d4af37;
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
}

.silver-coin {
  background: linear-gradient(145deg, #f5f5f5, #c0c0c0);
  border: 4px solid #c0c0c0;
  box-shadow: 0 8px 20px rgba(192, 192, 192, 0.4);
}

.gold-coin::before, .silver-coin::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.6;
}

.option-card h3 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.option-card p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.option-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.5rem;
  color: #999;
  transition: all 0.3s ease;
}

.option-card:hover .option-arrow {
  color: #333;
  transform: translateX(5px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .calculator-options {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .selection-card {
    padding: 30px 20px;
  }

  .selection-card h2 {
    font-size: 2rem;
  }
}
</style>
