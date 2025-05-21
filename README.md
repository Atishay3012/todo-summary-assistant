 Configuration Instructions
1. Slack Incoming Webhook Setup
To enable Slack notifications for your Todo Summary Assistant:

Go to your Slack workspace.

Add the Incoming Webhooks app:

In Slack, click on “Apps” or search for “Incoming Webhooks” and add it to your workspace.

Configure the webhook:

Choose the channel where you want to receive todo summaries.

Click “Add Incoming Webhooks integration.”

Copy the generated Webhook URL.

Add the Webhook URL to your backend .env file:

text
SLACK_WEBHOOK=https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXX
Restart your backend server if it was running.

2. OpenAI API Key Setup
To allow your app to summarize todos using an LLM:

Sign up or log in at OpenAI.

Navigate to the API Keys section and generate a new API key.

Copy your API key and add it to your backend .env file:

text
OPENAI_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXX
Restart your backend server to apply the changes.

3. MongoDB Database Connection
Create a MongoDB Atlas account (or use a local MongoDB instance).

Create a cluster and database user.

Whitelist your IP address.

Copy your connection string (something like):

text
mongodb+srv://<username>:<password>@cluster0.mongodb.net/todoapp?retryWrites=true&w=majority
Add your MongoDB URI to the backend .env file:

text
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todoapp?retryWrites=true&w=majority
Restart your backend server.

4. .env Example
Your .env file should look like this:

text
MONGODB_URI=your_mongodb_connection_string
OPENAI_KEY=your_openai_api_key
SLACK_WEBHOOK=your_slack_webhook_url
PORT=4000
Never commit your .env file to GitHub.
Always use .env.example to show required variables.

5. Final Steps
After configuration, run your backend:

text
npm start
Test the Slack integration by adding todos and clicking the "Summarize & Send to Slack" button in your app.

Check your Slack channel for the summary message.
