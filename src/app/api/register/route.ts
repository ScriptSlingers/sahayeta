const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json())

// Define the register route
app.post('/api/register', async (req, res) => {
  try {
    // Extract the user details from the request body
    const { name, email, password } = req.body

    // You should add validation for name, email, and password here

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save the user to the database
    // Replace this with your actual database logic
    // Example: await User.create({ name, email, password: hashedPassword });

    // Send a success response
    res.status(201).send('User registered successfully')
  } catch (error) {
    // Handle any errors
    console.error(error)
    res.status(500).send('An error occurred')
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
