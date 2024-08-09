'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRegisterMutation } from '@/state/services/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const signInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();

  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      const response = await register(values).unwrap();

      toast(response.message);

      router.replace('/auth/sign-in');
    } catch (error: any) {
      if (error?.data.length > 0) {
        for (const e of error?.data) {
          toast({ title: 'Error', description: e.error, variant: 'destructive' });
        }
      } else toast({ title: 'Error', description: 'Something went wrong!', variant: 'destructive' });
    }
  }

  return (
    <div className="h-[calc(94vh)] w-screen flex justify-center items-center">
      <div className="w-96">
        <CardHeader className="text-center">
          <CardTitle className="text-7xl mb-8">Sign Up</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 space-y-2">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isRegistering}>
                Sign up
              </Button>

              <Link href="/auth/sign-in" className="text-sm text-center">
                Already have an account? <span className="text-primary">Sign In</span>
              </Link>
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
}
