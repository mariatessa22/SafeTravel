package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2" // Web framework
	"github.com/joho/godotenv"    // For loading environment variables
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: No .env file found")
	}

	// Create a new Fiber app
	app := fiber.New()

	// Test route
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Safe Travel Backend is running!")
	})

	// Start the server on port 3000
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Printf("Server running on port %s...", port)
	log.Fatal(app.Listen(":" + port))
}
