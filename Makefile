S3_BUCKET_DEV := gbs-lambda-archive-dev
S3_BUCKET_PROD := gbs-lambda-archive-prod
S3_KEY := main.zip
LAMBDA_FUNCTION_DEV := gbs-blog-api-lambda-dev
LAMBDA_FUNCTION_PROD := gbs-blog-api-lambda-prod

install:
	echo "Installing dependencies..."
	yarn install

post_build_dev: install
	echo "Zipping deployment package..."
	rm -rf build
	mkdir build
	zip -r build/main.zip . -x "*.env"
	echo "Uploading deployment package to S3..."
	aws s3 cp build/main.zip s3://${S3_BUCKET_DEV}/${S3_KEY}

post_build_prod: install
	echo "Zipping deployment package..."
	rm -rf build
	mkdir build
	zip -r build/main.zip . -x "*.env"
	echo "Uploading deployment package to S3..."
	aws s3 cp build/main.zip s3://${S3_BUCKET_PROD}/${S3_KEY}

s3_upload_dev: post_build_dev

s3_upload_prod: post_build_prod

lambda_update_dev: s3_upload_dev
	echo "Updating Dev Lambda Function..."
	aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_DEV} --s3-bucket ${S3_BUCKET_DEV} --s3-key ${S3_KEY}
	echo "DONE!!"

lambda_update_prod: s3_upload_prod
	echo "Updating Prod Lambda Function..."
	aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_PROD} --s3-bucket ${S3_BUCKET_PROD} --s3-key ${S3_KEY}
	echo "DONE!!"

deploy_api_lambda_dev: install lambda_update_dev

deploy_api_lambda_prod: install lambda_update_prod
