import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {
  
  public readonly photosBucketArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const photosBucket = new Bucket(this, 'PhotosBucket', {
      bucketName: 'photos-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    this.photosBucketArn = photosBucket.bucketArn
  }
}