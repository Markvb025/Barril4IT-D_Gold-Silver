<template>
  <div class="register-container">
    <div class="register-card">
      <div class="logo-section">
        <div class="logo">
          <span class="gold">GOLD</span>
          <span class="silver">&</span>
          <span class="gold">SILVER</span>
        </div>
        <h2>Calculator</h2>
        <p>Create your account to access the calculator.</p>
      </div>

      <form @submit.prevent="register" class="register-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            required
            placeholder="Enter your full name"
          >
        </div>

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
            placeholder="Create a password"
          >
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="form.confirmPassword"
            required
            placeholder="Confirm your password"
          >
        </div>

        <button type="submit" class="register-btn">Create Account</button>
      </form>

      <div class="login-link">
        <p>Already have an account? <router-link to="/login">Sign in here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const register = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  // Check if user already exists
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
  const userExists = existingUsers.find((user: any) => user.email === form.value.email)

  if (userExists) {
    alert('An account with this email already exists!')
    return
  }

  // Create new user
  const newUser = {
    name: form.value.name,
    email: form.value.email,
    password: form.value.password
  }

  // Store user data
  existingUsers.push(newUser)
  localStorage.setItem('users', JSON.stringify(existingUsers))

  // Clear form
  form.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  // Redirect to login page
  alert('Account created successfully! Please login with your credentials.')
  router.push('/login')
}
</script>

<style scoped>
.register-container {
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

.register-card {
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

.register-form {
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

.register-btn {
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

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
}

.login-link {
  text-align: center;
}

.login-link a {
  color: #d4af37;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
