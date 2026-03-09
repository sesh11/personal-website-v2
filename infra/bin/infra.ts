#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { StaticSiteStack } from '../lib/static-site-stack'

const app = new cdk.App()

new StaticSiteStack(app, 'PersonalWebsiteStack', {
  env: {
    account: '445567084763',
    region: 'us-east-1',
  },
})
