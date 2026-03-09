import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'

export class StaticSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Import existing S3 bucket
    const siteBucket = s3.Bucket.fromBucketName(
      this,
      'SiteBucket',
      'www.nsesh.com'
    )

    // Import existing ACM certificate
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'SiteCertificate',
      'arn:aws:acm:us-east-1:445567084763:certificate/e773392a-898c-4371-9f3c-386403d5015b'
    )

    // Import existing CloudFront distribution
    const distribution = cloudfront.Distribution.fromDistributionAttributes(
      this,
      'SiteDistribution',
      {
        distributionId: 'E1UBO5L839D2UN',
        domainName: 'd-placeholder.cloudfront.net',
      }
    )

    // Import existing Route 53 hosted zone
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      'SiteHostedZone',
      {
        hostedZoneId: 'Z0727093P6OBUOFRDN3L',
        zoneName: 'nsesh.com',
      }
    )

    // GitHub Actions OIDC Provider
    const githubOidcProvider = new iam.OpenIdConnectProvider(
      this,
      'GitHubOidcProvider',
      {
        url: 'https://token.actions.githubusercontent.com',
        clientIds: ['sts.amazonaws.com'],
      }
    )

    // GitHub Actions Deploy Role
    const deployRole = new iam.Role(this, 'GitHubActionsDeployRole', {
      roleName: 'GitHubActionsDeployRole',
      assumedBy: new iam.WebIdentityPrincipal(
        githubOidcProvider.openIdConnectProviderArn,
        {
          StringEquals: {
            'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
          },
          StringLike: {
            'token.actions.githubusercontent.com:sub':
              'repo:sesh11/personal-website-v2:*',
          },
        }
      ),
    })

    // S3 deploy permissions
    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          's3:PutObject',
          's3:DeleteObject',
          's3:ListBucket',
          's3:GetObject',
        ],
        resources: [siteBucket.bucketArn, `${siteBucket.bucketArn}/*`],
      })
    )

    // CloudFront invalidation permissions
    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudfront:CreateInvalidation'],
        resources: [
          `arn:aws:cloudfront::445567084763:distribution/E1UBO5L839D2UN`,
        ],
      })
    )

    // Outputs for GitHub Actions
    new cdk.CfnOutput(this, 'BucketName', {
      value: siteBucket.bucketName,
    })

    new cdk.CfnOutput(this, 'DistributionId', {
      value: 'E1UBO5L839D2UN',
    })

    new cdk.CfnOutput(this, 'DeployRoleArn', {
      value: deployRole.roleArn,
    })
  }
}
