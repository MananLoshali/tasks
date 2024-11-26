
# syntax=docker/dockerfile:1

ARG NODE_VERSION=16.18.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Install dependencies as a separate step to take advantage of Docker's caching.
# Note: Removed --omit=dev to ensure devDependencies (including nodemon) are installed.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

    RUN npm install -g nodemon
# Create the dist directory before switching to the 'node' user and ensure permissions.
RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app

# Switch to the 'node' user for security reasons.
USER node

# Copy the rest of the source code into the image, ensuring the 'node' user has proper permissions.
COPY --chown=node:node . .

# Expose the port your app listens on.
EXPOSE 5001

# Build the TypeScript code before starting the app.
RUN npm run build

# Run the application (this will work if you have 'nodemon' installed).
CMD npm start
