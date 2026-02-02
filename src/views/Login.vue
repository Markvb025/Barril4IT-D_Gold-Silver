<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-section">
        <div class="logo">
          <span class="gold">GOLD</span>
          <span class="silver">&</span>
          <span class="gold">SILVER</span>
        </div>
        <h2>Calculator</h2>
        <p>Sign in to access your gold and silver rate calculator.</p>
      </div>

      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            required
            placeholder="Enter your email"
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter your password"
          >
        </div>

        <button type="submit" class="login-btn">Sign In</button>
      </form>

      <div class="register-link">
        <p>Don't have an account? <router-link to="/register">Create one here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

onMounted(() => {
  // Check if user is already logged in
  if (localStorage.getItem('isLoggedIn') === 'true') {
    router.push('/calculator')
  }
})

const login = () => {
  // Get stored users
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  // Find user by email
  const user = users.find((u: any) => u.email === form.value.email)

  // Check if user exists and password matches
  if (!user) {
    alert('Account not found! Please register first.')
    return
  }

  if (user.password !== form.value.password) {
    alert('Incorrect password! Please try again.')
    return
  }

  // Login successful
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('currentUser', JSON.stringify(user))
  router.push('/calculator')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f4e4bc 0%, #d4af37 25%, #c0c0c0 50%, #b87333 75%, #f4e4bc 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border: 2px solid #d4af37;
}

.logo-section {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.logo .gold {
  color: #d4af37;
}

.logo .silver {
  color: #c0c0c0;
  margin: 0 10px;
}

.logo-section h2 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.logo-section p {
  color: #666;
  font-size: 0.9rem;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.login-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
}

.register-link {
  text-align: center;
}

.register-link a {
  color: #d4af37;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
