import Link from 'next/link';

import { ChevronLeft, Flag, Wrench } from 'lucide-react';

export default function About() {
  return (
    <div className="mt-20">
      <div className="flex items-center gap-4">
        <Link href="/app" className="underline text-primary">
          <ChevronLeft size={36} className="inline-block" />
        </Link>

        <h1 className="text-primary text-4xl">Movie App</h1>
      </div>

      <div className="pl-12">
        <div className="mt-8 bg-secondary p-2 rounded-sm w-fit">
          <p className="mb-4 text-md text-muted-foreground">
            This is a movie app built with <span className="text-primary underline">Next.js</span> and{' '}
            <span className="text-primary underline">Node.js</span> with other helpful libraries and packages packages. <br />
            If you want to see the project structure or the code, you can check the repository on GitHub.
          </p>

          <div className="flex items-center text-primary underline gap-2">
            <Flag size={16} className="animate-bounce" />
            <a href="https://github.com/MyoniM/movie-frontend" target="_blank" referrerPolicy="no-referrer">
              Frontend Repo
            </a>
          </div>

          <div className="flex items-center text-primary underline gap-2">
            <Flag size={16} className="animate-bounce" />
            <a href="https://github.com/MyoniM/movie-backend" target="_blank" referrerPolicy="no-referrer">
              Backend Repo
            </a>
          </div>

          <div className="flex items-center text-primary underline gap-2">
            <Wrench size={16} className="animate-bounce" />

            <a href="https://api.mymovies.store/api-docs/" target="_blank" referrerPolicy="no-referrer">
              API Documentation
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-primary mb-4">#Features</h1>

          <div className="mb-4">
            <p>
              - Deployed on <span className="text-primary underline">AWS EC2</span> with <span className="text-primary underline">PM2</span> as a load
              balancer
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">High Availability</span>: PM2 ensures that your application is always running, even if a server
              fails.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Load Balancing</span>: Distributes incoming traffic across multiple instances, improving
              performance and reliability.
            </p>
          </div>

          <div className="mb-4">
            <p>
              - Full <span className="text-primary underline">CI-CD</span> pipeline on GitHub
            </p>

            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Continuous Integration</span>: Automatically builds and tests the codebase with every push.
            </p>
          </div>

          <div className="mb-4">
            <p>- Uses Signed S3 Upload url</p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Enhanced Security</span>: Limits access to specific users for a limited time, reducing the risk
              of unauthorized uploads.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Scalability</span>: Offloads the upload processing to S3, allowing your backend to scale more
              efficiently.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Reduced Server Load</span>: Directly uploads from client to S3, avoiding unnecessary server
              involvement.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Cost Efficiency</span>: Lowers data transfer costs by reducing server interactions.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Customizable Access</span>: Fine-grained control over permissions, such as limiting file size
              and content type.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Simplified Client Code</span>: Client-side logic remains simple, only requiring the signed URL
              to perform the upload.
            </p>
          </div>

          <div className="mb-4">
            <p>- Uses Pre-signed URLs for images</p>

            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Enhanced Security</span>: Presigned URLs limit access to specific users for a limited time,
              reducing the risk of unauthorized access like scrapers.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Temporary Access</span>: URLs expire after a set time, ensuring that images are only accessible
              for a defined period.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Simplified Sharing</span>: Easily share image URLs without exposing the underlying storage
              infrastructure or permissions.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Reduced Backend Load</span>: Offloads image delivery to S3, reducing the need for server-side
              image handling.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Fine-Grained Permissions</span>: Control access permissions for individual images, ensuring
              appropriate access levels.
            </p>
            <p className="ml-8 text-sm text-muted-foreground">
              <span className="text-primary font-bold">Cost Efficiency</span>: Lowers operational costs by directly serving images from S3, minimizing
              server bandwidth usage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
