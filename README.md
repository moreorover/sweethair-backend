
# Build application
```bash
mvn clean package -Dapi_version=0.0.1
```

# External application.property file – Going outside jar/war
```bash
java -jar app.jar -Dspring.config.additional-location="./configuration"
```

# Generate JWT Certificates
```bash
mkdir -p ./src/main/resources/certs
openssl genrsa -out ./src/main/resources/certs/keypair.pem 2048
openssl rsa -in ./src/main/resources/certs/keypair.pem -pubout -out ./src/main/resources/certs/public.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in ./src/main/resources/certs/keypair.pem -out ./src/main/resources/certs/private.pem
```
