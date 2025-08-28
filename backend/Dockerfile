FROM python:3.11-slim

# Set working directory inside container

WORKDIR /app

# Install system dependencies (if needed for MySQL connector)

RUN apt-get update && apt-get install -y \

    build-essential default-libmysqlclient-dev pkg-config \

        && rm -rf /var/lib/apt/lists/*



# Copy requirements first (better layer caching)

COPY requirements.txt .

# Install dependencies

RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code

COPY . .

# Expose Flask port

EXPOSE 5000
        
# Run app

CMD ["python", "app.py"]