# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7


FROM node:22-bookworm-slim

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

# Copy source files into the image.
COPY ./package.json ./package-lock.json ./index.js .
COPY ./dist/ ./dist/
COPY ./models/ ./models/

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD ["npm", "start"]
