/**
 * Validates that all required environment variables are present
 * @throws Error if any required environment variable is missing
 */
export function validateEnvironmentVariables(): void {
  const requiredEnvVars = [
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_USER',
    'DATABASE_PASSWORD',
    'DATABASE_NAME',
    'ITUNES_API',
  ];

  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set.\n',
    );
  }

  // Validate PORT is a number if provided
  if (process.env.PORT && isNaN(Number(process.env.PORT))) {
    throw new Error('PORT environment variable must be a valid number');
  }

  // Validate DATABASE_PORT is a number
  if (isNaN(Number(process.env.DATABASE_PORT))) {
    throw new Error(
      'DATABASE_PORT environment variable must be a valid number',
    );
  }
}
