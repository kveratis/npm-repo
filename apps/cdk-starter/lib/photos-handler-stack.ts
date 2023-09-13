import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Effect, PolicyStatement, Role } from 'aws-cdk-lib/aws-iam';
import { S3 } from 'aws-cdk-lib/aws-ses-actions';
import { Bucket } from 'aws-cdk-lib/aws-s3';

interface PhotosHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string
}

export class PhotosHandlerStack extends cdk.Stack {
  
  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props);

    const fn = new LambdaFunction(this, 'PhotosHandler', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromInline(`
        exports.handler = async(event) => {
          console.log("hello!: " + process.env.TARGET_BUCKET)
        };
      `),
      environment: {
        TARGET_BUCKET: props.targetBucketArn,
      },
    })

    const photosBucket = Bucket.fromBucketArn(this, 'PhotosBucket', props.targetBucketArn)
    photosBucket.addToResourcePolicy(new PolicyStatement({
      actions: ['s3:List', 's3:GetObject', 's3:PutObject'],
      effect: Effect.ALLOW,
      principals: [fn.grantPrincipal]
    }))
  }
}