build-api-image:
	 docker build -t akhilmhdh/tinkerhub-platform-api:v1 -f ./apps/api/Dockerfile --target production .
