S3_BUCKET := gbs-content-api-lf
S3_KEY := main.zip
LAMBDA_FUNCTION := gpt-blog-lf

install:
	echo "Installing dependencies..."
	yarn install

post_build:
	echo "Zipping deployment package..."
	rm -rf build
	mkdir build
	zip -r build/main.zip . -x "*.env"
	echo "Uploading deployment package to S3..."
	aws s3 cp build/main.zip s3://${S3_BUCKET}/${S3_KEY}

s3_upload: post_build

lambda_update: s3_upload
	echo "Updating Lambda Function..."
	aws lambda update-function-code --function-name ${LAMBDA_FUNCTION} --s3-bucket ${S3_BUCKET} --s3-key ${S3_KEY}
	echo "DONE!!"

deploy-api-lambda: install lambda_update
