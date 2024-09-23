## Mock Payment App 

Full stack mock payment app.
- React Frontend
- Node.js (Express) Backend

The Backend is deployed on an Ec2 autoscaling group inside a VPC and is exposed via a load balancer in a public subnet. Therefore much of the efforts were put in to implement the backend in the production ready AWS deployment architecture as specified in - https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html  
