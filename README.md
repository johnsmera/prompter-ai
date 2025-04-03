# Next.js 15 Project

This project is a web application built with Next.js 15, following some Clean Architecture principles. It includes a well-structured development environment and supports integrations through an environment configuration file.

## About the Project

This application is a chat system where each response is generated as a new question, storing the previous answer and scoring whether it was correct or not. The logic is implemented using AI-driven prompts and follows Clean Architecture principles. The project also includes simple test examples using Jest.

## Technologies Used

- **Next.js 15**
- **TypeScript**
- **Clean Architecture**
- **Jest for testing**
- **AI-powered prompts**
- **Environment configuration via .env.example**
- **Prisma ORM example**

## How to Run the Project

### Requirements

- Node.js (recommended version: 18+)
- Package manager (npm, yarn, or pnpm)

### Steps to Run

1. Clone the repository:
   ```sh
   git clone https://github.com/johnsmera/prompter-ai.git
   ```
2. Navigate to the project directory:
   ```sh
   cd prompter-ai
   ```
3. Install dependencies:
   ```sh
   npm install  # or yarn install or pnpm install
   ```
4. Set up the environment:
   - Copy the `.env.example` file to `.env` and fill in the required variables.
   ```sh
   cp .env.example .env
   ```
5. Start the development server:
   ```sh
   npm run dev  # or yarn dev or pnpm dev
   ```
6. To run the application in production mode:
   ```sh
   npm start  # or yarn start or pnpm start
   ```

## Contribution

If you would like to contribute, follow these steps:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b my-feature`)
3. Commit your changes (`git commit -m 'My new feature'`)
4. Push to the branch (`git push origin my-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT](LICENSE) license.

