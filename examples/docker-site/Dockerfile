FROM python:3.13-slim
WORKDIR /app
COPY index.html /app/index.html
USER 10001:10001
EXPOSE 8000
CMD ["python", "-m", "http.server", "8000", "--bind", "0.0.0.0"]
