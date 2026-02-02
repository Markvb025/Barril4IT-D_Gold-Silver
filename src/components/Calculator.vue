<template>
  <div class="calculator-container">
    <div class="calculator-header">
      <div class="header-icon">
        <div class="coin-stack">
          <div class="coin coin-1"></div>
          <div class="coin coin-2"></div>
          <div class="coin coin-3"></div>
        </div>
      </div>
      <h2>Premium Rate Calculator</h2>
      <p>Calculate your gold & silver investment costs with precision</p>
    </div>

    <form @submit.prevent="calculate" class="calculator-form">
      <div class="form-grid">
        <div class="form-group metal-select">
          <label for="metal" class="form-label">
            Metal Type
          </label>
          <div class="select-wrapper">
            <select id="metal" v-model="form.metal" required class="form-select">
              <option value="gold">🥇 Gold</option>
              <option value="silver">🥈 Silver</option>
            </select>
            <div class="select-arrow">▼</div>
          </div>
        </div>

        <div class="form-group">
          <label for="rate" class="form-label">
            Rate per Gram
          </label>
          <div class="input-wrapper">
            <span class="input-prefix">₱</span>
            <input
              id="rate"
              type="number"
              v-model.number="form.rate"
              step="0.01"
              min="0"
              required
              placeholder="2500.00"
              class="form-input"
            >
          </div>
        </div>

        <div class="form-group">
          <label for="weight" class="form-label">
            Weight
          </label>
          <div class="input-wrapper">
            <input
              id="weight"
              type="number"
              v-model.number="form.weight"
              step="0.01"
              min="0"
              required
              placeholder="10.00"
              class="form-input weight-input"
            >
            <span class="input-suffix">g</span>
          </div>
        </div>

        <div class="form-group">
          <label for="designCharge" class="form-label">
            Design Charge
          </label>
          <div class="input-wrapper">
            <span class="input-prefix">₱</span>
            <input
              id="designCharge"
              type="number"
              v-model.number="form.designCharge"
              step="0.01"
              min="0"
              required
              placeholder="500.00"
              class="form-input"
            >
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="calculate-btn">
          <span class="btn-text">Calculate Investment</span>
          <div class="btn-shine"></div>
        </button>
      </div>
    </form>

    <div v-if="result !== null" class="result-section">
      <div class="result-header">
        <h3>Investment Breakdown</h3>
        <div class="result-badge">Premium Analysis</div>
      </div>

      <div class="result-grid">
        <div class="result-card">
          <div class="card-content">
            <span class="card-label">Metal Cost</span>
            <span class="card-value">{{ formatCurrency(metalCost) }}</span>
          </div>
        </div>

        <div class="result-card">
          <div class="card-content">
            <span class="card-label">Design Charge</span>
            <span class="card-value">{{ formatCurrency(form.designCharge) }}</span>
          </div>
        </div>

        <div class="result-card subtotal">
          <div class="card-content">
            <span class="card-label">Subtotal</span>
            <span class="card-value">{{ formatCurrency(subtotal) }}</span>
          </div>
        </div>

        <div class="result-card">
          <div class="card-content">
            <span class="card-label">12% PH Tax</span>
            <span class="card-value">{{ formatCurrency(tax) }}</span>
          </div>
        </div>
      </div>

      <div class="total-result">
        <div class="total-card">
          <div class="total-content">
            <span class="total-label">Total Investment</span>
            <span class="total-value">{{ formatCurrency(result) }}</span>
          </div>
          <div class="total-glow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface FormData {
  metal: string
  rate: number
  weight: number
  designCharge: number
}

const form = ref<FormData>({
  metal: 'gold',
  rate: 0,
  weight: 0,
  designCharge: 0
})

const result = ref<number | null>(null)

const metalCost = computed(() => form.value.rate * form.value.weight)
const subtotal = computed(() => metalCost.value + form.value.designCharge)
const tax = computed(() => subtotal.value * 0.12)

const calculate = () => {
  result.value = subtotal.value + tax.value
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(amount)
}
</script>

<style scoped>
.calculator-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.calculator-header {
  text-align: center;
  margin-bottom: 40px;
}

.header-icon {
  margin-bottom: 20px;
}

.coin-stack {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.coin {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #d4af37;
  background: linear-gradient(145deg, #ffd700, #b8860b);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  animation: coinFloat 3s ease-in-out infinite;
}

.coin-1 {
  top: 0;
  left: 10px;
  animation-delay: 0s;
}

.coin-2 {
  top: 10px;
  left: 0;
  animation-delay: 0.5s;
}

.coin-3 {
  top: 20px;
  left: 20px;
  animation-delay: 1s;
}

@keyframes coinFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.calculator-header h2 {
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.calculator-header p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 400;
}

.calculator-form {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.1);
  border: 2px solid #d4af37;
  margin-bottom: 40px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.form-group {
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.label-icon {
  margin-right: 8px;
  font-size: 1.1rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix, .input-suffix {
  position: absolute;
  color: #666;
  font-weight: 600;
  z-index: 2;
}

.input-prefix {
  left: 15px;
}

.input-suffix {
  right: 15px;
}

.form-input {
  width: 100%;
  padding: 15px 15px 15px 35px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: #fafafa;
}

.form-input:focus {
  outline: none;
  border-color: #d4af37;
  background: white;
  box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
  transform: translateY(-1px);
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 15px 45px 15px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  background: #fafafa;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-select:focus {
  outline: none;
  border-color: #d4af37;
  background: white;
  box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
  transform: translateY(-1px);
}

.select-arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 12px;
  pointer-events: none;
}

.form-actions {
  text-align: center;
}

.calculate-btn {
  position: relative;
  padding: 18px 40px;
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  overflow: hidden;
  min-width: 250px;
}

.calculate-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
}

.btn-icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.6s ease;
}

.calculate-btn:hover .btn-shine {
  left: 100%;
}

.result-section {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.1);
  border: 2px solid #d4af37;
}

.result-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.result-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.result-header h3 {
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.result-badge {
  display: inline-block;
  background: linear-gradient(135deg, #d4af37, #b8860b);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.result-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.result-card.subtotal {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-color: #d4af37;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
}

.card-icon {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
}

.result-card.subtotal .card-value {
  color: #d4af37;
}

.total-result {
  text-align: center;
}

.total-card {
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  border-radius: 20px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
}

.total-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.total-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.total-icon {
  font-size: 2.5rem;
  margin-bottom: 5px;
}

.total-label {
  color: rgba(255,255,255,0.9);
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.total-value {
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* Fix for weight input spinner overlap */
.weight-input {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: none;
  padding-right: 35px !important;
}

.weight-input::-webkit-outer-spin-button,
.weight-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .result-grid {
    grid-template-columns: 1fr;
  }

  .calculator-form {
    padding: 30px 20px;
  }

  .result-section {
    padding: 30px 20px;
  }

  .calculator-header h2 {
    font-size: 1.8rem;
  }
}
</style>
